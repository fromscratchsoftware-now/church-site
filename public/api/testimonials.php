<?php
declare(strict_types=1);

require __DIR__ . '/_bootstrap.php';

$limit = 100;
try {
  $stmt = db()->prepare(
    'SELECT id, full_name, title, quote, avatar_url, created_at
     FROM testimonials
     WHERE is_published = 1
     ORDER BY sort_order ASC, id DESC
     LIMIT :limit'
  );
  $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
  $stmt->execute();
  $rows = $stmt->fetchAll();

  json_response(['ok' => true, 'testimonials' => $rows]);
} catch (Throwable $e) {
  json_response(['ok' => false, 'error' => 'db_error'], 500);
}

