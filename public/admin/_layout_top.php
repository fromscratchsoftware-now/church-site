<?php
declare(strict_types=1);
require_once __DIR__ . '/_bootstrap.php';
admin_require_auth();
$title = $title ?? 'Admin';
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?= h($title) ?></title>
    <style>
      :root { color-scheme: light dark; }
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; }
      header { padding: 16px 20px; border-bottom: 1px solid rgba(127,127,127,0.25); display:flex; gap:14px; align-items:center; justify-content:space-between; }
      nav a { margin-right: 12px; text-decoration: none; }
      main { padding: 20px; max-width: 1100px; margin: 0 auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 10px 8px; border-bottom: 1px solid rgba(127,127,127,0.2); text-align: left; vertical-align: top; }
      input, select, textarea { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(127,127,127,0.35); background: transparent; }
      textarea { min-height: 110px; }
      .row { display:flex; gap: 12px; }
      .row > * { flex: 1; }
      .card { border: 1px solid rgba(127,127,127,0.25); border-radius: 12px; padding: 16px; margin: 16px 0; }
      .btn { display:inline-block; padding: 10px 14px; border-radius: 10px; border: 1px solid rgba(127,127,127,0.35); background: rgba(127,127,127,0.12); cursor: pointer; text-decoration:none; }
      .btn.primary { background: #12264a; color: #fff; border-color: #12264a; }
      .btn.danger { background: #b91c1c; color: #fff; border-color: #b91c1c; }
      .muted { opacity: 0.75; }
      .flash { padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(127,127,127,0.25); margin: 12px 0; }
    </style>
  </head>
  <body>
    <header>
      <div><strong>Church Admin</strong> <span class="muted">/1</span></div>
      <nav>
        <a href="index.php">Home</a>
        <a href="events.php">Events</a>
        <a href="sermons.php">Sermons</a>
        <a href="testimonials.php">Testimonials</a>
        <a href="messages.php">Messages</a>
        <a href="logout.php">Logout</a>
      </nav>
    </header>
    <main>

