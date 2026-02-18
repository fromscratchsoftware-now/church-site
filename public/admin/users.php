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
    } elseif (!admin_ensure_users_schema()) {
      $error = 'User schema migration failed. Please try again or check DB permissions.';
    } else {
      $fullName = trim((string)($_POST['full_name'] ?? ''));
      $username = admin_slug_username((string)($_POST['username'] ?? ''));
      $email = strtolower(trim((string)($_POST['email'] ?? '')));
      $password = (string)($_POST['password'] ?? '');
      $role = admin_normalize_role((string)($_POST['role'] ?? 'editor'));

      if ($fullName === '') {
        $error = 'Full name is required.';
      } elseif (!preg_match('/^[a-z0-9._-]{3,32}$/', $username)) {
        $error = 'Username must be 3-32 chars and contain only letters, numbers, dot, underscore, or dash.';
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
            'INSERT INTO admin_users (full_name, username, email, password_hash, role, is_active, created_by)
             VALUES (:full_name, :username, :email, :password_hash, :role, 1, :created_by)'
          );
          $stmt->bindValue(':full_name', $fullName);
          $stmt->bindValue(':username', $username);
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
            $error = 'A user with that username or email already exists.';
          } else {
            $error = 'Failed to create user. Please try again.';
          }
        }
      }
    }
  }

  if ($action === 'toggle_active') {
    if (!admin_users_table_exists() || !admin_ensure_users_schema()) {
      $error = 'User system is not ready.';
    } else {
      $id = (int)($_POST['id'] ?? 0);
      $setActive = (int)($_POST['set_active'] ?? 0) === 1 ? 1 : 0;

      if ($id <= 0) {
        $error = 'Invalid user id.';
      } else {
        $targetStmt = db()->prepare('SELECT id, role, is_active FROM admin_users WHERE id = :id LIMIT 1');
        $targetStmt->execute([':id' => $id]);
        $target = $targetStmt->fetch();

        if (!$target) {
          $error = 'User not found.';
        } else {
          $current = admin_current_user();
          $currentId = is_array($current) ? (int)($current['id'] ?? 0) : 0;

          if ($setActive === 0 && $currentId > 0 && $currentId === (int)$target['id']) {
            $error = 'You cannot deactivate your own account.';
          } elseif (
            $setActive === 0 &&
            admin_normalize_role((string)$target['role']) === 'admin' &&
            (int)$target['is_active'] === 1
          ) {
            $remainingStmt = db()->prepare(
              'SELECT COUNT(*) AS c FROM admin_users WHERE role = :role AND is_active = 1 AND id <> :id'
            );
            $remainingStmt->execute([
              ':role' => 'admin',
              ':id' => (int)$target['id'],
            ]);
            $remaining = (int)(($remainingStmt->fetch()['c'] ?? 0));

            if ($remaining < 1) {
              $error = 'Cannot deactivate the last active admin.';
            }
          }

          if ($error === '') {
            $update = db()->prepare('UPDATE admin_users SET is_active = :is_active WHERE id = :id');
            $update->execute([
              ':is_active' => $setActive,
              ':id' => (int)$target['id'],
            ]);

            $_SESSION['flash'] = $setActive === 1 ? 'User activated.' : 'User deactivated.';
            header('Location: users.php');
            exit;
          }
        }
      }
    }
  }

  if ($action === 'change_role') {
    if (!admin_users_table_exists() || !admin_ensure_users_schema()) {
      $error = 'User system is not ready.';
    } else {
      $id = (int)($_POST['id'] ?? 0);
      $newRole = admin_normalize_role((string)($_POST['role'] ?? 'editor'));

      if ($id <= 0) {
        $error = 'Invalid user id.';
      } else {
        $targetStmt = db()->prepare('SELECT id, role, is_active FROM admin_users WHERE id = :id LIMIT 1');
        $targetStmt->execute([':id' => $id]);
        $target = $targetStmt->fetch();

        if (!$target) {
          $error = 'User not found.';
        } else {
          $currentRole = admin_normalize_role((string)$target['role']);
          $isActive = (int)$target['is_active'] === 1;

          if ($currentRole === $newRole) {
            $error = 'Role is already set.';
          } elseif ($currentRole === 'admin' && $newRole === 'editor' && $isActive) {
            $remainingStmt = db()->prepare(
              'SELECT COUNT(*) AS c FROM admin_users WHERE role = :role AND is_active = 1 AND id <> :id'
            );
            $remainingStmt->execute([
              ':role' => 'admin',
              ':id' => (int)$target['id'],
            ]);
            $remaining = (int)(($remainingStmt->fetch()['c'] ?? 0));
            if ($remaining < 1) {
              $error = 'Cannot demote the last active admin.';
            }
          }

          if ($error === '') {
            $update = db()->prepare('UPDATE admin_users SET role = :role WHERE id = :id');
            $update->execute([
              ':role' => $newRole,
              ':id' => (int)$target['id'],
            ]);

            $_SESSION['flash'] = 'User role updated to ' . $newRole . '.';
            header('Location: users.php');
            exit;
          }
        }
      }
    }
  }

  if ($action === 'reset_password') {
    if (!admin_users_table_exists() || !admin_ensure_users_schema()) {
      $error = 'User system is not ready.';
    } else {
      $id = (int)($_POST['id'] ?? 0);
      $newPassword = (string)($_POST['new_password'] ?? '');

      if ($id <= 0) {
        $error = 'Invalid user id.';
      } elseif (strlen($newPassword) < 8) {
        $error = 'New password must be at least 8 characters.';
      } else {
        $targetStmt = db()->prepare('SELECT id FROM admin_users WHERE id = :id LIMIT 1');
        $targetStmt->execute([':id' => $id]);
        $target = $targetStmt->fetch();

        if (!$target) {
          $error = 'User not found.';
        } else {
          $hash = password_hash($newPassword, PASSWORD_DEFAULT);
          $update = db()->prepare('UPDATE admin_users SET password_hash = :password_hash WHERE id = :id');
          $update->execute([
            ':password_hash' => $hash,
            ':id' => $id,
          ]);

          $_SESSION['flash'] = 'Password reset successfully.';
          header('Location: users.php');
          exit;
        }
      }
    }
  }
}

