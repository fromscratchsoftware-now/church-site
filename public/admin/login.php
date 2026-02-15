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

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  admin_verify_csrf();
  $pw = (string)($_POST['password'] ?? '');
  if (admin_verify_password($pw)) {
    $_SESSION['admin_authed'] = true;
    session_regenerate_id(true);
    header('Location: index.php');
    exit;
  }
  $error = 'Invalid password';
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
      code { padding: 2px 6px; border-radius: 6px; background: rgba(127,127,127,0.12); }
    </style>
  </head>
  <body>
    <div class="card">
      <h1 style="margin:0 0 8px 0;">Admin Login</h1>
      <p class="muted" style="margin:0 0 16px 0;">Site: <code>/1</code></p>
      <form method="post">
        <input type="hidden" name="csrf" value="<?= h($csrf) ?>" />
        <label class="muted" for="pw">Password</label>
        <input id="pw" name="password" type="password" required />
        <button type="submit">Sign in</button>
      </form>
      <?php if ($error !== ''): ?>
        <div class="err"><?= h($error) ?></div>
      <?php endif; ?>
    </div>
  </body>
</html>

