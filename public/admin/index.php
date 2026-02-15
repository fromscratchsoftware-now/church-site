<?php
declare(strict_types=1);
$title = 'Admin Home';
require_once __DIR__ . '/_layout_top.php';

$flash = $_SESSION['flash'] ?? '';
unset($_SESSION['flash']);
?>

<h1 style="margin-top:0;">Admin</h1>
<p class="muted">Manage content for sermons, events, testimonials, and view inbound messages.</p>

<?php if (is_string($flash) && $flash !== ''): ?>
  <div class="flash"><?= h($flash) ?></div>
<?php endif; ?>

<div class="card">
  <h2 style="margin-top:0;">Quick Links</h2>
  <div class="row">
    <a class="btn primary" href="events.php">Manage Events</a>
    <a class="btn primary" href="sermons.php">Manage Sermons</a>
    <a class="btn primary" href="testimonials.php">Manage Testimonials</a>
    <a class="btn" href="messages.php">View Messages</a>
  </div>
</div>

<?php require_once __DIR__ . '/_layout_bottom.php'; ?>

