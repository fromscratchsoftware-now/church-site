<?php
declare(strict_types=1);
$title = 'Events';
require_once __DIR__ . '/_layout_top.php';

$pdo = db();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  admin_verify_csrf();
  $action = (string)($_POST['action'] ?? '');

  if ($action === 'create' || $action === 'update') {
    $titleIn = trim((string)($_POST['title'] ?? ''));
    $category = trim((string)($_POST['category'] ?? ''));
    $location = trim((string)($_POST['location_name'] ?? ''));
    $startsAt = trim((string)($_POST['starts_at'] ?? ''));
    $imageUrl = trim((string)($_POST['image_url'] ?? ''));
    $description = trim((string)($_POST['description'] ?? ''));

    if ($titleIn === '') {
      $_SESSION['flash'] = 'Title is required.';
      header('Location: events.php');
      exit;
    }

    if ($action === 'create') {
      $stmt = $pdo->prepare(
        'INSERT INTO events (title, description, location_name, starts_at, image_url, category, registration_enabled, is_published)
         VALUES (:title, :description, :location_name, :starts_at, :image_url, :category, 1, 1)'
      );
      $stmt->execute([
        ':title' => $titleIn,
        ':description' => $description !== '' ? $description : null,
        ':location_name' => $location !== '' ? $location : null,
        ':starts_at' => $startsAt !== '' ? $startsAt : null,
        ':image_url' => $imageUrl !== '' ? $imageUrl : null,
        ':category' => $category !== '' ? $category : null,
      ]);

      $_SESSION['flash'] = 'Event created.';
      header('Location: events.php');
      exit;
    }

    if ($action === 'update') {
      $id = (int)($_POST['id'] ?? 0);
      if ($id <= 0) {
        $_SESSION['flash'] = 'Invalid event id.';
        header('Location: events.php');
        exit;
      }

      $stmt = $pdo->prepare(
        'UPDATE events
         SET title = :title,
             description = :description,
             location_name = :location_name,
             starts_at = :starts_at,
             image_url = :image_url,
             category = :category
         WHERE id = :id'
      );
      $stmt->execute([
        ':id' => $id,
        ':title' => $titleIn,
        ':description' => $description !== '' ? $description : null,
        ':location_name' => $location !== '' ? $location : null,
        ':starts_at' => $startsAt !== '' ? $startsAt : null,
        ':image_url' => $imageUrl !== '' ? $imageUrl : null,
        ':category' => $category !== '' ? $category : null,
      ]);

      $_SESSION['flash'] = 'Event updated.';
      header('Location: events.php');
      exit;
    }
  }

  if ($action === 'delete') {
    $id = (int)($_POST['id'] ?? 0);
    if ($id > 0) {
      $stmt = $pdo->prepare('DELETE FROM events WHERE id = :id');
      $stmt->execute([':id' => $id]);
      $_SESSION['flash'] = 'Event deleted.';
    }
    header('Location: events.php');
    exit;
  }
}

$editId = (int)($_GET['edit'] ?? 0);
$editItem = null;
if ($editId > 0) {
  $stmt = $pdo->prepare('SELECT id, title, description, location_name, starts_at, image_url, category FROM events WHERE id = :id LIMIT 1');
  $stmt->execute([':id' => $editId]);
  $editItem = $stmt->fetch() ?: null;
}

$rows = $pdo->query(
  'SELECT id, title, category, location_name, starts_at, is_published, created_at
   FROM events
   ORDER BY COALESCE(starts_at, created_at) DESC, id DESC
   LIMIT 200'
)->fetchAll();

$csrf = admin_csrf_token();
$flash = $_SESSION['flash'] ?? '';
unset($_SESSION['flash']);

$isEditing = is_array($editItem);
?>

<h1 style="margin-top:0;">Events</h1>

<?php if (is_string($flash) && $flash !== ''): ?>
  <div class="flash"><?= h($flash) ?></div>
<?php endif; ?>

<div class="card">
  <h2 style="margin-top:0;"><?= $isEditing ? ('Edit Event #' . (int)$editItem['id']) : 'Create Event' ?></h2>
  <form method="post">
    <input type="hidden" name="csrf" value="<?= h($csrf) ?>" />
    <input type="hidden" name="action" value="<?= $isEditing ? 'update' : 'create' ?>" />
    <?php if ($isEditing): ?>
      <input type="hidden" name="id" value="<?= (int)$editItem['id'] ?>" />
    <?php endif; ?>

    <div class="row">
      <div>
        <label class="muted">Title *</label>
        <input name="title" required value="<?= h((string)($editItem['title'] ?? '')) ?>" />
      </div>
      <div>
        <label class="muted">Category</label>
        <input name="category" placeholder="Youth, Women, Outreach..." value="<?= h((string)($editItem['category'] ?? '')) ?>" />
      </div>
    </div>
    <div class="row">
      <div>
        <label class="muted">Location</label>
        <input name="location_name" placeholder="Main Sanctuary" value="<?= h((string)($editItem['location_name'] ?? '')) ?>" />
      </div>
      <div>
        <label class="muted">Starts At (YYYY-MM-DD HH:MM:SS)</label>
        <input name="starts_at" placeholder="2026-02-21 19:00:00" value="<?= h((string)($editItem['starts_at'] ?? '')) ?>" />
      </div>
    </div>
    <div>
      <label class="muted">Image URL</label>
      <input name="image_url" placeholder="https://images.unsplash.com/..." value="<?= h((string)($editItem['image_url'] ?? '')) ?>" />
    </div>
    <div>
      <label class="muted">Description</label>
      <textarea name="description"><?= h((string)($editItem['description'] ?? '')) ?></textarea>
    </div>
    <div class="row">
      <button class="btn primary" type="submit"><?= $isEditing ? 'Update' : 'Create' ?></button>
      <?php if ($isEditing): ?>
        <a class="btn" href="events.php">Cancel</a>
      <?php endif; ?>
    </div>
  </form>
</div>

<div class="card">
  <h2 style="margin-top:0;">Existing Events</h2>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Category</th>
        <th>Starts</th>
        <th>Location</th>
        <th>Published</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($rows as $r): ?>
        <tr>
          <td><?= (int)$r['id'] ?></td>
          <td><?= h((string)$r['title']) ?></td>
          <td><?= h((string)($r['category'] ?? '')) ?></td>
          <td><?= h((string)($r['starts_at'] ?? '')) ?></td>
          <td><?= h((string)($r['location_name'] ?? '')) ?></td>
          <td><?= (int)$r['is_published'] === 1 ? 'yes' : 'no' ?></td>
          <td>
            <a class="btn" href="events.php?edit=<?= (int)$r['id'] ?>">Edit</a>
            <form method="post" style="display:inline; margin-left:6px;">
              <input type="hidden" name="csrf" value="<?= h($csrf) ?>" />
              <input type="hidden" name="action" value="delete" />
              <input type="hidden" name="id" value="<?= (int)$r['id'] ?>" />
              <button class="btn danger" type="submit" onclick="return confirm('Delete this event?');">Delete</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
</div>

<?php require_once __DIR__ . '/_layout_bottom.php'; ?>
