#!/usr/bin/env bash
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/.." && pwd)
WORKFLOW="$ROOT/.github/workflows/release.yml"
PACKAGE="$ROOT/package.json"
LOCK="$ROOT/package-lock.json"

fail() {
  printf 'FAIL: %s\n' "$1" >&2
  exit 1
}

grep -qF 'actions/create-github-app-token@bcd2ba49218906704ab6c1aa796996da409d3eb1' "$WORKFLOW" || fail 'pinned App-token action is required'
grep -qF 'app-id: ${{ vars.RELEASE_APP_ID }}' "$WORKFLOW" || fail 'RELEASE_APP_ID is not propagated'
grep -qF 'private-key: ${{ secrets.RELEASE_APP_PRIVATE_KEY }}' "$WORKFLOW" || fail 'App private key is not propagated'
grep -qF 'permission-contents: write' "$WORKFLOW" || fail 'App token lacks scoped contents permission'
grep -qF 'permission-issues: write' "$WORKFLOW" || fail 'App token lacks scoped issues permission'
grep -qF 'permission-pull-requests: write' "$WORKFLOW" || fail 'App token lacks scoped pull-request permission'
grep -qF 'token: ${{ steps.app-token.outputs.token }}' "$WORKFLOW" || fail 'checkout does not use the App token'
grep -qF 'gh auth setup-git' "$WORKFLOW" || fail 'Git authentication is not configured'
grep -qF 'GH_TOKEN: ${{ steps.app-token.outputs.token }}' "$WORKFLOW" || fail 'GH_TOKEN does not use the App token'
grep -qF 'GITHUB_TOKEN: ${{ steps.app-token.outputs.token }}' "$WORKFLOW" || fail 'GITHUB_TOKEN does not use the App token'
grep -qF 'npx --no-install semantic-release' "$WORKFLOW" || fail 'semantic-release is not invoked from the lockfile'
test "$(grep -c 'npx --no-install semantic-release' "$WORKFLOW")" -eq 1 || fail 'semantic-release must run exactly once'
! grep -q 'RELEASE_TOKEN' "$WORKFLOW" || fail 'obsolete personal token remains referenced'
! grep -qE 'npm install|while \[' "$WORKFLOW" || fail 'runtime install or blind retry remains'

node - "$PACKAGE" "$LOCK" <<'NODE'
const fs = require('node:fs');
const [packagePath, lockPath] = process.argv.slice(2);
const pkg = JSON.parse(fs.readFileSync(packagePath));
const lock = JSON.parse(fs.readFileSync(lockPath));
const expected = {
  'semantic-release': '25.0.9',
  '@semantic-release/commit-analyzer': '13.0.1',
  '@semantic-release/release-notes-generator': '14.1.1',
  '@semantic-release/npm': '13.1.5',
  '@semantic-release/github': '12.0.9',
};
for (const [name, version] of Object.entries(expected)) {
  if (pkg.devDependencies?.[name] !== version) throw new Error(`${name} is not pinned to ${version}`);
  if (lock.packages?.['']?.devDependencies?.[name] !== version) throw new Error(`lock root lacks ${name}@${version}`);
  if (lock.packages?.[`node_modules/${name}`]?.version !== version) throw new Error(`lock entry lacks ${name}@${version}`);
}
NODE

grep -qF "labels: ['semantic-release']" "$ROOT/release.config.js" || fail 'failure-reporting label is not configured'
printf 'release workflow contract: OK\n'
