<?php
declare(strict_types=1);
$title = 'Messages';
require_once __DIR__ . '/_layout_top.php';

$pdo = db();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  admin_verify_csrf();
  $action = (string)($_POST['action'] ?? '');

  if ($action === 'delete') {
    $id = (int)($_POST['id'] ?? 0);
    $pageBack = max(1, (int)($_POST['page'] ?? 1));

    if ($id > 0) {
      $stmt = $pdo->prepare('DELETE FROM contact_messages WHERE id = :id');
      $stmt->execute([':id' => $id]);
      $_SESSION['flash'] = 'Message deleted.';
    }

    header('Location: messages.php?page=' . $pageBack);
    exit;
  }
}

if ((string)($_GET['export'] ?? '') === 'csv') {
  $stmt = $pdo->query(
    'SELECT id, created_at, full_name, email, phone, message
     FROM contact_messages
     ORDER BY id DESC
     LIMIT 5000'
  );

  $filename = 'church_messages_' . date('Ymd_His') . '.csv';
  header('Content-Type: text/csv; charset=utf-8');
  header('Content-Disposition: attachment; filename="' . $filename . '"');

  $out = fopen('php://output', 'w');
  fputcsv($out, ['id', 'created_at', 'full_name', 'email', 'phone', 'message']);

  while ($row = $stmt->fetch()) {
    fputcsv($out, [
      (int)($row['id'] ?? 0),
      (string)($row['created_at'] ?? ''),
      (string)($row['full_name'] ?? ''),
      (string)($row['email'] ?? ''),
      (string)($row['phone'] ?? ''),
      (string)($row['message'] ?? ''),
    ]);
  }

  fclose($out);
  exit;
}

$page = max(1, (int)($_GET['page'] ?? 1));
$pageSize = 50;
$offset = ($page - 1) * $pageSize;

$stmt = $pdo->prepare(
  'SELECT id, full_name, email, phone, message, created_at
   FROM contact_messages
   ORDER BY id DESC
   LIMIT :limit OFFSET :offset'
);
$stmt->bindValue(':limit', $pageSize, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$rows = $stmt->fetchAll();

$countRow = $pdo->query('SELECT COUNT(*) AS c FROM contact_messages')->fetch();
$total = (int)($countRow['c'] ?? 0);
$totalPages = max(1, (int)ceil($total / $pageSize));

$csrf = admin_csrf_token();
$flash = $_SESSION['flash'] ?? '';
unset($_SESSION['flash']);
?>

<h1 style="margin-top:0;">Messages</h1>
<p class="muted">Showing newest first. Total: <?= (int)$total ?></p>

<?php if (is_string($flash) && $flash !== ''): ?>
  <div class="flash"><?= h($flash) ?></div>
<?php endif; ?>

<div class="card">
  <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px;">
    <h2 style="margin:0;">Inbox</h2>
    <a class="btn" href="messages.php?export=csv">Export CSV</a>
  </div>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>When</th>
        <th>Name</th>
        <th>Contact</th>
        <th>Message</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($rows as $r): ?>
        <tr>
          <td><?= (int)$r['id'] ?></td>
          <td><?= h((string)$r['created_at']) ?></td>
          <td><?= h((string)$r['full_name']) ?></td>
          <td>
            <?php if (!empty($r['email'])): ?><div><?= h((string)$r['email']) ?></div><?php endif; ?>
            <?php if (!empty($r['phone'])): ?><div><?= h((string)$r['phone']) ?></div><?php endif; ?>
          </td>
          <td style="white-space:pre-wrap;max-width:480px;"><?= h((string)$r['message']) ?></td>
          <td>
            <form method="post" style="display:inline;">
              <input type="hidden" name="csrf" value="<?= h($csrf) ?>" />
              <input type="hidden" name="action" value="delete" />
              <input type="hidden" name="id" value="<?= (int)$r['id'] ?>" />
              <input type="hidden" name="page" value="<?= (int)$page ?>" />
              <button class="btn danger" type="submit" onclick="return confirm('Delete this message?');">Delete</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
</div>

<div class="row">
  <?php if ($page > 1): ?>
    <a class="btn" href="messages.php?page=<?= $page - 1 ?>">Prev</a>
  <?php else: ?>
    <span class="btn muted">Prev</span>
  <?php endif; ?>
  <div class="muted" style="align-self:center;">Page <?= $page ?> / <?= $totalPages ?></div>
  <?php if ($page < $totalPages): ?>
    <a class="btn" href="messages.php?page=<?= $page + 1 ?>">Next</a>
  <?php else: ?>
    <span class="btn muted">Next</span>
  <?php endif; ?>
</div>

<?php require_once __DIR__ . '/_layout_bottom.php'; ?>
