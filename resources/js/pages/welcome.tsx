import { ArrowRight, Check, Copy, Search } from 'lucide-react';
import { useState } from 'react';
import { AppLogo } from '../components/app-logo';
import { ThemeToggle } from '../components/theme-toggle';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  LOCAL_SETUP_STEPS,
  PHASE_1_STACK,
  SAIL_SETUP_STEPS,
  filterStackDependencies,
} from '../lib/starter-kit';
import { cn } from '../lib/utils';
import type { AppRoute, StackLayer, ThemeMode, User } from '../types';

interface WelcomePageProps {
  user: User | null;
  appearance: ThemeMode;
  onChangeAppearance: (mode: ThemeMode) => void;
  onNavigate: (route: AppRoute) => void;
}

const LAYER_TABS: { value: StackLayer; label: string }[] = [
  { value: 'all', label: 'All Layers' },
  { value: 'backend', label: 'Backend' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'quality', label: 'Quality' },
  { value: 'infrastructure', label: 'Infrastructure' },
];

const ARCHITECTURE_PILLARS = [
  {
    index: '01.',
    title: 'Official Laravel 12 Foundation',
    body: 'Preserves standard app/, bootstrap/, config/, database/, routes/, and tests/ directories without custom abstractions or non-standard folders.',
  },
  {
    index: '02.',
    title: 'React 19 + Inertia v2 + TypeScript',
    body: 'Server-driven routing and typed page props via HandleInertiaRequests and Ziggy, paired with Tailwind CSS v4 and accessible shadcn/ui components.',
  },
  {
    index: '03.',
    title: 'Built-in Auth & Account Settings',
    body: 'Includes Form Request validation, rate-limited login, registration, password reset, profile editing, and Light/Dark/System appearance controls.',
  },
  {
    index: '04.',
    title: 'Reproducible Sail & GitHub Actions',
    body: 'Ships with MySQL 8.0 and Mailpit in compose.yaml, Laravel Pint formatting, Pest feature tests, and CI workflows—with zero Redis dependency.',
  },
];

