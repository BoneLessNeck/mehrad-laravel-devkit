import { Search } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { AppLayout } from '../layouts/app-layout';
import {
  PHASE_1_FILES,
  PHASE_1_STACK,
  filterStarterFiles,
  getRouteBreadcrumbs,
} from '../lib/starter-kit';
import { cn } from '../lib/utils';
import type { AppRoute, StackLayer, User } from '../types';

interface DashboardPageProps {
  user: User;
  onNavigate: (route: AppRoute) => void;
  onLogout: () => void;
}

const FILE_LAYERS: { value: StackLayer; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'backend', label: 'Backend' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'quality', label: 'Quality' },
  { value: 'infrastructure', label: 'Infra' },
];

export function DashboardPage({ user, onNavigate, onLogout }: DashboardPageProps) {
  const [layer, setLayer] = useState<StackLayer>('all');
  const [query, setQuery] = useState('');

  const filteredFiles = filterStarterFiles(PHASE_1_FILES, layer, query);

  return (
    <AppLayout
      user={user}
      activeRoute="dashboard"
      breadcrumbs={getRouteBreadcrumbs('dashboard')}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Starter Kit Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Signed in as {user.name}. This workspace demonstrates the Phase 1 authenticated
            Inertia shell.
          </p>
        </div>

        {/* Summary Strip (3 clean metrics, tabular numerals, single-elevation hairline borders) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Starter Phase</CardDescription>
              <CardTitle className="text-2xl tabular-nums">Phase 1</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-zinc-500 dark:text-zinc-400">
              Official Laravel + React + Inertia baseline
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Core Packages</CardDescription>
              <CardTitle className="text-2xl tabular-nums">{PHASE_1_STACK.length}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-zinc-500 dark:text-zinc-400">
              Composer, NPM, Pint, Pest, and Sail
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Default Database</CardDescription>
              <CardTitle className="text-2xl tabular-nums">MySQL 8.0</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-zinc-500 dark:text-zinc-400">
              SQLite in-memory configured for Pest tests
            </CardContent>
          </Card>
        </div>

        {/* Repository Structure Browser */}
        <Card>
          <CardHeader>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <CardTitle>Phase 1 Repository Blueprint</CardTitle>
                <CardDescription>
                  Inspect standard Laravel, Inertia React, Sail, and CI files included in this
                  starter kit.
                </CardDescription>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                    aria-hidden="true"
                  />
                  <Input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search files..."
                    aria-label="Search repository files"
                    className="pl-9 sm:w-52"
                  />
                </div>

                <div
                  role="group"
                  aria-label="Filter repository files by layer"
                  className="inline-flex items-center gap-1 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  {FILE_LAYERS.map((tab) => {
                    const active = layer === tab.value;
                    return (
                      <button
                        key={tab.value}
                        type="button"
                        onClick={() => setLayer(tab.value)}
                        aria-pressed={active}
                        className={cn(
                          'rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors',
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
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-zinc-200 bg-zinc-50 text-xs font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
                  <tr>
                    <th className="px-4 py-2.5">File Path</th>
                    <th className="px-4 py-2.5">Layer</th>
                    <th className="px-4 py-2.5">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredFiles.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400"
                      >
                        No files matched &ldquo;{query}&rdquo;.
                      </td>
                    </tr>
                  ) : (
                    filteredFiles.map((file) => (
                      <tr
                        key={file.path}
                        className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40"
                      >
                        <td className="px-4 py-3 font-mono text-xs whitespace-nowrap text-zinc-900 dark:text-zinc-100">
                          {file.path}
                        </td>
                        <td className="px-4 py-3 capitalize whitespace-nowrap text-zinc-600 dark:text-zinc-400">
                          {file.layer}
                        </td>
                        <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                          {file.summary}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
