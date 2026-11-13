# Mehrad Project --- Design & Architecture

> Reference document for Google AI Studio and developers\
> Proposed repository name: `mehrad-laravel-devkit`\
> Repository type: GitHub Template Repository\
> Status: MVP architecture\
> Documentation language: English; use English for filenames, classes,
> and code.

------------------------------------------------------------------------

## 1. Project Goal

**Mehrad** is a free, open-source Laravel Development Starter Kit ---
not a ready-made CMS or CRM.

Its purpose is to provide a standardized starting point for building
Laravel applications such as CMSs, CRMs, admin panels, and custom web
applications. After using the repository as a template, each project
must become independent and must not depend on the original repository.

Guiding principles: - Keep the core simple and minimal; include only
broadly useful features. - Make optional capabilities easy to add. -
Prefer reputable, maintained packages and Laravel's built-in
capabilities over reinventing existing functionality. - Apply secure
defaults; never execute arbitrary commands through the browser. -
Support GitHub-based development and Google AI Studio workflows. - Avoid
locking the project to paid services or a specific provider.

## 2. Architecture Decisions

### Backend

-   Laravel. Select the latest stable version that is compatible when
    creating the project.
-   PHP version must meet the requirements of the selected Laravel
    release.
-   Composer for PHP dependencies.
-   MySQL as the default database.
-   Redis only for projects that genuinely need advanced caching or
    queues.
-   Prefer Laravel's built-in migrations, validation, policies, queues,
    scheduler, and filesystem.

### Frontend

-   React + TypeScript
-   Inertia.js to connect React with Laravel. Do not introduce two
    independent backends or a separate Node.js backend in the first
    version.
-   Vite
-   Tailwind CSS
-   shadcn/ui and Radix UI for components
-   ESLint and Prettier for frontend code quality and formatting
-   Vitest for frontend unit tests, when needed

### Development & Quality

-   Laravel Sail / Docker for a reproducible development environment.
-   Laravel Pint for PHP formatting.
-   Pest or PHPUnit for backend tests; follow the selected Laravel
    version and Starter Kit.
-   GitHub Actions for automated tests and quality checks on pull
    requests.
-   `.env.example` for sample environment variables. Never commit `.env`
    files or secrets.

### Important: Google AI Studio

Google AI Studio Build Mode primarily provides an environment for
building and running React/Node-based web applications; it is not a
native PHP/Laravel runtime. Use it to inspect, generate, and edit files
and synchronize with GitHub. Run Laravel, Composer, Artisan, PHP, and
Docker in a local development environment or a CI environment that
supports PHP.

Never replace the Laravel backend with a mock Node.js backend just to
make a preview work.

------------------------------------------------------------------------

## 3. Proposed Repository Structure

Start from the official Laravel React Starter Kit and preserve Laravel's
standard files and directory layout. Do not move or rename standard
Laravel directories without a compelling reason.

``` text
mehrad-laravel-devkit/
├── app/
│   ├── Console/
│   ├── Http/
│   ├── Models/
│   ├── Providers/
│   └── Modules/                 # Mehrad-specific module code only
├── bootstrap/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── resources/
│   ├── css/
│   └── js/
│       ├── components/
│       │   └── ui/              # shadcn/ui components
│       ├── hooks/
│       ├── layouts/
│       ├── lib/
│       ├── pages/
│       └── types/
├── routes/
├── tests/
│   ├── Feature/
│   └── Unit/
├── devkit/
│   ├── catalog/                 # Module definitions and dependencies
│   ├── installers/              # Controlled installers
│   ├── presets/                 # CMS and CRM presets
│   └── scripts/                 # Development and bootstrap scripts
├── docs/
│   ├── ARCHITECTURE.md
│   ├── MODULES.md
│   └── DEVELOPMENT.md
├── docker/                      # Custom Docker files, if needed
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
├── .env.example
├── .gitignore
├── composer.json
├── composer.lock
├── package.json
├── package-lock.json
├── compose.yaml                 # If Sail is included
├── artisan
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── Design.md
```

Rules: - Preserve Laravel's standard structure. - Avoid empty
directories and unnecessary abstraction layers. - Do not commit
`vendor/`, `node_modules/`, `.env`, cache files, logs, build output, or
private keys. - Keep dependency lock files in the repository for
reproducible installations. - Keep Mehrad-specific code separate from
third-party package code.

------------------------------------------------------------------------

## 4. Features and Package Catalog

### 4.1 Version 1 Core

  Feature                          Solution
  -------------------------------- ------------------------------------
  Laravel + React foundation       Official Laravel React Starter Kit
  Authentication                   Starter Kit capabilities / Fortify
  Roles and permissions            `spatie/laravel-permission`
  User activity logging            `spatie/laravel-activitylog`
  PHP formatting                   Laravel Pint
  Backend testing                  Pest or PHPUnit
  Docker development environment   Laravel Sail
  Frontend integration             Inertia + React + TypeScript
  Styling                          Tailwind CSS
  UI components                    shadcn/ui
  Frontend quality checks          ESLint + Prettier
  CI                               GitHub Actions

