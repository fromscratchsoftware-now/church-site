<?php
declare(strict_types=1);

// Shared bootstrap for API endpoints.

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
// These endpoints are dynamic; do not cache at the CDN/proxy layer.
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  // If you later add CORS, respond to preflight quickly.
  http_response_code(204);
  exit;
}

require_once __DIR__ . '/_config.php';
require_once __DIR__ . '/_db.php';

function json_response(array $payload, int $status = 200): void {
  http_response_code($status);
  echo json_encode($payload, JSON_UNESCAPED_SLASHES);
  exit;
}

function read_json_body(): array {
  $raw = file_get_contents('php://input');
  if ($raw === false || trim($raw) === '') {
    return [];
  }
  $data = json_decode($raw, true);
  if (!is_array($data)) {
    json_response(['ok' => false, 'error' => 'invalid_json'], 400);
  }
  return $data;
}
