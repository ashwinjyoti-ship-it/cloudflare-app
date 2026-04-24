# Cloudflare Full-Stack Starter

A production-ready full-stack application built with the Cloudflare stack.

## Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS → Cloudflare Pages
- **Backend**: Cloudflare Workers + Hono + Drizzle ORM
- **Database**: Cloudflare D1 (SQLite)
- **CI/CD**: GitHub Actions

## Quick Start

### 1. Clone & Install
```bash
git clone <repo>
cd cloudflare-fullstack-app
npm install --workspaces
```

### 2. Set up D1 Database
```bash
# Create database (one time)
cd apps/api && npx wrangler d1 create my-app-db
# Update wrangler.toml with the database_id

# Run migrations
npm run db:migrate
```

### 3. Local Development
```bash
# Terminal 1 - API
npm run dev:api

# Terminal 2 - Web
npm run dev:web
```

### 4. Deploy
Push to `main` — GitHub Actions handles deployment automatically.

Or manually:
```bash
# Deploy API
npm run deploy:api

# Deploy Web (via Wrangler or GitHub Actions)
```

## Project Structure
```
apps/
  api/          # Cloudflare Worker (Hono API + D1)
  web/          # React SPA (Vite + Tailwind)
.github/
  workflows/    # CI/CD for Pages + Workers
```

## GitHub Secrets Required
| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Workers & Pages permissions |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |

## Environment Variables (Web)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | URL of your deployed Worker |
