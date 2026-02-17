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

function admin_slug_username(string $raw): string {
  $u = strtolower(trim($raw));
  $u = preg_replace('/[^a-z0-9._-]+/', '', $u) ?? '';
  $u = trim($u, '._-');
  return $u;
}

function admin_username_from_email(string $email): string {
  $email = strtolower(trim($email));
  $local = $email;
  if (str_contains($email, '@')) {
    $parts = explode('@', $email, 2);
    $local = $parts[0] ?? $email;
  }
  $u = admin_slug_username($local);
  return $u !== '' ? $u : 'user';
}

function admin_username_exists(PDO $pdo, string $username, int $excludeId = 0): bool {
  $stmt = $pdo->prepare('SELECT id FROM admin_users WHERE username = :u AND id <> :id LIMIT 1');
  $stmt->execute([
    ':u' => $username,
    ':id' => $excludeId,
  ]);
  return (bool)$stmt->fetch();
}

function admin_next_available_username(PDO $pdo, string $base, int $excludeId = 0): string {
  $base = admin_slug_username($base);
  if ($base === '') $base = 'user';

  $candidate = $base;
  $i = 1;
  while (admin_username_exists($pdo, $candidate, $excludeId)) {
    $candidate = $base . $i;
    $i++;
    if ($i > 1000) {
      $candidate = $base . bin2hex(random_bytes(2));
      if (!admin_username_exists($pdo, $candidate, $excludeId)) break;
    }
  }

  return $candidate;
}

function admin_ensure_users_schema(): bool {
  if (!admin_users_table_exists()) return false;

  try {
    $pdo = db();

    $hasUsername = false;
    $colStmt = $pdo->query("SHOW COLUMNS FROM admin_users LIKE 'username'");
    if ($colStmt && $colStmt->fetch()) {
      $hasUsername = true;
    }

    if (!$hasUsername) {
      $pdo->exec("ALTER TABLE admin_users ADD COLUMN username VARCHAR(80) NULL AFTER full_name");
    }

    $rows = $pdo->query('SELECT id, username, email FROM admin_users ORDER BY id ASC')->fetchAll();
    $updateStmt = $pdo->prepare('UPDATE admin_users SET username = :u WHERE id = :id');

    foreach ($rows as $r) {
      $id = (int)($r['id'] ?? 0);
      if ($id <= 0) continue;

      $current = admin_slug_username((string)($r['username'] ?? ''));
      if ($current === '') {
        $current = admin_username_from_email((string)($r['email'] ?? ''));
      }
      if ($current === '') {
        $current = 'user' . $id;
      }

      $resolved = admin_next_available_username($pdo, $current, $id);
      $updateStmt->execute([
        ':u' => $resolved,
        ':id' => $id,
      ]);
    }

    $idxStmt = $pdo->query("SHOW INDEX FROM admin_users WHERE Key_name = 'uq_admin_users_username'");
    $hasUsernameIdx = $idxStmt && $idxStmt->fetch();
    if (!$hasUsernameIdx) {
      $pdo->exec("ALTER TABLE admin_users ADD UNIQUE KEY uq_admin_users_username (username)");
    }

    $colInfoStmt = $pdo->query("SHOW COLUMNS FROM admin_users LIKE 'username'");
    $colInfo = $colInfoStmt ? $colInfoStmt->fetch() : false;
    if ($colInfo && strtoupper((string)($colInfo['Null'] ?? '')) === 'YES') {
      $pdo->exec("ALTER TABLE admin_users MODIFY username VARCHAR(80) NOT NULL");
    }

    return true;
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
  username VARCHAR(80) NOT NULL,
  email VARCHAR(320) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','editor') NOT NULL DEFAULT 'editor',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_by BIGINT UNSIGNED NULL,
  last_login_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_users_username (username),
  UNIQUE KEY uq_admin_users_email (email),
  KEY idx_admin_users_role_active (role, is_active),
  KEY idx_admin_users_created_by (created_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
SQL;

  try {
    db()->exec($sql);
    return admin_ensure_users_schema();
  } catch (Throwable $e) {
    return false;
  }
}

function admin_active_user_count(): int {
  if (!admin_users_table_exists()) return 0;
  admin_ensure_users_schema();

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
  $email = strtolower(trim((string)($u['email'] ?? '')));
  $username = admin_slug_username((string)($u['username'] ?? ''));
  if ($username === '' && $email !== '') {
    $username = admin_username_from_email($email);
  }

  $fullName = trim((string)($u['full_name'] ?? ''));
  $role = admin_normalize_role((string)($u['role'] ?? 'editor'));

  if ($id <= 0 || ($username === '' && $email === '')) return null;

  return [
    'id' => $id,
    'username' => $username,
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

    $username = trim((string)($u['username'] ?? ''));
    if ($username !== '') return $username;

    return (string)($u['email'] ?? '');
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

function admin_verify_user_credentials(string $identifier, string $password): ?array {
  $identifier = strtolower(trim($identifier));
  $password = trim($password);
  if ($identifier === '' || $password === '') return null;
  if (!admin_users_table_exists()) return null;
  if (!admin_ensure_users_schema()) return null;

  try {
    $stmt = db()->prepare(
      'SELECT id, full_name, username, email, role, password_hash, is_active
       FROM admin_users
       WHERE LOWER(email) = :identifier OR LOWER(username) = :identifier
       LIMIT 1'
    );
    $stmt->execute([':identifier' => $identifier]);
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
      'username' => admin_slug_username((string)($row['username'] ?? '')),
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
    'username' => admin_slug_username((string)($user['username'] ?? '')),
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
