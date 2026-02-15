#!/usr/bin/env bash
set -euo pipefail

# Prefer repo-local node (scripts/install_node_local.sh), then Homebrew node/npm,
# otherwise fall back to whatever is on PATH.
if [[ -x "$(dirname "$0")/../.tools/node/bin/node" ]]; then
  export PATH="$(cd "$(dirname "$0")/.." && pwd)/.tools/node/bin:$PATH"
elif [[ -x /opt/homebrew/bin/node ]]; then
  # Avoid accidentally using an ancient /usr/local node (some systems still have node 12).
  export PATH="/opt/homebrew/bin:$PATH"
fi

if ! node -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 18 ? 0 : 1)' >/dev/null 2>&1; then
  echo "Node >= 18 is required to build. Current: $(node -v 2>/dev/null || echo 'missing')" >&2
  echo "Fix: run scripts/install_node_local.sh" >&2
  exit 1
fi

BASE_PATH="${VITE_BASE_PATH:-/1/}"
VITE_BASE_PATH="$BASE_PATH" npm run build
