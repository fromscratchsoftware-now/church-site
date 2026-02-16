#!/usr/bin/env bash
set -euo pipefail

# Deploy Vite build output to SiteGround via rsync over SSH.
#
# Requirements:
# - SSH key installed for the SiteGround SSH user
# - Build already ran (or set RUN_BUILD=1)
#
# Secrets:
# - Do not deploy public/api/config.local.php from local; keep it server-only.

if [[ "${RUN_BUILD:-0}" == "1" ]]; then
  "$(dirname "$0")/build.sh"
fi

REMOTE_HOST="${REMOTE_HOST:-ssh.fromscratchsoftware.net}"
REMOTE_USER="${REMOTE_USER:-u2157-7bwqlpxpdyr8}"
REMOTE_PORT="${REMOTE_PORT:-18765}"
REMOTE_PATH="${REMOTE_PATH:-www/church.fromscratchsoftware.net/public_html/1/}"
SSH_KEY="${SSH_KEY:-.codex_ssh/church_siteground_ed25519}"

if [[ ! -d dist ]]; then
  echo "Missing ./dist. Run: VITE_BASE_PATH=/1/ npm run build"
  exit 1
fi

# Safety: this deployment targets /1/, so built asset paths must include /1/.
if ! grep -q '/1/assets/' dist/index.html; then
  echo "Refusing deploy: dist/index.html is not built for /1/ (missing /1/assets/)." >&2
  echo "Run with: VITE_BASE_PATH=/1/ npm run build  (or RUN_BUILD=1 ./scripts/deploy_siteground.sh)" >&2
  exit 1
fi

rsync -az --delete \
  --exclude 'api/config.local.php' \
  -e "ssh -i ${SSH_KEY} -p ${REMOTE_PORT}" \
  dist/ \
  "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"

echo "Deployed dist/ -> ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"

