<?php
declare(strict_types=1);
$title = 'Messages';
require_once __DIR__ . '/_layout_top.php';

$pdo = db();

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
?>

<h1 style="margin-top:0;">Messages</h1>
<p class="muted">Showing newest first. Total: <?= (int)$total ?></p>

<div class="card">
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>When</th>
        <th>Name</th>
        <th>Contact</th>
        <th>Message</th>
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
          <td style="white-space:pre-wrap;"><?= h((string)$r['message']) ?></td>
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

