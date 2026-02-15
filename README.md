# Church Website (Vite + React + PHP + MySQL)

Deployed at: `https://church.fromscratchsoftware.net/1/`

This repo is a Vite/React frontend that reads/writes data via a small PHP (PDO) JSON API deployed alongside the static build. The database is MySQL (SiteGround).

## Project Structure

- `src/`: React app (pages fetch data from the API)
- `public/api/`: PHP JSON API endpoints (copied to `dist/api/` on build)
- `public/admin/`: PHP admin UI (copied to `dist/admin/` on build)
- `db/schema.sql`: MySQL schema
- `db/seed.sql`: sample seed data
- `db/siteground-setup.md`: SiteGround setup steps
- `scripts/build.sh`: build using Homebrew Node if available
- `scripts/deploy_siteground.sh`: rsync deploy (keeps `api/config.local.php` server-only)

## Local Dev

1. Install Node (recommended: match `.nvmrc`).
2. Install deps:
   - `npm ci`
3. Run dev server:
   - `npm run dev`

## Build For SiteGround Subdirectory `/1`

```bash
VITE_BASE_PATH=/1/ npm run build
```

## Secrets / Production Config

Do not commit secrets. Production DB/admin secrets live on the server in:

- `public_html/1/api/config.local.php`

That file is intentionally excluded from deploy scripts.

