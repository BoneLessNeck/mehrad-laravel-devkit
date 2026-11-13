import type {
  AppRoute,
  SetupStep,
  StackDependency,
  StackLayer,
  StarterFileNode,
  ThemeMode,
  ValidationErrors,
} from '../types';

export const PHASE_1_STACK: StackDependency[] = [
  {
    name: 'Laravel Framework',
    packageName: 'laravel/framework',
    version: '^12.0',
    layer: 'backend',
    purpose: 'Core PHP framework, routing, Eloquent ORM, migrations, and validation.',
    phase: 'Phase 1',
  },
  {
    name: 'Inertia Laravel',
    packageName: 'inertiajs/inertia-laravel',
    version: '^2.0',
    layer: 'backend',
    purpose: 'Server-driven SPA adapter connecting Laravel controllers to React pages.',
    phase: 'Phase 1',
  },
  {
    name: 'Ziggy',
    packageName: 'tightenco/ziggy',
    version: '^2.4',
    layer: 'backend',
    purpose: 'Exposes named Laravel routes safely to the TypeScript frontend.',
    phase: 'Phase 1',
  },
  {
    name: 'React & React DOM',
    packageName: 'react',
    version: '^19.0.1',
    layer: 'frontend',
    purpose: 'Component-driven UI runtime for pages, layouts, and interactive forms.',
    phase: 'Phase 1',
  },
  {
    name: 'TypeScript',
    packageName: 'typescript',
    version: '^7.0.2',
    layer: 'frontend',
    purpose: 'Static type safety across Inertia page props, hooks, and UI primitives.',
    phase: 'Phase 1',
  },
  {
    name: 'Tailwind CSS',
    packageName: 'tailwindcss',
    version: '^4.3.3',
    layer: 'frontend',
    purpose: 'Utility-first styling with CSS-first @theme and semantic dark mode.',
    phase: 'Phase 1',
  },
  {
    name: 'Laravel Pint',
    packageName: 'laravel/pint',
    version: '^1.18',
    layer: 'quality',
    purpose: 'Opinionated PHP code style fixer enforcing Laravel formatting rules.',
    phase: 'Phase 1',
  },
  {
    name: 'Pest PHP',
    packageName: 'pestphp/pest',
    version: '^3.7',
    layer: 'quality',
    purpose: 'Expressive PHP feature and unit testing suite for auth and settings.',
    phase: 'Phase 1',
  },
  {
    name: 'Laravel Sail',
    packageName: 'laravel/sail',
    version: '^1.39',
    layer: 'infrastructure',
    purpose: 'Docker Compose local environment with PHP 8.4, MySQL 8.0, and Mailpit.',
    phase: 'Phase 1',
  },
  {
    name: 'GitHub Actions CI',
    packageName: '.github/workflows/ci.yml',
    version: 'v4',
    layer: 'infrastructure',
    purpose: 'Automated Pint, Pest, TypeScript lint, unit test, and Vite build checks.',
    phase: 'Phase 1',
  },
];

export const PHASE_1_FILES: StarterFileNode[] = [
  {
    path: 'app/Http/Controllers/Auth/AuthenticatedSessionController.php',
    layer: 'backend',
    summary: 'Handles Inertia login screen, session regeneration, and logout.',
  },
  {
    path: 'app/Http/Controllers/Auth/RegisteredUserController.php',
    layer: 'backend',
    summary: 'Validates registration input, hashes password, and logs in new users.',
  },
  {
    path: 'app/Http/Controllers/Settings/ProfileController.php',
    layer: 'backend',
    summary: 'Updates user profile details and handles account deletion.',
  },
  {
    path: 'app/Http/Middleware/HandleInertiaRequests.php',
    layer: 'backend',
    summary: 'Shares app name, authenticated user, Ziggy routes, and sidebar state.',
  },
  {
    path: 'routes/web.php',
    layer: 'backend',
    summary: 'Defines home, verified dashboard, auth, and settings route groups.',
  },
  {
    path: 'database/migrations/0001_01_01_000000_create_users_table.php',
    layer: 'backend',
    summary: 'Creates users, password_reset_tokens, and sessions tables.',
  },
  {
    path: 'resources/js/layouts/app-layout.tsx',
    layer: 'frontend',
    summary: 'Authenticated workspace shell with collapsible sidebar and breadcrumbs.',
  },
  {
    path: 'resources/js/pages/welcome.tsx',
    layer: 'frontend',
    summary: 'Phase 1 landing overview with starter kit structure and quickstart.',
  },
  {
    path: 'resources/js/pages/dashboard.tsx',
    layer: 'frontend',
    summary: 'Authenticated starter dashboard with stack matrix and repository browser.',
  },
  {
    path: 'resources/js/pages/settings/appearance.tsx',
    layer: 'frontend',
    summary: 'Light, Dark, and System theme selector synced to html.dark.',
  },
  {
    path: 'tests/Feature/Auth/AuthenticationTest.php',
    layer: 'quality',
    summary: 'Pest tests covering login screen rendering, authentication, and logout.',
  },
  {
    path: 'pint.json',
    layer: 'quality',
    summary: 'Laravel Pint configuration for alphabetical imports and clean PHP syntax.',
  },
  {
    path: 'compose.yaml',
    layer: 'infrastructure',
    summary: 'Sail container definitions for PHP 8.4, MySQL 8.0, and Mailpit.',
  },
  {
    path: '.github/workflows/ci.yml',
    layer: 'infrastructure',
    summary: 'GitHub Actions pipeline verifying backend and frontend builds.',
  },
];

