# Fullstack Test — React + Node + Prisma + Postgres

Minimal, production-style full-stack app you can stand up in minutes.

-   **Frontend:** React + Vite + TypeScript + React Router + React Query
-   **Backend:** Node 20 + Express + TypeScript + Prisma (PostgreSQL) + Zod (validation) + JWT (auth)
-   **DX:** ESLint/Prettier (opt-in), Docker Compose for Postgres
-   **Tests:** Jest + Supertest ready (sample included)

## ✨ Features

-   JWT **Authentication** (register, login) with password hashing
-   **Items** CRUD (example) with **search** and **pagination**
-   **Protected routes** on the frontend
-   Validated **request schemas** (Zod) and consistent HTTP errors
-   Clean repo layout with `.env.example` and Dockerized DB

## 🗂 Project structure

fullstack-test/
backend/
src/
index.ts
env.ts
prisma.ts
middleware/validate.ts
modules/
auth/
auth.routes.ts
auth.controller.ts
auth.schemas.ts
items/
items.routes.ts
items.controller.ts
items.schemas.ts
prisma/
schema.prisma
seed.ts
package.json
tsconfig.json
jest.config.json
.env.example
frontend/
src/
main.tsx
App.tsx
auth.ts
api/client.ts
pages/
HomePage.tsx
LoginPage.tsx
RegisterPage.tsx
ItemsPage.tsx
components/
Form.tsx
package.json
tsconfig.json
vite.config.ts
index.html
.env.example
docker-compose.yml
README.md

## 🚀 Quick start

### 0) Prereqs

-   Node 18+ (Node 20 recommended), npm
-   Docker Engine + Compose plugin

### 1) Start Postgres

```bash
# from repo root
docker compose up --detach
```

If port 5432 is busy, change it in docker-compose.yml to 5433:5432 and update backend/.env accordingly.

### 2) Backend

```
cd backend
cp .env.example .env # DATABASE_URL, JWT_SECRET
npm i
npx prisma generate
npm run prisma:push
npm run prisma:seed # seeds demo user + items (email: demo@example.com, pwd: demo1234)
npm run dev # API at http://localhost:4000
```

### 3) Frontend

```
cd ../frontend
cp .env.example .env # VITE_API_URL=http://localhost:4000
npm i
npm run dev # App at http://localhost:5173
```

### 4) Use the app

-   Open http://localhost:5173/
-   Sign in (demo): demo@example.com / demo1234
-   Or Create account on /register
-   Manage items on /items

#### 🔐 Auth

-   POST /api/auth/register — { email, password } → 201
-   POST /api/auth/login — { email, password } → { token }
-   Authenticated requests: Authorization: Bearer <token>

#### 📦 Items API (examples)

-   GET /api/items?q=&page=1&limit=10 → { items, total, page, pages }
-   POST /api/items → { id, title, notes, ... }
    { "title": "My item", "notes": "optional" }

#### 🧪 Tests (API)

A sample Jest test is ready to expand:

```
cd backend
npm run test
```

For UI tests, add Playwright (npx playwright init) and cover login + items checks.

#### ⚙️ Environment

backend/.env

```
DATABASE_URL=postgresql://app:app@localhost:5432/appdb
JWT_SECRET=change_me
PORT=4000
```

frontend/.env

```
VITE_API_URL=http://localhost:4000
```

#### 🩹 Troubleshooting

Docker daemon not running
Cannot connect to the Docker daemon at unix:///var/run/docker.sock

# → Start Docker service (Linux):

```
sudo systemctl enable --now docker
```

Compose warns about version:
Compose v2 ignores it. Remove the version: line in docker-compose.yml.

permission denied for schema public on prisma:push
Your DB volume was initialized before env vars took effect. Easiest fix:

```
docker compose down -v # DANGER: deletes db volume
docker compose up -d
```

Or grant privileges via psql (see discussion in issues).

Prisma “take expects Int, got String”
Make sure Zod coercions are applied back to req.query in the validate middleware (already fixed here).

Port in use (5432, 4000, 5173)
Change the left side mapping in docker-compose.yml or update .env ports and rerun.

🧭 Design decisions (high level)

-   Keep infra simple: Postgres in Docker, Node/React local.
-   Auth via stateless JWT for test-task simplicity (no refresh/rotation).
-   Zod at the edge to guarantee types & validate inputs.
-   React Query for fetching, caching, and mutation ergonomics.
-   Prisma for schema-first dev speed and safety.

🔒 Security notes (scoped to test)

-   Passwords hashed with bcryptjs (10 rounds).
-   JWT secret comes from .env — never commit real secrets.
-   CORS is open during local dev; lock it down in prod.

🛣️ Roadmap (nice-to-haves)

-   PUT/DELETE items endpoints + UI actions
-   E2E tests with Playwright (auth + items)
-   Role-based access (admin/user)
-   Input sanitization & stricter CSP on frontend
-   Dockerfile for backend + single docker compose up for full app
