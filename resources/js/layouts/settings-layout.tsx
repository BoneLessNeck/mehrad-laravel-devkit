import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { route } from 'ziggy-js';

interface SettingsLayoutProps {
  children: ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  const { url } = usePage();

  const navItems = [
    {
      title: 'Profile',
      href: route('profile.edit'),
      active: url.startsWith('/settings/profile'),
    },
    {
      title: 'Password',
      href: route('password.edit'),
      active: url.startsWith('/settings/password'),
    },
    {
      title: 'Appearance',
      href: route('appearance'),
      active: url.startsWith('/settings/appearance'),
    },
  ];

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
          <nav
            aria-label="Settings sections"
            className="flex flex-row gap-1 overflow-x-auto lg:flex-col"
          >
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
                className={cn(
                  'shrink-0 rounded-lg px-3 py-2 text-left text-sm font-medium whitespace-nowrap focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none dark:focus-visible:ring-zinc-200',
                  item.active
                    ? 'bg-zinc-200/70 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="max-w-xl flex-1">{children}</div>
      </div>
    </div>
  );
}
