#!/usr/bin/env bash
set -euo pipefail

# ─── Colors ───────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info()  { echo -e "${GREEN}►${NC} $*"; }
warn()  { echo -e "${YELLOW}!${NC} $*"; }
error() { echo -e "${RED}✗${NC} $*" >&2; exit 1; }

# ─── Checks ───────────────────────────────────────────────────────────────────
command -v docker >/dev/null 2>&1 || error "Docker is required but not installed. Install from https://docs.docker.com/get-docker/"
command -v pnpm   >/dev/null 2>&1 || warn "pnpm not found — using npm instead."
PNPM=${PNPM:-$(command -v pnpm 2>/dev/null || echo "npm")}

# ─── Step 1: Environment ─────────────────────────────────────────────────────
if [ ! -f .env ]; then
  info "Creating .env from .env.example..."
  cp .env.example .env
  warn "Review .env and adjust values if needed."
else
  info ".env already exists, skipping."
fi

# ─── Step 2: PostgreSQL via Docker Compose ───────────────────────────────────
info "Starting PostgreSQL container..."
docker compose up -d db
info "Cleaning up database (dropping & recreating)..."
docker exec compro-db psql -U postgres -c "DROP DATABASE IF EXISTS compro WITH (FORCE);" > /dev/null 2>&1
docker exec compro-db psql -U postgres -c "CREATE DATABASE compro;" > /dev/null 2>&1
info "Waiting for database to be ready..."
until docker exec compro-db pg_isready -U postgres -d compro > /dev/null 2>&1; do
  sleep 2
done
info "Database is ready."

# ─── Step 3: Install dependencies ────────────────────────────────────────────
info "Installing dependencies ($PNPM)..."
$PNPM install

# ─── Step 4: Generate Payload types and import map ───────────────────────────
info "Generating Payload types and import map..."
$PNPM generate:types
$PNPM generate:importmap

# ─── Step 5: Seed database ───────────────────────────────────────────────────
SEED_PRESET="${1:-generic}"
info "Seeding database with preset: $SEED_PRESET..."
PRESET="$SEED_PRESET" npx --yes pnpm@10 seed

# ─── Done ────────────────────────────────────────────────────────────────────
echo ""
info "Setup complete!"
echo ""
echo "  Start the dev server:    $PNPM dev"
echo "  Open admin panel:        http://localhost:3000/admin"
echo "  Open public site:        http://localhost:3000"
echo ""
echo "  Available seed presets:  $PNPM seed:list"
echo ""
