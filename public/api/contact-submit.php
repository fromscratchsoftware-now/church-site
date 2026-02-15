<?php
declare(strict_types=1);

require __DIR__ . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_response(['ok' => false, 'error' => 'method_not_allowed'], 405);
}

$data = read_json_body();
$fullName = trim((string)($data['fullName'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

if ($fullName === '' || $message === '') {
  json_response(['ok' => false, 'error' => 'missing_required_fields'], 400);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? null;
$ipBin = null;
if (is_string($ip) && $ip !== '') {
  $packed = @inet_pton($ip);
  if ($packed !== false) $ipBin = $packed;
}
$ua = $_SERVER['HTTP_USER_AGENT'] ?? null;
if (is_string($ua)) $ua = substr($ua, 0, 512);

try {
  $pdo = db();

  // Basic rate limit: max 5 messages per 5 minutes per IP.
  if ($ipBin !== null) {
    $stmt = $pdo->prepare(
      'SELECT COUNT(*) AS c
       FROM contact_messages
       WHERE ip_address = :ip AND created_at > (UTC_TIMESTAMP() - INTERVAL 5 MINUTE)'
    );
    $stmt->bindValue(':ip', $ipBin, PDO::PARAM_LOB);
    $stmt->execute();
    $c = (int)($stmt->fetch()['c'] ?? 0);
    if ($c >= 5) {
      json_response(['ok' => false, 'error' => 'rate_limited'], 429);
    }
  }

  $stmt = $pdo->prepare(
    'INSERT INTO contact_messages (full_name, email, phone, message, ip_address, user_agent)
     VALUES (:full_name, :email, :phone, :message, :ip_address, :user_agent)'
  );
  $stmt->execute([
    ':full_name' => $fullName,
    ':email' => $email !== '' ? $email : null,
    ':phone' => $phone !== '' ? $phone : null,
    ':message' => $message,
    ':ip_address' => $ipBin,
    ':user_agent' => $ua,
  ]);

  json_response(['ok' => true]);
} catch (Throwable $e) {
  json_response(['ok' => false, 'error' => 'db_error'], 500);
}