### 4.2 Optional Modules

  -------------------------------------------------------------------------------
  Module                  Package / Tool                  When to use
  ----------------------- ------------------------------- -----------------------
  File and media          `spatie/laravel-medialibrary`   Projects that manage
  management                                              files or images

  Backups                 `spatie/laravel-backup`         After defining backup
                                                          destination and policy

  Advanced search         `laravel/scout`                 When database search is
                                                          insufficient

  Search engine           Meilisearch or Typesense        Only when needed,
                                                          alongside Scout

  API tokens              Laravel Sanctum                 APIs, mobile apps, or
                                                          external integrations

  Social login            Laravel Socialite               When OAuth providers
                                                          are required

  Queue monitoring        Laravel Horizon                 When using Redis queues

  Debugging               Laravel Telescope               Development
                                                          environment; restrict
                                                          production access

  Performance monitoring  Laravel Pulse                   When monitoring is
                                                          needed

  Feature flags           Laravel Pennant                 Features that must be
                                                          enabled or disabled
                                                          selectively

  WebSockets              Laravel Reverb                  Real-time communication

  Billing                 Laravel Cashier                 Only when a supported
                                                          billing integration is
                                                          required
  -------------------------------------------------------------------------------

Notes: - Optional packages must not be installed or required by
default. - Check every package's compatibility with the selected Laravel
and PHP versions before installation. - Manage versions with Composer
and lock them in `composer.lock`. - Avoid installing overlapping tools
that provide duplicate functionality. - Telescope, Debugbar, and similar
tools must not be exposed without restrictions in production. - Redis,
Meilisearch, Typesense, and external services must not be required to
run the base project.

------------------------------------------------------------------------

## 5. DevToolkit Installer Design

For version 1, build a simple CLI plus a lightweight management
dashboard instead of a complex package manager.

### Responsibilities

1.  Display the module catalog.
2.  Show each module's description, version, requirements, and
    installation status.
3.  Check compatibility with the current Laravel and PHP versions.
4.  Run predefined installers.
5.  Record successful and failed operations.
6.  Show instructions for any required post-install configuration.
7.  Enable or disable a module if that module supports it.

### Module Definition

Each module must have explicit metadata: - `id` - `name` -
`description` - `version` - `category` - `packages` - `requires` -
`conflicts` - `laravel_constraints` - `php_constraints` -
`install_steps` - `post_install_steps` - `enabled_by_default`

The catalog must be data-driven and validated. Installers must use
reviewed, controlled code. Do not execute arbitrary shell commands
supplied by users or received through HTTP requests.

### Installer Security

-   Restrict the dashboard to authorized administrators and enable it
    only in development in version 1.
-   In version 1, disable command execution through the web interface.
    The dashboard may show module status and installation instructions
    only.
-   Run Composer, Artisan, and NPM operations from the CLI with user
    confirmation.
-   Do not expose public endpoints that execute commands, install
    packages, or modify files.
-   Validate inputs and require explicit confirmation for destructive
    operations.
-   Log operations without storing secrets.

### Proposed Commands

Register these commands only after they have actually been implemented.
The following names are design examples:

``` bash
php artisan mehrad:modules
php artisan mehrad:module:status
php artisan mehrad:module:install media-library
php artisan mehrad:module:enable media-library
php artisan mehrad:module:disable media-library
```

These commands are proposed contracts, not implemented features. Do not
document them in the README as available until they have been
implemented and tested.

------------------------------------------------------------------------

## 6. Presets

Define two initial presets:

### `minimal`

-   Laravel + React + Inertia
-   Authentication
-   Base UI
-   Testing and code-quality tools
-   No Redis, search engine, or external service

### `cms-crm`

-   Everything in `minimal`
-   Roles and permissions
-   Activity log
-   Basic file-management foundation (optional module)
-   Base admin-panel layout
-   Navigation and reusable list/form page patterns
-   No business-specific modules, billing, or prebuilt CRM

A preset is only a selection of modules and configuration options. It
must not implement a separate, duplicated installation mechanism.

------------------------------------------------------------------------

## 7. Coding Architecture

-   Start with standard Laravel architecture. Do not introduce
    microservices or full-scale Domain-Driven Design complexity in the
    MVP.
-   Avoid placing business logic in controllers. Use small, testable
    Actions or Services when appropriate.
-   Use Form Requests for request validation.
-   Use Policies/Gates and, when needed, Spatie Permission for
    authorization.
-   Return Inertia pages through controllers with clearly defined props.
-   Build reusable React components.
-   Use TypeScript by default in frontend code; avoid unnecessary use of
    `any`.
-   Use consistent English naming for files and classes.
-   Keep module boundaries clear and connect modules to the core through
    limited contracts.
-   Add Feature or Unit tests for important functionality.

------------------------------------------------------------------------

## 8. GitHub and Release Strategy

-   Public repository name: `mehrad-laravel-devkit`.
-   Use the MIT license for original project code unless another license
    is deliberately selected.
