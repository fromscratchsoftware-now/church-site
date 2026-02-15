<?php
declare(strict_types=1);

require __DIR__ . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_response(['ok' => false, 'error' => 'method_not_allowed'], 405);
}

$data = read_json_body();
$event = $data['event'] ?? null;
$reg = $data['registration'] ?? null;

if (!is_array($event) || !is_array($reg)) {
  json_response(['ok' => false, 'error' => 'invalid_payload'], 400);
}

$eventTitle = trim((string)($event['title'] ?? ''));
$eventLocation = trim((string)($event['location'] ?? ''));
$eventCategory = trim((string)($event['category'] ?? ''));

$fullName = trim((string)($reg['fullName'] ?? ''));
$email = trim((string)($reg['email'] ?? ''));
$phone = trim((string)($reg['phone'] ?? ''));
$notes = trim((string)($reg['notes'] ?? ''));

if ($eventTitle === '' || $fullName === '' || $email === '' || $phone === '') {
  json_response(['ok' => false, 'error' => 'missing_required_fields'], 400);
}

try {
  $pdo = db();
  $pdo->beginTransaction();

  // Find an existing event by title (simple heuristic for the current static UI).
  $stmt = $pdo->prepare('SELECT id FROM events WHERE title = :title ORDER BY id DESC LIMIT 1');
  $stmt->execute([':title' => $eventTitle]);
  $row = $stmt->fetch();

  if ($row && isset($row['id'])) {
    $eventId = (int)$row['id'];
  } else {
    $stmt = $pdo->prepare(
      'INSERT INTO events (title, description, location_name, category, registration_enabled, is_published)
       VALUES (:title, NULL, :location_name, :category, 1, 1)'
    );
    $stmt->execute([
      ':title' => $eventTitle,
      ':location_name' => $eventLocation !== '' ? $eventLocation : null,
      ':category' => $eventCategory !== '' ? $eventCategory : null,
    ]);
    $eventId = (int)$pdo->lastInsertId();
  }

  $stmt = $pdo->prepare(
    'INSERT INTO event_registrations (event_id, full_name, email, phone, notes, status)
     VALUES (:event_id, :full_name, :email, :phone, :notes, \'registered\')'
  );
  $stmt->execute([
    ':event_id' => $eventId,
    ':full_name' => $fullName,
    ':email' => $email !== '' ? $email : null,
    ':phone' => $phone !== '' ? $phone : null,
    ':notes' => $notes !== '' ? $notes : null,
  ]);

  $pdo->commit();

  json_response(['ok' => true]);
} catch (Throwable $e) {
  if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
    $pdo->rollBack();
  }
  json_response(['ok' => false, 'error' => 'db_error'], 500);
}

