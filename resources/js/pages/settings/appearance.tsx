import { ThemeToggle } from '../../components/theme-toggle';
import { AppLayout } from '../../layouts/app-layout';
import { SettingsLayout } from '../../layouts/settings-layout';
import { getRouteBreadcrumbs } from '../../lib/starter-kit';
import type { AppRoute, ThemeMode, User } from '../../types';

interface AppearanceSettingsPageProps {
  user: User;
  appearance: ThemeMode;
  onChangeAppearance: (mode: ThemeMode) => void;
  onNavigate: (route: AppRoute) => void;
  onLogout: () => void;
}

export function AppearanceSettingsPage({
  user,
  appearance,
  onChangeAppearance,
  onNavigate,
  onLogout,
}: AppearanceSettingsPageProps) {
  return (
    <AppLayout
      user={user}
      activeRoute="settings.appearance"
      breadcrumbs={getRouteBreadcrumbs('settings.appearance')}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <SettingsLayout activeRoute="settings.appearance" onNavigate={onNavigate}>
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
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Color theme
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Active selection: <span className="capitalize font-medium">{appearance}</span>
                </p>
              </div>

              <ThemeToggle appearance={appearance} onChange={onChangeAppearance} />
            </div>
          </div>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
