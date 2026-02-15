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

function admin_enabled(): bool {
  return (ADMIN_PASSWORD !== '') || (ADMIN_PASSWORD_HASH !== '');
}

function admin_is_authed(): bool {
  return isset($_SESSION['admin_authed']) && $_SESSION['admin_authed'] === true;
}

function admin_require_auth(): void {
  if (!admin_enabled()) {
    http_response_code(503);
    echo "<h1>Admin disabled</h1>";
    echo "<p>Set <code>ADMIN_PASSWORD_HASH</code> (recommended) or <code>ADMIN_PASSWORD</code> in <code>api/config.local.php</code>.</p>";
    exit;
  }
  if (!admin_is_authed()) {
    header('Location: login.php');
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

function h(string $s): string {
  return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

