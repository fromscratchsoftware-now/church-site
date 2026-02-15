<?php
declare(strict_types=1);
$title = 'Testimonials';
require_once __DIR__ . '/_layout_top.php';

$pdo = db();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  admin_verify_csrf();
  $action = (string)($_POST['action'] ?? '');

  if ($action === 'create') {
    $name = trim((string)($_POST['full_name'] ?? ''));
    $titleIn = trim((string)($_POST['title'] ?? ''));
    $quote = trim((string)($_POST['quote'] ?? ''));
    $avatar = trim((string)($_POST['avatar_url'] ?? ''));
    $sort = (int)($_POST['sort_order'] ?? 0);

    if ($name === '' || $quote === '') {
      $_SESSION['flash'] = 'Name and quote are required.';
      header('Location: testimonials.php');
      exit;
    }

    $stmt = $pdo->prepare(
      'INSERT INTO testimonials (full_name, title, quote, avatar_url, is_published, sort_order)
       VALUES (:full_name, :title, :quote, :avatar_url, 1, :sort_order)'
    );
    $stmt->execute([
      ':full_name' => $name,
      ':title' => $titleIn !== '' ? $titleIn : null,
      ':quote' => $quote,
      ':avatar_url' => $avatar !== '' ? $avatar : null,
      ':sort_order' => $sort,
    ]);

    $_SESSION['flash'] = 'Testimonial created.';
    header('Location: testimonials.php');
    exit;
  }

  if ($action === 'delete') {
    $id = (int)($_POST['id'] ?? 0);
    if ($id > 0) {
      $stmt = $pdo->prepare('DELETE FROM testimonials WHERE id = :id');
      $stmt->execute([':id' => $id]);
      $_SESSION['flash'] = 'Testimonial deleted.';
    }
    header('Location: testimonials.php');
    exit;
  }
}

$rows = $pdo->query(
  'SELECT id, full_name, title, quote, avatar_url, sort_order, is_published, created_at
   FROM testimonials
   ORDER BY sort_order ASC, id DESC
   LIMIT 200'
)->fetchAll();

$csrf = admin_csrf_token();
$flash = $_SESSION['flash'] ?? '';
unset($_SESSION['flash']);
?>

<h1 style="margin-top:0;">Testimonials</h1>

<?php if (is_string($flash) && $flash !== ''): ?>
  <div class="flash"><?= h($flash) ?></div>
<?php endif; ?>

<div class="card">
  <h2 style="margin-top:0;">Create Testimonial</h2>
  <form method="post">
    <input type="hidden" name="csrf" value="<?= h($csrf) ?>" />
    <input type="hidden" name="action" value="create" />
    <div class="row">
      <div>
        <label class="muted">Name *</label>
        <input name="full_name" required />
      </div>
      <div>
        <label class="muted">Title/Role</label>
        <input name="title" placeholder="Member since 2015" />
      </div>
    </div>
    <div class="row">
      <div>
        <label class="muted">Avatar URL</label>
        <input name="avatar_url" placeholder="https://images.unsplash.com/..." />
      </div>
      <div>
        <label class="muted">Sort Order</label>
        <input name="sort_order" type="number" value="0" />
      </div>
    </div>
    <div>
      <label class="muted">Quote *</label>
      <textarea name="quote" required></textarea>
    </div>
    <button class="btn primary" type="submit">Create</button>
  </form>
</div>

<div class="card">
  <h2 style="margin-top:0;">Existing Testimonials</h2>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Title</th>
        <th>Sort</th>
        <th>Published</th>
        <th>Quote</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($rows as $r): ?>
        <tr>
          <td><?= (int)$r['id'] ?></td>
          <td><?= h((string)$r['full_name']) ?></td>
          <td><?= h((string)($r['title'] ?? '')) ?></td>
          <td><?= (int)$r['sort_order'] ?></td>
          <td><?= (int)$r['is_published'] === 1 ? 'yes' : 'no' ?></td>
          <td><?= h(mb_substr((string)$r['quote'], 0, 140)) ?></td>
          <td>
            <form method="post" style="display:inline;">
              <input type="hidden" name="csrf" value="<?= h($csrf) ?>" />
              <input type="hidden" name="action" value="delete" />
              <input type="hidden" name="id" value="<?= (int)$r['id'] ?>" />
              <button class="btn danger" type="submit" onclick="return confirm('Delete this testimonial?');">Delete</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
</div>

<?php require_once __DIR__ . '/_layout_bottom.php'; ?>