export const LOCAL_SETUP_STEPS: SetupStep[] = [
  {
    step: 1,
    title: 'Clone & Configure Environment',
    command: 'cp .env.example .env',
    note: 'Copies MySQL and Sail defaults without committing secrets.',
  },
  {
    step: 2,
    title: 'Install PHP & Frontend Dependencies',
    command: 'composer install && npm install',
    note: 'Installs Laravel 12, Inertia, Pint, Pest, React 19, and Tailwind v4.',
  },
  {
    step: 3,
    title: 'Generate Key & Run Migrations',
    command: 'php artisan key:generate && php artisan migrate',
    note: 'Initializes encryption key, users, cache, sessions, and jobs tables.',
  },
  {
    step: 4,
    title: 'Start Development & Run Checks',
    command: 'composer run dev',
    note: 'Starts PHP server, queue listener, Pail logs, and Vite concurrently.',
  },
];

export const SAIL_SETUP_STEPS: SetupStep[] = [
  {
    step: 1,
    title: 'Boot Sail Containers',
    command: 'composer install --ignore-platform-reqs && ./vendor/bin/sail up -d',
    note: 'Starts PHP 8.4, MySQL 8.0, and Mailpit inside isolated Docker containers.',
  },
  {
    step: 2,
    title: 'Initialize Application & Database',
    command: './vendor/bin/sail artisan key:generate && ./vendor/bin/sail artisan migrate',
    note: 'Runs migrations directly against the Sail MySQL service.',
  },
  {
    step: 3,
    title: 'Install Frontend Packages & Build',
    command: './vendor/bin/sail npm install && ./vendor/bin/sail npm run dev',
    note: 'Compiles TypeScript + React + Tailwind v4 assets via Vite.',
  },
  {
    step: 4,
    title: 'Verify Formatting & Pest Suite',
    command: './vendor/bin/sail bin pint --test && ./vendor/bin/sail artisan test',
    note: 'Runs Pint style checks and Pest feature tests inside the container.',
  },
];

export function filterStackDependencies(
  dependencies: StackDependency[],
  layer: StackLayer,
  query: string
): StackDependency[] {
  const normalizedQuery = query.trim().toLowerCase();
  return dependencies.filter((item) => {
    const matchesLayer = layer === 'all' || item.layer === layer;
    if (!matchesLayer) return false;
    if (!normalizedQuery) return true;
    return (
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.packageName.toLowerCase().includes(normalizedQuery) ||
      item.purpose.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function filterStarterFiles(
  files: StarterFileNode[],
  layer: StackLayer,
  query: string
): StarterFileNode[] {
  const normalizedQuery = query.trim().toLowerCase();
  return files.filter((file) => {
    const matchesLayer = layer === 'all' || file.layer === layer;
    if (!matchesLayer) return false;
    if (!normalizedQuery) return true;
    return (
      file.path.toLowerCase().includes(normalizedQuery) ||
      file.summary.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateLoginForm(input: {
  email: string;
  password: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!input.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(input.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!input.password) {
    errors.password = 'Password is required.';
  }
  return errors;
}

export function validateRegisterForm(input: {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!input.name.trim()) {
    errors.name = 'Full name is required.';
  } else if (input.name.trim().length > 255) {
    errors.name = 'Name cannot exceed 255 characters.';
  }

  if (!input.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(input.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!input.password) {
    errors.password = 'Password is required.';
  } else if (input.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (input.password !== input.passwordConfirmation) {
    errors.passwordConfirmation = 'Password confirmation does not match.';
  }

  return errors;
}

export function validateProfileForm(input: {
  name: string;
  email: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!input.name.trim()) {
    errors.name = 'Name is required.';
  }
  if (!input.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(input.email)) {
    errors.email = 'Enter a valid email address.';
  }
  return errors;
}

export function validatePasswordForm(input: {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!input.currentPassword) {
    errors.currentPassword = 'Current password is required.';
  }
  if (!input.password) {
    errors.password = 'New password is required.';
  } else if (input.password.length < 8) {
    errors.password = 'New password must be at least 8 characters.';
  }
  if (input.password !== input.passwordConfirmation) {
    errors.passwordConfirmation = 'Password confirmation does not match.';
  }
  return errors;
}

export function resolveEffectiveTheme(
  mode: ThemeMode,
  prefersDark: boolean
): 'light' | 'dark' {
  if (mode === 'system') {
    return prefersDark ? 'dark' : 'light';
  }
  return mode;
}

export function getRouteBreadcrumbs(route: AppRoute): { title: string; route: AppRoute }[] {
  switch (route) {
    case 'dashboard':
      return [{ title: 'Dashboard', route: 'dashboard' }];
    case 'settings.profile':
      return [
        { title: 'Settings', route: 'settings.profile' },
        { title: 'Profile', route: 'settings.profile' },
      ];
    case 'settings.password':
      return [
        { title: 'Settings', route: 'settings.profile' },
        { title: 'Password', route: 'settings.password' },
      ];
    case 'settings.appearance':
      return [
        { title: 'Settings', route: 'settings.profile' },
        { title: 'Appearance', route: 'settings.appearance' },
      ];
    default:
      return [{ title: 'Mehrad Devkit', route: 'welcome' }];
  }
}
