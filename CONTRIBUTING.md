# Contributing to Mehrad Laravel Devkit

Thank you for contributing. Please follow the architectural rules defined in `Design.md`.

## Guidelines

1. Keep `main` green: all pull requests must pass GitHub Actions CI (Pint, Pest, TypeScript lint, and Vite build).
2. Preserve Laravel's standard directory structure (`app/`, `routes/`, `database/`, `resources/js/`, `tests/`).
3. Put validation in Form Requests (`app/Http/Requests/`) and keep controllers thin.
4. Write TypeScript cleanly without unnecessary `any` types.
5. Never commit `.env` files, secrets, API keys, `vendor/`, or `node_modules/`.
6. Keep commits small, focused, and descriptive.

## Local Checks Before Opening a PR

```bash
./vendor/bin/pint --test
php artisan test
npm run lint
npm run build
```
