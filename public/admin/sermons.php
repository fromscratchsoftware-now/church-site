<?php
declare(strict_types=1);
$title = 'Sermons';
require_once __DIR__ . '/_layout_top.php';

$pdo = db();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  admin_verify_csrf();
  $action = (string)($_POST['action'] ?? '');

  if ($action === 'create' || $action === 'update') {
    $titleIn = trim((string)($_POST['title'] ?? ''));
    $speaker = trim((string)($_POST['speaker'] ?? ''));
    $sermonDate = trim((string)($_POST['sermon_date'] ?? ''));
    $youtubeUrl = trim((string)($_POST['youtube_url'] ?? ''));
    $thumbUrl = trim((string)($_POST['thumbnail_url'] ?? ''));
    $summary = trim((string)($_POST['summary'] ?? ''));

    if ($titleIn === '') {
      $_SESSION['flash'] = 'Title is required.';
      header('Location: sermons.php');
      exit;
    }

    if ($action === 'create') {
      $stmt = $pdo->prepare(
        'INSERT INTO sermons (title, speaker, sermon_date, summary, youtube_url, thumbnail_url, is_published)
         VALUES (:title, :speaker, :sermon_date, :summary, :youtube_url, :thumbnail_url, 1)'
      );
      $stmt->execute([
        ':title' => $titleIn,
        ':speaker' => $speaker !== '' ? $speaker : null,
        ':sermon_date' => $sermonDate !== '' ? $sermonDate : null,
        ':summary' => $summary !== '' ? $summary : null,
        ':youtube_url' => $youtubeUrl !== '' ? $youtubeUrl : null,
        ':thumbnail_url' => $thumbUrl !== '' ? $thumbUrl : null,
      ]);

      $_SESSION['flash'] = 'Sermon created.';
      header('Location: sermons.php');
      exit;
    }

    if ($action === 'update') {
      $id = (int)($_POST['id'] ?? 0);
      if ($id <= 0) {
        $_SESSION['flash'] = 'Invalid sermon id.';
        header('Location: sermons.php');
        exit;
      }

      $stmt = $pdo->prepare(
        'UPDATE sermons
         SET title = :title,
             speaker = :speaker,
             sermon_date = :sermon_date,
             summary = :summary,
             youtube_url = :youtube_url,
             thumbnail_url = :thumbnail_url
         WHERE id = :id'
      );
      $stmt->execute([
        ':id' => $id,
        ':title' => $titleIn,
        ':speaker' => $speaker !== '' ? $speaker : null,
        ':sermon_date' => $sermonDate !== '' ? $sermonDate : null,
        ':summary' => $summary !== '' ? $summary : null,
        ':youtube_url' => $youtubeUrl !== '' ? $youtubeUrl : null,
        ':thumbnail_url' => $thumbUrl !== '' ? $thumbUrl : null,
      ]);

      $_SESSION['flash'] = 'Sermon updated.';
      header('Location: sermons.php');
      exit;
    }
  }

  if ($action === 'toggle_publish') {
    $id = (int)($_POST['id'] ?? 0);
    $publish = (int)($_POST['publish'] ?? 0) === 1 ? 1 : 0;
    if ($id > 0) {
      $stmt = $pdo->prepare('UPDATE sermons SET is_published = :publish WHERE id = :id');
      $stmt->execute([
        ':id' => $id,
        ':publish' => $publish,
      ]);
      $_SESSION['flash'] = $publish === 1 ? 'Sermon published.' : 'Sermon unpublished.';
    }
    header('Location: sermons.php');
    exit;
  }

  if ($action === 'delete') {
    $id = (int)($_POST['id'] ?? 0);
    if ($id > 0) {
      $stmt = $pdo->prepare('DELETE FROM sermons WHERE id = :id');
      $stmt->execute([':id' => $id]);
      $_SESSION['flash'] = 'Sermon deleted.';
    }
    header('Location: sermons.php');
    exit;
  }
}

