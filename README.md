# Mehrad Laravel Devkit

A standardized **Laravel + React + Inertia + TypeScript + Tailwind CSS + shadcn/ui** Starter Kit designed as an independent foundation for custom web applications, admin panels, CMSs, and CRMs.

> **Current Implementation Status: Phase 1 (Working Starter)**
> This repository currently implements Phase 1 of [`Design.md`](./Design.md). Core toolkit modules (Roles & Permissions, Activity Log, Module Catalog, CLI installers, and presets) are planned for Phase 2–4 and are intentionally not marked as available yet.

---

## Implemented in Phase 1

- **Laravel 12** standard application structure (`app/`, `bootstrap/`, `config/`, `database/`, `routes/`, `tests/`)
- **React 19 + TypeScript + Inertia.js v2** frontend architecture under `resources/js/` (`pages/`, `layouts/`, `components/ui/`, `lib/`, `types/`)
- **Tailwind CSS v4** with semantic Light & Dark mode support (`@custom-variant dark`)
- **Authentication & Account Settings** controllers, Form Requests, migrations, and Pest feature tests (`Login`, `Register`, `Password Reset`, `Profile`, `Password`, `Appearance`)
- **Docker / Laravel Sail** environment (`compose.yaml` with PHP 8.4, MySQL 8.0, and Mailpit — no Redis or external search engine required)
- **Code Quality & CI** via Laravel Pint (`pint.json`), Pest (`phpunit.xml`), Prettier (`.prettierrc`), TypeScript (`npm run lint`), and GitHub Actions (`.github/workflows/ci.yml`)

---

## Prerequisites

For local PHP/Laravel development (outside Google AI Studio's Node/Vite preview container):

- **PHP** `^8.3` (or **Docker** + **Docker Compose** for Laravel Sail)
- **Composer** `^2.7`
- **Node.js** `^22` & **npm** `^10`
- **MySQL 8.0+** (or SQLite for quick local/test runs)

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

## Verification Commands

Run backend and frontend checks in a PHP-capable environment:

```bash
# PHP formatting check
./vendor/bin/pint --test

# Backend Feature & Unit tests (Pest)
php artisan test

# Frontend TypeScript check & production build
npm run lint
npm run build
```

---

## Google AI Studio Preview Note

Google AI Studio runs a Node.js + Vite preview runtime without PHP/Composer installed. The Vite entry point (`src/App.tsx`) renders the Starter Kit's `resources/js/` React + TypeScript pages and UI components directly so you can preview Welcome, Authentication, Dashboard, and Settings views in the browser. It does **not** replace the Laravel PHP backend with a Node.js backend; run PHP, Composer, Artisan, and Sail locally or in GitHub Actions CI.

---

## Contributing & License

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development workflow guidelines and [Design.md](./Design.md) for the full architecture roadmap.

Licensed under the [MIT License](./LICENSE).
