<?php
declare(strict_types=1);

require __DIR__ . '/_bootstrap.php';

$limit = 100;
try {
  $stmt = db()->prepare(
    'SELECT id, title, speaker, sermon_date, summary, youtube_url, audio_url, thumbnail_url, duration_seconds
     FROM sermons
     WHERE is_published = 1
     ORDER BY COALESCE(sermon_date, created_at) DESC, id DESC
     LIMIT :limit'
  );
  $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
  $stmt->execute();
  $rows = $stmt->fetchAll();

  json_response(['ok' => true, 'sermons' => $rows]);
} catch (Throwable $e) {
  json_response(['ok' => false, 'error' => 'db_error'], 500);
}

