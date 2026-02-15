#!/usr/bin/env bash
set -euo pipefail

# Installs a repo-local Node.js toolchain under .tools/node/ based on .nvmrc.
# This avoids relying on an outdated system Node (common on shared hosts / older Macs).

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION="$(cat "${ROOT_DIR}/.nvmrc" | tr -d '[:space:]')"
INSTALL_DIR="${ROOT_DIR}/.tools/node"

ARCH="$(uname -m)"
case "${ARCH}" in
  arm64) PLATFORM="darwin-arm64" ;;
  x86_64) PLATFORM="darwin-x64" ;;
  *)
    echo "Unsupported architecture: ${ARCH}" >&2
    exit 1
    ;;
esac

URL="https://nodejs.org/dist/v${VERSION}/node-v${VERSION}-${PLATFORM}.tar.gz"

mkdir -p "${INSTALL_DIR}"

if [[ -x "${INSTALL_DIR}/bin/node" ]]; then
  echo "Node already installed at ${INSTALL_DIR}"
  "${INSTALL_DIR}/bin/node" -v
  exit 0
fi

echo "Downloading ${URL}"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "${TMP_DIR}"' EXIT

curl -fsSL "${URL}" -o "${TMP_DIR}/node.tgz"
tar -xzf "${TMP_DIR}/node.tgz" -C "${TMP_DIR}"

# node-vX.Y.Z-PLATFORM/
SRC_DIR="$(find "${TMP_DIR}" -maxdepth 1 -type d -name "node-v${VERSION}-*" | head -n 1)"
if [[ -z "${SRC_DIR}" ]]; then
  echo "Failed to unpack Node archive" >&2
  exit 1
fi

rm -rf "${INSTALL_DIR}"
mkdir -p "${INSTALL_DIR}"
cp -a "${SRC_DIR}/." "${INSTALL_DIR}/"

echo "Installed:"
"${INSTALL_DIR}/bin/node" -v
# npm's launcher uses /usr/bin/env node, so ensure our node is first on PATH.
PATH="${INSTALL_DIR}/bin:${PATH}" "${INSTALL_DIR}/bin/npm" -v
