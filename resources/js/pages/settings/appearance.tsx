import { ThemeToggle } from '@/components/theme-toggle';
import { useAppearance } from '@/hooks/use-appearance';
import { AppLayout } from '@/layouts/app-layout';
import { SettingsLayout } from '@/layouts/settings-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Appearance() {
  const { appearance, updateAppearance } = useAppearance();

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Settings', href: route('profile.edit') },
    { title: 'Appearance', href: route('appearance') },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Appearance settings" />
      <SettingsLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Appearance settings
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Choose Light, Dark, or System color theme for your workspace.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Color theme</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Active selection: <span className="font-medium capitalize">{appearance}</span>
                </p>
              </div>

              <ThemeToggle appearance={appearance} onChange={updateAppearance} />
            </div>
          </div>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
