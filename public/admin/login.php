<?php
declare(strict_types=1);
require_once __DIR__ . '/_bootstrap.php';

if (!admin_enabled()) {
  http_response_code(503);
  echo "<h1>Admin disabled</h1>";
  echo "<p>Set <code>ADMIN_PASSWORD_HASH</code> (recommended) or <code>ADMIN_PASSWORD</code> in <code>api/config.local.php</code>.</p>";
  exit;
}

if (admin_is_authed()) {
  header('Location: index.php');
  exit;
}

$userTableExists = admin_users_table_exists();
$activeUsers = admin_active_user_count();

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  admin_verify_csrf();
  $email = strtolower(trim((string)($_POST['email'] ?? '')));
  $pw = (string)($_POST['password'] ?? '');

  if ($email !== '') {
    $user = admin_verify_user_credentials($email, $pw);
    if (is_array($user)) {
      session_regenerate_id(true);
      admin_login_user($user);
      header('Location: index.php');
      exit;
    }
    $error = 'Invalid email or password.';
  } else {
    if (admin_verify_password($pw)) {
      session_regenerate_id(true);
      admin_login_legacy_owner();
      header('Location: index.php');
      exit;
    }
    $error = $activeUsers > 0 ? 'Invalid credentials.' : 'Invalid password.';
  }
}

$csrf = admin_csrf_token();
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Admin Login</title>
    <style>
      :root { color-scheme: light dark; }
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; display:flex; min-height: 100vh; align-items:center; justify-content:center; }
      .card { width: min(520px, calc(100vw - 32px)); border: 1px solid rgba(127,127,127,0.25); border-radius: 14px; padding: 18px; }
      input { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid rgba(127,127,127,0.35); background: transparent; }
      button { margin-top: 12px; width: 100%; padding: 12px; border-radius: 10px; border: 0; background: #12264a; color: #fff; font-weight: 700; cursor: pointer; }
      .muted { opacity: 0.75; }
      .err { margin-top: 10px; color: #b91c1c; }
      .hint { margin-top: 10px; font-size: 14px; opacity: 0.85; }
      code { padding: 2px 6px; border-radius: 6px; background: rgba(127,127,127,0.12); }
    </style>
  </head>
  <body>
    <div class="card">
      <h1 style="margin:0 0 8px 0;">Admin Login</h1>
      <p class="muted" style="margin:0 0 16px 0;">Site: <code>/1</code></p>
      <form method="post">
        <input type="hidden" name="csrf" value="<?= h($csrf) ?>" />

        <label class="muted" for="email">Email (user login)</label>
        <input id="email" name="email" type="email" placeholder="editor@church.org" autocomplete="username" />

        <label class="muted" for="pw" style="display:block; margin-top:10px;">Password</label>
        <input id="pw" name="password" type="password" required autocomplete="current-password" />
        <button type="submit">Sign in</button>
      </form>

      <?php if ($activeUsers > 0): ?>
        <div class="hint">Use <strong>email + password</strong> for admin/editor accounts. Leaving email blank uses the owner password (if configured).</div>
      <?php elseif ($userTableExists): ?>
        <div class="hint">No active users exist yet. Sign in with owner password, then add users in <code>Users</code>.</div>
      <?php else: ?>
        <div class="hint">User accounts are not initialized yet. Sign in with owner password.</div>
      <?php endif; ?>

      <?php if ($error !== ''): ?>
        <div class="err"><?= h($error) ?></div>
      <?php endif; ?>
    </div>
  </body>
</html>