-   Include a README covering the project, prerequisites, installation,
    features, module status, and contribution guidelines.
-   Enable GitHub Template Repository functionality.
-   Use `main` as the primary branch.
-   Keep commits small and descriptive.
-   GitHub Actions should run at least:
    -   Composer dependency installation
    -   PHP formatting checks with Pint
    -   Backend tests
    -   NPM dependency installation
    -   Frontend lint/type checks and build
-   Enable Dependabot for Composer and npm dependencies.
-   Never commit `.env` files, credentials, tokens, or API keys.
-   Publish releases with Git tags and a changelog.

------------------------------------------------------------------------

## 9. Installation and Development Setup

Suggested local setup:

1.  Clone the repository.
2.  Copy `.env.example` to `.env`.
3.  Install Composer and NPM dependencies.
4.  Generate the application key.
5.  Configure the database.
6.  Run migrations.
7.  Start the application and Vite.
8.  Run the test suite.

Example commands (adjust them to the selected installation method):

``` bash
git clone <repository-url>
cd mehrad-laravel-devkit

cp .env.example .env

composer install
npm install

php artisan key:generate
php artisan migrate

composer run dev
```

If the project uses Sail, PHP, Composer, Artisan, and NPM commands must
run inside the Sail environment. Verify exact commands against the
actual Laravel version and repository files.

------------------------------------------------------------------------

## 10. Implementation Phases

### Phase 1 --- Working Starter

-   Create the repository from the official Laravel React Starter Kit.
-   Preserve Laravel's standard structure.
-   Configure the development environment and `.env.example`.
-   Make installation reproducible.
-   Add initial tests and CI.

### Phase 2 --- Core Toolkit

-   Install Roles & Permissions.
-   Install Activity Log.
-   Build the Module Catalog.
-   Implement the initial CLI.
-   Add documentation.

### Phase 3 --- Dashboard

-   Build a simple dashboard showing environment and module status.
-   Display dependencies and installation instructions.
-   Do not execute commands through the web interface.

### Phase 4 --- Presets & Optional Modules

-   Add `minimal` and `cms-crm` presets.
-   Add tested installers for optional modules.
-   Document how to develop a new module.

Version 1 is ready for release only when cloning, dependency
installation, environment setup, migrations, frontend build, and tests
all succeed in a clean environment.

------------------------------------------------------------------------

## 11. Direct Instructions for Google AI Studio

You are acting as a Senior Laravel Architect and Full-stack Developer.

This document is the primary project reference. Before changing code:

1.  Inspect the entire repository and its existing files.
2.  Identify the actual installed versions and current project state.
3.  If a decision conflicts with the actual Laravel or Starter Kit
    structure, explain the conflict and propose a compatible solution
    first.
4.  Do not generate fake files, obsolete packages, or guessed APIs.
5.  Verify package compatibility with the selected Laravel and PHP
    versions.
6.  Keep changes small, incremental, and reviewable.
7.  Run available tests and builds after each phase. If AI Studio cannot
    run PHP/Laravel, state that clearly and never fabricate test
    results.
8.  Never replace the Laravel backend with Node.js or a mock backend.
9.  Never commit secrets, API keys, or `.env` files.
10. Do not install optional packages unless the user requests or selects
    them.
11. Do not describe incomplete functionality in the README as
    production-ready.
12. Preserve Laravel's standard structure and official React/Inertia
    conventions.
13. Before changing the architecture or deleting important files,
    explain the reason and impact.

### First Task

Implement **Phase 1 only**:

-   Prepare the repository based on the official Laravel React Starter
    Kit.
-   Preserve Laravel's standard structure.
-   Configure React + TypeScript + Inertia + Tailwind + shadcn/ui
    according to the Starter Kit.
-   Add Docker/Sail files and GitHub Actions if compatible.
-   Prepare the README and `.env.example`.
-   Do not build a CMS, CRM, billing system, or incomplete
    plugin-installation dashboard.
-   First report the files and changes required; then implement them.
-   At the end, report the files created or modified, installation
    commands, and anything that still requires testing in a PHP-capable
    environment.

------------------------------------------------------------------------

## 12. Official Resources

-   Laravel Starter Kits: https://laravel.com/starter-kits
-   Laravel React Starter Kit:
    https://github.com/laravel/react-starter-kit
-   Laravel Documentation: https://laravel.com/docs
-   Laravel Sail: https://laravel.com/docs/sail
-   Inertia.js: https://inertiajs.com
-   React: https://react.dev
-   Tailwind CSS: https://tailwindcss.com
-   shadcn/ui: https://ui.shadcn.com
-   Spatie Laravel Permission:
    https://github.com/spatie/laravel-permission
-   Spatie Activitylog: https://github.com/spatie/laravel-activitylog
-   Laravel Pint: https://laravel.com/docs/pint
-   Pest: https://pestphp.com
-   GitHub Actions: https://docs.github.com/actions
-   Google AI Studio Build Mode:
    https://ai.google.dev/gemini-api/docs/aistudio-build-mode
