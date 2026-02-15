<?php
declare(strict_types=1);
$title = 'Sermons';
require_once __DIR__ . '/_layout_top.php';

$pdo = db();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  admin_verify_csrf();
  $action = (string)($_POST['action'] ?? '');

  if ($action === 'create') {
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

$rows = $pdo->query(
  'SELECT id, title, speaker, sermon_date, is_published, created_at
   FROM sermons
   ORDER BY COALESCE(sermon_date, created_at) DESC, id DESC
   LIMIT 200'
)->fetchAll();

$csrf = admin_csrf_token();
$flash = $_SESSION['flash'] ?? '';
unset($_SESSION['flash']);
?>

<h1 style="margin-top:0;">Sermons</h1>

<?php if (is_string($flash) && $flash !== ''): ?>
  <div class="flash"><?= h($flash) ?></div>
<?php endif; ?>

<div class="card">
  <h2 style="margin-top:0;">Create Sermon</h2>
  <form method="post">
    <input type="hidden" name="csrf" value="<?= h($csrf) ?>" />
    <input type="hidden" name="action" value="create" />
    <div class="row">
      <div>
        <label class="muted">Title *</label>
        <input name="title" required />
      </div>
      <div>
        <label class="muted">Speaker</label>
        <input name="speaker" placeholder="Pastor Name" />
      </div>
    </div>
    <div class="row">
      <div>
        <label class="muted">Sermon Date (YYYY-MM-DD)</label>
        <input name="sermon_date" placeholder="2026-02-09" />
      </div>
      <div>
        <label class="muted">YouTube URL (embed or watch)</label>
        <input name="youtube_url" placeholder="https://www.youtube.com/watch?v=..." />
      </div>
    </div>
    <div>
      <label class="muted">Thumbnail URL</label>
      <input name="thumbnail_url" placeholder="https://images.unsplash.com/..." />
    </div>
    <div>
      <label class="muted">Summary</label>
      <textarea name="summary"></textarea>
    </div>
    <button class="btn primary" type="submit">Create</button>
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
            <form method="post" style="display:inline;">
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

