<?php
declare(strict_types=1);

// Configuration resolution order:
// 1) public/api/config.local.php (not committed; create on SiteGround)
// 2) environment variables

$local = __DIR__ . '/config.local.php';
if (is_file($local)) {
  /** @noinspection PhpIncludeInspection */
  require $local;
}

// Defaults are placeholders; do not deploy without setting real values.
if (!defined('DB_HOST')) define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
if (!defined('DB_PORT')) define('DB_PORT', getenv('DB_PORT') ?: '3306');
if (!defined('DB_NAME')) define('DB_NAME', getenv('DB_NAME') ?: 'CHANGE_ME');
if (!defined('DB_USER')) define('DB_USER', getenv('DB_USER') ?: 'CHANGE_ME');
if (!defined('DB_PASSWORD')) define('DB_PASSWORD', getenv('DB_PASSWORD') ?: 'CHANGE_ME');

// Admin auth (optional). Recommended: define('ADMIN_PASSWORD_HASH', password_hash('...', PASSWORD_DEFAULT))
if (!defined('ADMIN_PASSWORD')) define('ADMIN_PASSWORD', getenv('ADMIN_PASSWORD') ?: '');
if (!defined('ADMIN_PASSWORD_HASH')) define('ADMIN_PASSWORD_HASH', getenv('ADMIN_PASSWORD_HASH') ?: '');
