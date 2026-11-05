#!/usr/bin/env bash
set -euo pipefail

HUGO_VERSION="0.167.0"
HUGO_ARCHIVE="hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"
HUGO_CHECKSUMS="hugo_${HUGO_VERSION}_checksums.txt"
DOWNLOAD_URL="https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}"
TEMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TEMP_DIR"' EXIT

git submodule update --init --recursive

curl -fsSL "${DOWNLOAD_URL}/${HUGO_ARCHIVE}" -o "${TEMP_DIR}/${HUGO_ARCHIVE}"
curl -fsSL "${DOWNLOAD_URL}/${HUGO_CHECKSUMS}" -o "${TEMP_DIR}/${HUGO_CHECKSUMS}"
grep -E "[[:space:]]${HUGO_ARCHIVE}$" "${TEMP_DIR}/${HUGO_CHECKSUMS}" |
  (cd "$TEMP_DIR" && sha256sum --check --status)

tar -xzf "${TEMP_DIR}/${HUGO_ARCHIVE}" -C "$TEMP_DIR" hugo
"${TEMP_DIR}/hugo" version
"${TEMP_DIR}/hugo" --gc --minify