$tableReady = admin_users_table_exists();
if ($tableReady) {
  admin_ensure_users_schema();
}

$rows = [];
if ($tableReady) {
  $rows = db()->query(
    'SELECT id, full_name, username, email, role, is_active, last_login_at, created_at
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
          <label class="muted">Username *</label>
          <input name="username" required placeholder="editor" pattern="[A-Za-z0-9._-]{3,32}" />
        </div>
      </div>

      <div class="row">
        <div>
          <label class="muted">Email *</label>
          <input name="email" type="email" required placeholder="editor@church.org" />
        </div>
        <div>
          <label class="muted">Password *</label>
          <input name="password" type="password" minlength="8" required />
        </div>
      </div>

      <div class="row">
        <div>
          <label class="muted">Role *</label>
          <select name="role">
            <option value="editor" selected>Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div></div>
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
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Last Login</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($rows as $r): ?>
          <tr>
            <td><?= (int)$r['id'] ?></td>
            <td><?= h((string)$r['full_name']) ?></td>
            <td><?= h((string)$r['username']) ?></td>
            <td><?= h((string)$r['email']) ?></td>
            <td><?= h(ucfirst(admin_normalize_role((string)$r['role']))) ?></td>
            <td><?= (int)$r['is_active'] === 1 ? 'active' : 'inactive' ?></td>
            <td><?= h((string)($r['last_login_at'] ?? '')) ?></td>
            <td><?= h((string)$r['created_at']) ?></td>
            <td>
              <div style="display:flex; flex-direction:column; gap:8px; min-width:220px;">
                <form method="post" style="display:flex; gap:6px; align-items:center;">
                  <input type="hidden" name="csrf" value="<?= h($csrf) ?>" />
                  <input type="hidden" name="action" value="toggle_active" />
                  <input type="hidden" name="id" value="<?= (int)$r['id'] ?>" />
                  <input type="hidden" name="set_active" value="<?= (int)$r['is_active'] === 1 ? '0' : '1' ?>" />
                  <button class="btn" type="submit"><?= (int)$r['is_active'] === 1 ? 'Deactivate' : 'Activate' ?></button>
                </form>

                <form method="post" style="display:flex; gap:6px; align-items:center;">
                  <input type="hidden" name="csrf" value="<?= h($csrf) ?>" />
                  <input type="hidden" name="action" value="change_role" />
                  <input type="hidden" name="id" value="<?= (int)$r['id'] ?>" />
                  <select name="role" style="max-width:120px; padding:8px;">
                    <option value="editor" <?= admin_normalize_role((string)$r['role']) === 'editor' ? 'selected' : '' ?>>Editor</option>
                    <option value="admin" <?= admin_normalize_role((string)$r['role']) === 'admin' ? 'selected' : '' ?>>Admin</option>
                  </select>
                  <button class="btn" type="submit">Set Role</button>
                </form>

                <form method="post" style="display:flex; gap:6px; align-items:center;">
                  <input type="hidden" name="csrf" value="<?= h($csrf) ?>" />
                  <input type="hidden" name="action" value="reset_password" />
                  <input type="hidden" name="id" value="<?= (int)$r['id'] ?>" />
                  <input name="new_password" type="password" minlength="8" placeholder="New password" style="padding:8px;" required />
                  <button class="btn" type="submit">Reset</button>
                </form>
              </div>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>
<?php endif; ?>

<?php require_once __DIR__ . '/_layout_bottom.php'; ?>
