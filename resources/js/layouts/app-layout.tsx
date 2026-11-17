import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronRight, Home, LayoutDashboard, LogOut, Menu, Settings, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { route } from 'ziggy-js';

interface AppLayoutProps {
  breadcrumbs?: BreadcrumbItem[];
  children: ReactNode;
}

export function AppLayout({ breadcrumbs = [], children }: AppLayoutProps) {
  const { props, url } = usePage<SharedData>();
  const user = props.auth.user;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      title: 'Dashboard',
      href: route('dashboard'),
      active: url.startsWith('/dashboard'),
      Icon: LayoutDashboard,
    },
    {
      title: 'Settings',
      href: route('profile.edit'),
      active: url.startsWith('/settings'),
      Icon: Settings,
    },
    {
      title: 'Public Welcome',
      href: route('home'),
      active: url === '/',
      Icon: Home,
    },
  ];

  const handleLogout = () => {
    setMobileMenuOpen(false);
    router.post(route('logout'));
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-zinc-200 bg-white px-4 py-5 md:flex dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <div className="px-2 pb-6">
            <Link
              href={route('home')}
              aria-label="Go to Mehrad Devkit landing page"
              className="inline-flex rounded-md focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none dark:focus-visible:ring-zinc-200"
            >
              <AppLogo />
            </Link>
          </div>

          <nav aria-label="Primary workspace navigation" className="flex flex-col gap-1">
            {navItems.map(({ title, href, active, Icon }) => (
              <Link
                key={title}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none dark:focus-visible:ring-zinc-200',
                  active
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{title}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
          {user && (
            <div className="mb-3 px-2">
              <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {user.name}
              </p>
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{user.email}</p>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Log out</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="fixed inset-0 bg-zinc-950/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative z-10 flex w-64 max-w-full flex-col justify-between bg-white px-4 py-5 dark:bg-zinc-900">
            <div>
              <div className="flex items-center justify-between pb-6">
                <Link href={route('home')} onClick={() => setMobileMenuOpen(false)}>
                  <AppLogo />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <nav aria-label="Mobile workspace links" className="flex flex-col gap-1">
                {navItems.map(({ title, href, active, Icon }) => (
                  <Link
                    key={title}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap',
                      active
                        ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                        : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{title}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
              {user && (
                <>
                  <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {user.name}
                  </p>
                  <p className="mb-3 truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {user.email}
                  </p>
                </>
              )}
              <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Log out</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between gap-4 border-b border-zinc-200 bg-white px-4 md:px-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <span key={`${crumb.href}-${idx}`} className="flex min-w-0 items-center gap-1.5">
                  {idx > 0 && (
                    <ChevronRight
                      className="h-3.5 w-3.5 shrink-0 text-zinc-400"
                      aria-hidden="true"
                    />
                  )}
                  <Link
                    href={crumb.href}
                    className={cn(
                      'truncate whitespace-nowrap focus-visible:underline focus-visible:outline-none',
                      idx === breadcrumbs.length - 1
                        ? 'font-medium text-zinc-900 dark:text-zinc-100'
                        : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                    )}
                  >
                    {crumb.title}
                  </Link>
                </span>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href={route('appearance')}>Appearance</Link>
            </Button>
          </div>
        </header>

        <main className="flex-1 px-4 py-8 md:px-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
