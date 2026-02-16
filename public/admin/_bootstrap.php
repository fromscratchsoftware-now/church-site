<?php
declare(strict_types=1);

// Admin pages bootstrap.

session_name('church_admin');
session_start();

// Minimal helper to satisfy public/api/_db.php if it ever needs to error out.
function json_response(array $payload, int $status = 200): void {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($payload, JSON_UNESCAPED_SLASHES);
  exit;
}

require_once __DIR__ . '/../api/_config.php';
require_once __DIR__ . '/../api/_db.php';

function admin_db_ready(): bool {
  return DB_NAME !== 'CHANGE_ME' && DB_USER !== 'CHANGE_ME' && DB_PASSWORD !== 'CHANGE_ME';
}

function admin_users_table_exists(): bool {
  if (!admin_db_ready()) return false;
  try {
    $stmt = db()->query("SHOW TABLES LIKE 'admin_users'");
    return (bool)$stmt->fetchColumn();
  } catch (Throwable $e) {
    return false;
  }
}

function admin_create_users_table(): bool {
  if (!admin_db_ready()) return false;

  $sql = <<<'SQL'
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(320) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','editor') NOT NULL DEFAULT 'editor',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_by BIGINT UNSIGNED NULL,
  last_login_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_users_email (email),
  KEY idx_admin_users_role_active (role, is_active),
  KEY idx_admin_users_created_by (created_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
SQL;

  try {
    db()->exec($sql);
    return admin_users_table_exists();
  } catch (Throwable $e) {
    return false;
  }
}

function admin_active_user_count(): int {
  if (!admin_users_table_exists()) return 0;
  try {
    $row = db()->query('SELECT COUNT(*) AS c FROM admin_users WHERE is_active = 1')->fetch();
    return (int)($row['c'] ?? 0);
  } catch (Throwable $e) {
    return 0;
  }
}

function admin_enabled(): bool {
  // Enabled if either role-based users exist OR legacy owner password is configured.
  return admin_active_user_count() > 0 || (ADMIN_PASSWORD !== '') || (ADMIN_PASSWORD_HASH !== '');
}

function admin_is_authed(): bool {
  return isset($_SESSION['admin_authed']) && $_SESSION['admin_authed'] === true;
}

function admin_current_user(): ?array {
  if (!isset($_SESSION['admin_user']) || !is_array($_SESSION['admin_user'])) return null;

  $u = $_SESSION['admin_user'];
  $id = (int)($u['id'] ?? 0);
  $email = trim((string)($u['email'] ?? ''));
  $fullName = trim((string)($u['full_name'] ?? ''));
  $role = admin_normalize_role((string)($u['role'] ?? 'editor'));

  if ($id <= 0 || $email === '') return null;

  return [
    'id' => $id,
    'email' => $email,
    'full_name' => $fullName,
    'role' => $role,
  ];
}

function admin_normalize_role(string $role): string {
  $role = strtolower(trim($role));
  return in_array($role, ['admin', 'editor'], true) ? $role : 'editor';
}

function admin_current_role(): string {
  $u = admin_current_user();
  if (is_array($u)) return (string)$u['role'];

  // Legacy owner password login behaves as admin.
  return admin_is_authed() ? 'admin' : '';
}

function admin_is_admin(): bool {
  return admin_current_role() === 'admin';
}

function admin_display_name(): string {
  $u = admin_current_user();
  if (is_array($u)) {
    $name = trim((string)($u['full_name'] ?? ''));
    if ($name !== '') return $name;
    return (string)$u['email'];
  }
  return 'Owner';
}

function admin_require_auth(): void {
  if (!admin_enabled()) {
    http_response_code(503);
    echo "<h1>Admin disabled</h1>";
    echo "<p>Set at least one auth method:</p>";
    echo "<ul>";
    echo "<li>Define <code>ADMIN_PASSWORD_HASH</code> (recommended) or <code>ADMIN_PASSWORD</code> in <code>api/config.local.php</code>, or</li>";
    echo "<li>Create a user in <code>admin_users</code> (role: admin/editor).</li>";
    echo "</ul>";
    exit;
  }
  if (!admin_is_authed()) {
    header('Location: login.php');
    exit;
  }
}

function admin_require_admin(): void {
  admin_require_auth();
  if (!admin_is_admin()) {
    http_response_code(403);
    echo "<h1>Forbidden</h1>";
    echo "<p>This page requires an admin account.</p>";
    exit;
  }
}

function admin_csrf_token(): string {
  if (!isset($_SESSION['csrf']) || !is_string($_SESSION['csrf']) || $_SESSION['csrf'] === '') {
    $_SESSION['csrf'] = bin2hex(random_bytes(16));
  }
  return $_SESSION['csrf'];
}

function admin_verify_csrf(): void {
  $t = $_POST['csrf'] ?? '';
  if (!is_string($t) || $t === '' || !hash_equals((string)($_SESSION['csrf'] ?? ''), $t)) {
    http_response_code(400);
    echo "Bad CSRF token";
    exit;
  }
}

function admin_verify_password(string $password): bool {
  $password = trim($password);
  if ($password === '') return false;

  if (ADMIN_PASSWORD_HASH !== '') {
    return password_verify($password, ADMIN_PASSWORD_HASH);
  }
  if (ADMIN_PASSWORD !== '') {
    return hash_equals(ADMIN_PASSWORD, $password);
  }
  return false;
}

function admin_verify_user_credentials(string $email, string $password): ?array {
  $email = strtolower(trim($email));
  $password = trim($password);
  if ($email === '' || $password === '') return null;
  if (!admin_users_table_exists()) return null;

  try {
    $stmt = db()->prepare(
      'SELECT id, full_name, email, role, password_hash, is_active
       FROM admin_users
       WHERE email = :email
       LIMIT 1'
    );
    $stmt->execute([':email' => $email]);
    $row = $stmt->fetch();
    if (!$row) return null;
    if ((int)($row['is_active'] ?? 0) !== 1) return null;

    $hash = (string)($row['password_hash'] ?? '');
    if ($hash === '' || !password_verify($password, $hash)) return null;

    if (password_needs_rehash($hash, PASSWORD_DEFAULT)) {
      $newHash = password_hash($password, PASSWORD_DEFAULT);
      $u = db()->prepare('UPDATE admin_users SET password_hash = :h WHERE id = :id');
      $u->execute([':h' => $newHash, ':id' => (int)$row['id']]);
    }

    return [
      'id' => (int)$row['id'],
      'full_name' => trim((string)($row['full_name'] ?? '')),
      'email' => strtolower(trim((string)($row['email'] ?? ''))),
      'role' => admin_normalize_role((string)($row['role'] ?? 'editor')),
    ];
  } catch (Throwable $e) {
    return null;
  }
}

function admin_login_user(array $user): void {
  $_SESSION['admin_authed'] = true;
  $_SESSION['admin_user'] = [
    'id' => (int)($user['id'] ?? 0),
    'full_name' => trim((string)($user['full_name'] ?? '')),
    'email' => strtolower(trim((string)($user['email'] ?? ''))),
    'role' => admin_normalize_role((string)($user['role'] ?? 'editor')),
  ];
  unset($_SESSION['admin_legacy']);

  if (admin_users_table_exists() && (int)($_SESSION['admin_user']['id'] ?? 0) > 0) {
    try {
      $stmt = db()->prepare('UPDATE admin_users SET last_login_at = NOW() WHERE id = :id');
      $stmt->execute([':id' => (int)$_SESSION['admin_user']['id']]);
    } catch (Throwable $e) {
      // no-op
    }
  }
}

function admin_login_legacy_owner(): void {
  $_SESSION['admin_authed'] = true;
  $_SESSION['admin_legacy'] = true;
  unset($_SESSION['admin_user']);
}

function h(string $s): string {
  return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
