<?php
declare(strict_types=1);

require __DIR__ . '/_bootstrap.php';

$limit = 100;
try {
  $stmt = db()->prepare(
    'SELECT
        id,
        title,
        description,
        location_name,
        DATE_FORMAT(starts_at, "%Y-%m-%dT%H:%i:%s") AS starts_at,
        DATE_FORMAT(ends_at, "%Y-%m-%dT%H:%i:%s") AS ends_at,
        image_url,
        category
     FROM events
     WHERE is_published = 1
     ORDER BY COALESCE(starts_at, created_at) ASC, id ASC
     LIMIT :limit'
  );
  $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
  $stmt->execute();
  $rows = $stmt->fetchAll();

  json_response(['ok' => true, 'events' => $rows]);
} catch (Throwable $e) {
  json_response(['ok' => false, 'error' => 'db_error'], 500);
}
