#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

run_example() {
  local example_path="$1"
  yarn --cwd "$example_path" install --non-interactive
  yarn --cwd "$example_path" test
}

run_share_example() {
  yarn build -p packages/reactant-share
  run_example examples/reactant-share-vite-treeshaking
}

run_runtime_example() {
  local packages=(
    packages/reactant
    packages/reactant-di
    packages/reactant-last-action
    packages/reactant-model
    packages/reactant-module
    packages/reactant-redux
    packages/reactant-router
    packages/reactant-router-dom
    packages/reactant-ssr
    packages/reactant-storage
    packages/reactant-web
  )

  for package_path in "${packages[@]}"; do
    yarn build -p "$package_path"
  done

  run_example examples/runtime-vite-treeshaking
}

cd "$ROOT_DIR"

case "${1:-all}" in
  share)
    run_share_example
    ;;
  runtime)
    run_runtime_example
    ;;
  all)
    run_share_example
    run_runtime_example
    ;;
  *)
    echo "Usage: $0 [share|runtime|all]" >&2
    exit 1
    ;;
esac
