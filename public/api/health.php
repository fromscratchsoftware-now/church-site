<?php
declare(strict_types=1);

require __DIR__ . '/_bootstrap.php';

try {
  $stmt = db()->query('SELECT 1 AS ok');
  $row = $stmt->fetch();
  json_response(['ok' => true, 'db' => (bool)($row['ok'] ?? false)]);
} catch (Throwable $e) {
  json_response(['ok' => false, 'error' => 'db_error'], 500);
}

