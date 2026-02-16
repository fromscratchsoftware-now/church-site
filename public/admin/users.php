<?php
declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';
admin_require_auth();
admin_require_admin();

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  admin_verify_csrf();
  $action = (string)($_POST['action'] ?? '');

  if ($action === 'init_table') {
    if (admin_create_users_table()) {
      $_SESSION['flash'] = 'User system initialized.';
      header('Location: users.php');
      exit;
    }
    $error = 'Could not initialize user table. Verify DB connection/permissions.';
  }

  if ($action === 'create') {
    if (!admin_users_table_exists() && !admin_create_users_table()) {
      $error = 'User table is not ready. Initialize it first.';
    } else {
      $fullName = trim((string)($_POST['full_name'] ?? ''));
      $email = strtolower(trim((string)($_POST['email'] ?? '')));
      $password = (string)($_POST['password'] ?? '');
      $role = admin_normalize_role((string)($_POST['role'] ?? 'editor'));

      if ($fullName === '') {
        $error = 'Full name is required.';
      } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Valid email is required.';
      } elseif (strlen($password) < 8) {
        $error = 'Password must be at least 8 characters.';
      } else {
        try {
          $hash = password_hash($password, PASSWORD_DEFAULT);
          $createdBy = admin_current_user();
          $createdById = is_array($createdBy) ? (int)($createdBy['id'] ?? 0) : 0;
          if ($createdById <= 0) $createdById = null;

          $stmt = db()->prepare(
            'INSERT INTO admin_users (full_name, email, password_hash, role, is_active, created_by)
             VALUES (:full_name, :email, :password_hash, :role, 1, :created_by)'
          );
          $stmt->bindValue(':full_name', $fullName);
          $stmt->bindValue(':email', $email);
          $stmt->bindValue(':password_hash', $hash);
          $stmt->bindValue(':role', $role);
          if ($createdById === null) {
            $stmt->bindValue(':created_by', null, PDO::PARAM_NULL);
          } else {
            $stmt->bindValue(':created_by', $createdById, PDO::PARAM_INT);
          }
          $stmt->execute();

          $_SESSION['flash'] = ucfirst($role) . ' user created.';
          header('Location: users.php');
          exit;
        } catch (PDOException $e) {
          $sqlState = (string)$e->getCode();
          if ($sqlState === '23000') {
            $error = 'A user with that email already exists.';
          } else {
            $error = 'Failed to create user. Please try again.';
          }
        }
      }
    }
  }
}

$tableReady = admin_users_table_exists();
$rows = [];
if ($tableReady) {
  $rows = db()->query(
    'SELECT id, full_name, email, role, is_active, last_login_at, created_at
     FROM admin_users
     ORDER BY id DESC
     LIMIT 500'
  )->fetchAll();
}

$title = 'Users';
require_once __DIR__ . '/_layout_top.php';

$csrf = admin_csrf_token();
$flash = $_SESSION['flash'] ?? '';
unset($_SESSION['flash']);
?>

<h1 style="margin-top:0;">Users</h1>
<p class="muted">Admins can add users and assign roles. Editors can manage website content but cannot access this page.</p>

<?php if (is_string($flash) && $flash !== ''): ?>
  <div class="flash"><?= h($flash) ?></div>
<?php endif; ?>

<?php if ($error !== ''): ?>
  <div class="flash" style="border-color:#b91c1c;color:#b91c1c;"><?= h($error) ?></div>
<?php endif; ?>

<?php if (!$tableReady): ?>
  <div class="card">
    <h2 style="margin-top:0;">Initialize User System</h2>
    <p class="muted">The <code>admin_users</code> table does not exist yet.</p>
    <form method="post">
      <input type="hidden" name="csrf" value="<?= h($csrf) ?>" />
      <input type="hidden" name="action" value="init_table" />
      <button class="btn primary" type="submit">Initialize</button>
    </form>
  </div>
<?php else: ?>
  <div class="card">
    <h2 style="margin-top:0;">Add User</h2>
    <form method="post">
      <input type="hidden" name="csrf" value="<?= h($csrf) ?>" />
      <input type="hidden" name="action" value="create" />

      <div class="row">
        <div>
          <label class="muted">Full Name *</label>
          <input name="full_name" required />
        </div>
        <div>
          <label class="muted">Email *</label>
          <input name="email" type="email" required placeholder="editor@church.org" />
        </div>
      </div>

      <div class="row">
        <div>
          <label class="muted">Password *</label>
          <input name="password" type="password" minlength="8" required />
        </div>
        <div>
          <label class="muted">Role *</label>
          <select name="role">
            <option value="editor" selected>Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <button class="btn primary" type="submit">Create User</button>
    </form>
  </div>

  <div class="card">
    <h2 style="margin-top:0;">Existing Users</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Last Login</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($rows as $r): ?>
          <tr>
            <td><?= (int)$r['id'] ?></td>
            <td><?= h((string)$r['full_name']) ?></td>
            <td><?= h((string)$r['email']) ?></td>
            <td><?= h(ucfirst(admin_normalize_role((string)$r['role']))) ?></td>
            <td><?= (int)$r['is_active'] === 1 ? 'active' : 'inactive' ?></td>
            <td><?= h((string)($r['last_login_at'] ?? '')) ?></td>
            <td><?= h((string)$r['created_at']) ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>
<?php endif; ?>

<?php require_once __DIR__ . '/_layout_bottom.php'; ?>
