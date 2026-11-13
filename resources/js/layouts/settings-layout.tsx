import type { ReactNode } from 'react';
import { Separator } from '../components/ui/separator';
import { cn } from '../lib/utils';
import type { AppRoute } from '../types';

interface SettingsLayoutProps {
  activeRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  children: ReactNode;
}

const SETTINGS_NAV: { title: string; route: AppRoute }[] = [
  { title: 'Profile', route: 'settings.profile' },
  { title: 'Password', route: 'settings.password' },
  { title: 'Appearance', route: 'settings.appearance' },
];

export function SettingsLayout({ activeRoute, onNavigate, children }: SettingsLayoutProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Settings
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Manage your account profile, password security, and theme preferences.
        </p>
      </div>

      <Separator />

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <aside className="w-full shrink-0 lg:w-52">
          <nav aria-label="Settings sections" className="flex flex-row gap-1 overflow-x-auto lg:flex-col">
            {SETTINGS_NAV.map((item) => {
              const active = activeRoute === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => onNavigate(item.route)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-lg px-3 py-2 text-left text-sm font-medium whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-200',
                    active
                      ? 'bg-zinc-200/70 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
                  )}
                >
                  {item.title}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 max-w-xl">{children}</div>
      </div>
    </div>
  );
}