$editId = (int)($_GET['edit'] ?? 0);
$editItem = null;
if ($editId > 0) {
  $stmt = $pdo->prepare('SELECT id, title, speaker, sermon_date, summary, youtube_url, thumbnail_url FROM sermons WHERE id = :id LIMIT 1');
  $stmt->execute([':id' => $editId]);
  $editItem = $stmt->fetch() ?: null;
}

$rows = $pdo->query(
  'SELECT id, title, speaker, sermon_date, is_published, created_at
   FROM sermons
   ORDER BY COALESCE(sermon_date, created_at) DESC, id DESC
   LIMIT 200'
)->fetchAll();

$csrf = admin_csrf_token();
$flash = $_SESSION['flash'] ?? '';
unset($_SESSION['flash']);

$isEditing = is_array($editItem);
?>

<h1 style="margin-top:0;">Sermons</h1>

<?php if (is_string($flash) && $flash !== ''): ?>
  <div class="flash"><?= h($flash) ?></div>
<?php endif; ?>

<div class="card">
  <h2 style="margin-top:0;"><?= $isEditing ? ('Edit Sermon #' . (int)$editItem['id']) : 'Create Sermon' ?></h2>
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
        <label class="muted">Speaker</label>
        <input name="speaker" placeholder="Pastor Name" value="<?= h((string)($editItem['speaker'] ?? '')) ?>" />
      </div>
    </div>
    <div class="row">
      <div>
        <label class="muted">Sermon Date (YYYY-MM-DD)</label>
        <input name="sermon_date" placeholder="2026-02-09" value="<?= h((string)($editItem['sermon_date'] ?? '')) ?>" />
      </div>
      <div>
        <label class="muted">YouTube URL (embed or watch)</label>
        <input name="youtube_url" placeholder="https://www.youtube.com/watch?v=..." value="<?= h((string)($editItem['youtube_url'] ?? '')) ?>" />
      </div>
    </div>
    <div>
      <label class="muted">Thumbnail URL</label>
      <input name="thumbnail_url" placeholder="https://images.unsplash.com/..." value="<?= h((string)($editItem['thumbnail_url'] ?? '')) ?>" />
    </div>
    <div>
      <label class="muted">Summary</label>
      <textarea name="summary"><?= h((string)($editItem['summary'] ?? '')) ?></textarea>
    </div>
    <div class="row">
      <button class="btn primary" type="submit"><?= $isEditing ? 'Update' : 'Create' ?></button>
      <?php if ($isEditing): ?>
        <a class="btn" href="sermons.php">Cancel</a>
      <?php endif; ?>
    </div>
  </form>
</div>

<div class="card">
  <h2 style="margin-top:0;">Existing Sermons</h2>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Speaker</th>
        <th>Date</th>
        <th>Published</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($rows as $r): ?>
        <tr>
          <td><?= (int)$r['id'] ?></td>
          <td><?= h((string)$r['title']) ?></td>
          <td><?= h((string)($r['speaker'] ?? '')) ?></td>
          <td><?= h((string)($r['sermon_date'] ?? '')) ?></td>
          <td><?= (int)$r['is_published'] === 1 ? 'yes' : 'no' ?></td>
          <td>
            <a class="btn" href="sermons.php?edit=<?= (int)$r['id'] ?>">Edit</a>
            <form method="post" style="display:inline; margin-left:6px;">
              <input type="hidden" name="csrf" value="<?= h($csrf) ?>" />
              <input type="hidden" name="action" value="toggle_publish" />
              <input type="hidden" name="id" value="<?= (int)$r['id'] ?>" />
              <input type="hidden" name="publish" value="<?= (int)$r['is_published'] === 1 ? '0' : '1' ?>" />
              <button class="btn" type="submit"><?= (int)$r['is_published'] === 1 ? 'Unpublish' : 'Publish' ?></button>
            </form>
            <form method="post" style="display:inline; margin-left:6px;">
              <input type="hidden" name="csrf" value="<?= h($csrf) ?>" />
              <input type="hidden" name="action" value="delete" />
              <input type="hidden" name="id" value="<?= (int)$r['id'] ?>" />
              <button class="btn danger" type="submit" onclick="return confirm('Delete this sermon?');">Delete</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
</div>

<?php require_once __DIR__ . '/_layout_bottom.php'; ?>
