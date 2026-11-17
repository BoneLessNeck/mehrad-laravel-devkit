# Mehrad Laravel Devkit

A standardized **Laravel 12 + React 19 + Inertia.js + TypeScript + Tailwind CSS v4 + shadcn/ui (Radix UI)** Starter Kit designed as an independent foundation for custom web applications, admin panels, CMSs, and CRMs.

> **Current Implementation Status: Phase 1 (Stabilized Starter Foundation)**
> This repository implements Phase 1 of [`Design.md`](./Design.md). Core toolkit modules (Roles & Permissions, Activity Log, Module Catalog, CLI installers, and presets) belong to Phases 2–4 and are intentionally not installed in the base template.

---

## Implemented Features (Phase 1)

- **Laravel 12** standard application layout (`app/`, `bootstrap/`, `config/`, `database/`, `routes/`, `tests/`)
- **React 19 + TypeScript + Inertia.js** (`@inertiajs/react` + `inertiajs/inertia-laravel` + `laravel-vite-plugin` + `ziggy-js`) under `resources/js/` (`app.tsx`, `pages/`, `layouts/`, `components/ui/`, `hooks/`, `lib/`, `types/`)
- **Tailwind CSS v4** with semantic Light, Dark, and System theme persistence (`@custom-variant dark` and `resources/js/hooks/use-appearance.ts`)
- **UI Primitives** built with Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-label`, `@radix-ui/react-separator`, `@radix-ui/react-slot`)
- **Authentication Flows**:
  - Registration (`GET/POST /register`)
  - Rate-limited Login with Remember Me (`GET/POST /login`)
  - Logout with session invalidation (`POST /logout`)
  - Forgot Password email link request (`GET/POST /forgot-password`)
  - Password Reset form & submission (`GET /reset-password/{token}`, `POST /reset-password`)
- **Protected Dashboard & User Settings** (`auth` middleware):
  - Starter Kit Dashboard (`/dashboard`)
  - Profile & email updates (`/settings/profile`)
  - Password-confirmed account deletion (`DELETE /settings/profile`)
  - Password update (`/settings/password`)
  - Appearance theme selector (`/settings/appearance`)
- **Docker / Laravel Sail** (`compose.yaml` with PHP 8.4, MySQL 8.0, and Mailpit — no Redis required)
- **Code Quality & CI**: Laravel Pint (`pint.json`), Pest (`phpunit.xml`), ESLint (`eslint.config.js`), Prettier (`.prettierrc`), TypeScript (`npm run typecheck`), and GitHub Actions (`.github/workflows/ci.yml`)

## Optional & Planned Integrations

- **Optional Integrations (Not Required by Default)**: Redis (caching/queues), Meilisearch/Typesense, Sanctum, Socialite, Horizon, Telescope.
- **Planned Future Modules (Phases 2–4)**: Roles & Permissions (`spatie/laravel-permission`), Activity Log (`spatie/laravel-activitylog`), Media Library, Backups, Module Catalog & CLI (`mehrad:module:*`), `minimal` and `cms-crm` presets.
- **Note on Email Verification**: The `users` migration includes `email_verified_at`, and `ProfileController::update` resets `email_verified_at` when an email changes, while `MustVerifyEmail` and email verification routes are not enabled in Phase 1.

---

## Prerequisites

- **PHP** `^8.3` (or **Docker** + **Docker Compose** for Laravel Sail)
- **Composer** `^2.7`
- **Node.js** `^22` & **npm** `^10`
- **MySQL 8.0+** (or SQLite for local testing; Pest tests run against SQLite `:memory:` per `phpunit.xml`)

---

## Local Installation & Setup

### Option A: Local PHP + Composer

```bash
git clone <repository-url> mehrad-laravel-devkit
cd mehrad-laravel-devkit
cp .env.example .env
composer install
npm install
php artisan key:generate
php artisan migrate
composer run dev
```

*(Note: `.env.example` defaults to `DB_HOST=mysql` and `MAIL_HOST=mailpit` for Laravel Sail. When running locally without Docker, update `DB_HOST=127.0.0.1`, `DB_USERNAME`, `DB_PASSWORD`, or switch `DB_CONNECTION=sqlite` in `.env`.)*

### Option B: Docker / Laravel Sail

```bash
git clone <repository-url> mehrad-laravel-devkit
cd mehrad-laravel-devkit
cp .env.example .env
composer install --ignore-platform-reqs
./vendor/bin/sail up -d
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

---

## Verification & Development Commands

All JavaScript/TypeScript scripts below correspond to `package.json`; PHP/Composer scripts require PHP 8.3+ and Composer dependencies installed:

```bash
# Frontend checks (Node/npm)
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build

# Backend checks (PHP/Composer environment)
./vendor/bin/pint --test
php artisan test
```

---

## Contributing & License

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development workflow guidelines and [Design.md](./Design.md) for the multi-phase architecture roadmap.

Licensed under the [MIT License](./LICENSE).
