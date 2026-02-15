# SiteGround MySQL Setup (church.fromscratchsoftware.net/1)

This project’s UI is a Vite/React frontend. MySQL is the right database choice on SiteGround, but note: **a frontend cannot connect directly to MySQL**. This repo includes a **PHP + PDO JSON API** under `public/api/` that is copied into `dist/api/` on build.

## 1) Create Database + User

1. Log into SiteGround **Site Tools** for `church.fromscratchsoftware.net`.
2. Go to **Site** → **MySQL** → **Databases**.
3. Under **Create New Database**, create a database (example): `church1`.
4. Under **Create New User**, create a user (example): `church1_user` and set a strong password.
5. Under **Add User to Database**, select the user and the database and grant **All Privileges**.

Record these values:

- `DB_HOST` (often `localhost` on SiteGround)
- `DB_PORT` (usually `3306`)
- `DB_NAME` (example: `church1`)
- `DB_USER` (example: `church1_user`)
- `DB_PASSWORD` (the password you set)

## 2) Import the Schema

1. Go to **Site** → **MySQL** → **phpMyAdmin**.
2. In phpMyAdmin, select your database on the left.
3. Click the **SQL** tab.
4. Paste the contents of:
   - `/Users/paul/Documents/Church/1/db/schema.sql`
5. Click **Go** to execute.

## 3) Configure PHP API Credentials

The PHP API reads DB credentials from `public/api/config.local.php` (not committed).

1. On your local machine, copy:
   - `/Users/paul/Documents/Church/1/public/api/config.example.php`
   - to `/Users/paul/Documents/Church/1/public/api/config.local.php`
2. Edit `config.local.php` and paste your real SiteGround MySQL credentials.

Optional (recommended): enable the admin UI at `/1/admin/` by adding an admin password hash:

```php
define('ADMIN_PASSWORD_HASH', password_hash('YOUR_PASSWORD_HERE', PASSWORD_DEFAULT));
```

## 3) Confirm Tables Exist

In phpMyAdmin, you should see these tables:

- `sermons`
- `events`
- `event_registrations`
- `testimonials`
- `blog_posts`
- `contact_messages`

## 4) Build For Subdirectory `/1`

This site is deployed at `https://church.fromscratchsoftware.net/1`, so the Vite build must use a base path of `/1/`.

Run the build with (Node 18+ required):

```bash
cd /Users/paul/Documents/Church/1
VITE_BASE_PATH=/1/ npm run build
```

This produces `dist/` with:

- the static site
- `dist/api/*.php` (the PHP endpoints)
- `dist/.htaccess` (SPA routing for `/1`)

## 5) Upload To SiteGround

1. In SiteGround Site Tools go to **Site** → **File Manager**.
2. Navigate to `public_html/`.
3. Create a folder `1/` (if it doesn’t exist).
4. Upload the contents of `/Users/paul/Documents/Church/1/dist/` into `public_html/1/`.
5. In `public_html/1/api/`, upload your `config.local.php` (from step 3).

## 5a) Avoid Blank Page After Deploy (Dynamic Cache)

SiteGround can cache `index.html`. If `index.html` is cached but the asset filenames in `assets/` changed (Vite hash names), the browser will load a missing JS file and show a blank page.

This repo’s `public/.htaccess` sets **no-cache headers** for `index.html` to reduce this risk.

If you ever see a blank page after deploying:

1. Site Tools → **Speed** → **Caching** → **Flush Cache**
2. Temporary cache-bypass URL: `https://church.fromscratchsoftware.net/1/?v=TIMESTAMP`

## 6) Verify API + SPA Routing

1. Visit:
   - `https://church.fromscratchsoftware.net/1/api/health.php`
2. You should get JSON like:
   - `{ "ok": true, "db": true }`
3. Verify a client-side route loads (SPA rewrite):
   - `https://church.fromscratchsoftware.net/1/events`

## 7) Current Endpoints

- `GET /1/api/health.php`
- `GET /1/api/events.php`
- `GET /1/api/sermons.php`
- `GET /1/api/testimonials.php`
- `POST /1/api/event-register.php`
- `POST /1/api/contact-submit.php`
- `POST /1/api/visit-submit.php`

## 8) Admin UI (Optional)

The admin UI lives at:

- `https://church.fromscratchsoftware.net/1/admin/`

To enable it, set `ADMIN_PASSWORD_HASH` (recommended) or `ADMIN_PASSWORD` in:

- `public_html/1/api/config.local.php`