export function WelcomePage({
  user,
  appearance,
  onChangeAppearance,
  onNavigate,
}: WelcomePageProps) {
  const [layerFilter, setLayerFilter] = useState<StackLayer>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [setupMethod, setSetupMethod] = useState<'local' | 'sail'>('local');
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const visiblePackages = filterStackDependencies(PHASE_1_STACK, layerFilter, searchQuery);
  const setupSteps = setupMethod === 'local' ? LOCAL_SETUP_STEPS : SAIL_SETUP_STEPS;

  const handleCopyCommand = async (stepNumber: number, command: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(command);
      }
      setCopiedStep(stepNumber);
      window.setTimeout(() => setCopiedStep(null), 1800);
    } catch {
      setCopiedStep(stepNumber);
      window.setTimeout(() => setCopiedStep(null), 1800);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
          <a
            href="#top"
            className="whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-200 rounded-md"
          >
            <AppLogo />
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            <a
              href="#architecture"
              className="whitespace-nowrap shrink-0 hover:text-zinc-900 hover:underline underline-offset-4 dark:hover:text-zinc-100"
            >
              Architecture
            </a>
            <a
              href="#stack"
              className="whitespace-nowrap shrink-0 hover:text-zinc-900 hover:underline underline-offset-4 dark:hover:text-zinc-100"
            >
              Stack
            </a>
            <a
              href="#setup"
              className="whitespace-nowrap shrink-0 hover:text-zinc-900 hover:underline underline-offset-4 dark:hover:text-zinc-100"
            >
              Setup
            </a>
            <button
              type="button"
              onClick={() => onNavigate(user ? 'settings.profile' : 'login')}
              className="whitespace-nowrap shrink-0 hover:text-zinc-900 hover:underline underline-offset-4 dark:hover:text-zinc-100 cursor-pointer"
            >
              {user ? 'Settings' : 'Log in'}
            </button>
          </nav>

          <div className="flex items-center shrink-0">
            <Button onClick={() => onNavigate(user ? 'dashboard' : 'register')}>
              {user ? 'Dashboard' : 'Get Started'}
            </Button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="flex flex-col justify-center lg:col-span-7">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Phase 1 Starter Kit <span aria-hidden="true">·</span> Laravel 12{' '}
                <span aria-hidden="true">·</span> React 19 <span aria-hidden="true">·</span>{' '}
                Inertia v2 <span aria-hidden="true">·</span> MIT License
              </p>

              <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-5xl dark:text-zinc-100">
                A disciplined Laravel and React foundation ready for production builds.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Mehrad Laravel Devkit follows the official Laravel React Starter Kit structure
                with typed Inertia pages, Form Request authentication, Laravel Sail containers,
                Pint style checks, and Pest tests—without prebuilt CMS bloat or external service
                lock-in.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  onClick={() => onNavigate(user ? 'dashboard' : 'login')}
                  className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
                >
                  <span>{user ? 'Open Dashboard' : 'Preview Starter App'}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>

                {!user && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => onNavigate('register')}
                  >
                    Create Account
                  </Button>
                )}
              </div>
            </div>

            {/* Right Column: Clean Starter Directory Preview */}
            <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-5">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Repository Layout
                  </span>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    main
                  </span>
                </div>

                <pre className="mt-4 overflow-x-auto font-mono text-xs leading-6 text-zinc-700 dark:text-zinc-300">
                  {`mehrad-laravel-devkit/
├── app/
│   ├── Http/Controllers/
│   ├── Http/Middleware/
│   ├── Http/Requests/
│   └── Models/
├── bootstrap/
├── config/
├── database/migrations/
├── resources/
│   ├── css/app.css
│   ├── views/app.blade.php
│   └── js/
│       ├── components/ui/
│       ├── layouts/
│       ├── pages/
│       └── types/
├── routes/{web,auth,settings}.php
├── tests/Feature/
├── compose.yaml
└── .github/workflows/ci.yml`}
                </pre>
              </div>

              <div className="mt-5 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                Standard Laravel directory conventions preserved across backend and frontend.
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section
          id="architecture"
          className="border-t border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
                Phase 1 Architectural Pillars
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Core capabilities shipped in the initial release, keeping optional packages out of
                the default baseline.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              {ARCHITECTURE_PILLARS.map((pillar) => (
                <div
                  key={pillar.index}
                  className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-6 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    <span className="mr-1.5 font-mono text-sm text-red-600 dark:text-red-500">
                      {pillar.index}
                    </span>{' '}
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verified Stack Matrix */}
        <section id="stack" className="border-t border-zinc-200 py-16 dark:border-zinc-800">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
                  Core Package Catalog
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Every dependency included in Phase 1 with explicit version constraints.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                    aria-hidden="true"
                  />
                  <Input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter packages..."
                    aria-label="Filter stack packages"
                    className="pl-9 sm:w-56"
                  />
                </div>

                <div
                  role="group"
                  aria-label="Filter stack by layer"
                  className="inline-flex items-center gap-1 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  {LAYER_TABS.map((tab) => {
                    const active = layerFilter === tab.value;
                    return (
                      <button
                        key={tab.value}
                        type="button"
                        onClick={() => setLayerFilter(tab.value)}
                        aria-pressed={active}
                        className={cn(
                          'rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer',
                          active
                            ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100'
                            : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                        )}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-zinc-200 bg-zinc-50 text-xs font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
                    <tr>
                      <th className="px-5 py-3">Component</th>
                      <th className="px-5 py-3">Package</th>
                      <th className="px-5 py-3">Layer</th>
                      <th className="px-5 py-3 text-right">Constraint</th>
                      <th className="px-5 py-3">Responsibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {visiblePackages.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-5 py-10 text-center text-sm text-zinc-500 dark:text-zinc-400"
                        >
                          No Phase 1 packages matched &ldquo;{searchQuery}&rdquo;.
                        </td>
                      </tr>
                    ) : (
                      visiblePackages.map((item) => (
                        <tr
                          key={item.packageName}
                          className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40"
                        >
                          <td className="px-5 py-3.5 font-medium whitespace-nowrap text-zinc-900 dark:text-zinc-100">
                            {item.name}
                          </td>
                          <td className="px-5 py-3.5 font-mono text-xs whitespace-nowrap text-zinc-600 dark:text-zinc-300">
                            {item.packageName}
                          </td>
                          <td className="px-5 py-3.5 capitalize whitespace-nowrap text-zinc-600 dark:text-zinc-400">
                            {item.layer}
                          </td>
                          <td className="px-5 py-3.5 text-right font-mono text-xs tabular-nums whitespace-nowrap text-zinc-700 dark:text-zinc-300">
                            {item.version}
                          </td>
                          <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-400">
                            {item.purpose}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Installation & Sail Setup */}
        <section
          id="setup"
          className="border-t border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
                  Local &amp; Sail Installation
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Run Composer, Artisan, and Sail commands in a PHP 8.3+ or Docker environment.
                </p>
              </div>

              <div
                role="group"
                aria-label="Installation method"
                className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-100 p-1 self-start dark:border-zinc-800 dark:bg-zinc-900"
              >
                <button
                  type="button"
                  onClick={() => setSetupMethod('local')}
                  aria-pressed={setupMethod === 'local'}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer',
                    setupMethod === 'local'
                      ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                  )}
                >
                  Local PHP
                </button>
                <button
                  type="button"
                  onClick={() => setSetupMethod('sail')}
                  aria-pressed={setupMethod === 'sail'}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer',
                    setupMethod === 'sail'
                      ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                  )}
                >
                  Laravel Sail (Docker)
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {setupSteps.map((step) => (
                <div
                  key={step.step}
                  className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        <span className="mr-2 font-mono text-xs tabular-nums text-red-600 dark:text-red-500">
                          0{step.step}.
                        </span>
                        {step.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyCommand(step.step, step.command)}
                        aria-label={`Copy command for ${step.title}`}
                        className="inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                      >
                        {copiedStep === step.step ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="mt-3 overflow-x-auto rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 font-mono text-xs text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                      {step.command}
                    </pre>
                  </div>
                  <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">{step.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-zinc-50 py-8 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Mehrad Laravel Devkit <span aria-hidden="true">·</span> Phase 1 Starter Kit{' '}
            <span aria-hidden="true">·</span> MIT License
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-600 dark:text-zinc-400">
            <ThemeToggle appearance={appearance} onChange={onChangeAppearance} />
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
            >
              Dashboard
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
