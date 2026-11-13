import {
  ChevronRight,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { AppLogo } from '../components/app-logo';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';
import type { AppRoute, BreadcrumbItem, User } from '../types';

interface AppLayoutProps {
  user: User;
  activeRoute: AppRoute;
  breadcrumbs: BreadcrumbItem[];
  onNavigate: (route: AppRoute) => void;
  onLogout: () => void;
  children: ReactNode;
}

const NAV_ITEMS: { title: string; route: AppRoute; Icon: typeof LayoutDashboard }[] = [
  { title: 'Dashboard', route: 'dashboard', Icon: LayoutDashboard },
  { title: 'Settings', route: 'settings.profile', Icon: Settings },
  { title: 'Public Welcome', route: 'welcome', Icon: Home },
];

export function AppLayout({
  user,
  activeRoute,
  breadcrumbs,
  onNavigate,
  onLogout,
  children,
}: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isRouteActive = (route: AppRoute) => {
    if (route === 'settings.profile') {
      return activeRoute.startsWith('settings.');
    }
    return activeRoute === route;
  };

  const handleNavClick = (route: AppRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-zinc-200 bg-white px-4 py-5 md:flex dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <div className="px-2 pb-6">
            <button
              type="button"
              onClick={() => handleNavClick('welcome')}
              aria-label="Go to Mehrad Devkit landing page"
              className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-200 cursor-pointer"
            >
              <AppLogo />
            </button>
          </div>

          <nav aria-label="Primary workspace navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ title, route, Icon }) => {
              const active = isRouteActive(route);
              return (
                <button
                  key={route}
                  type="button"
                  onClick={() => handleNavClick(route)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-200',
                    active
                      ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <div className="mb-3 px-2">
            <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {user.name}
            </p>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{user.email}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
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
          <div
            className="fixed inset-0 bg-zinc-950/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 flex w-64 max-w-full flex-col justify-between bg-white px-4 py-5 dark:bg-zinc-900">
            <div>
              <div className="flex items-center justify-between pb-6">
                <AppLogo />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <nav aria-label="Mobile workspace links" className="flex flex-col gap-1">
                {NAV_ITEMS.map(({ title, route, Icon }) => {
                  const active = isRouteActive(route);
                  return (
                    <button
                      key={route}
                      type="button"
                      onClick={() => handleNavClick(route)}
                      className={cn(
                        'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap cursor-pointer',
                        active
                          ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                          : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
              <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {user.name}
              </p>
              <p className="mb-3 truncate text-xs text-zinc-500 dark:text-zinc-400">
                {user.email}
              </p>
              <Button variant="outline" size="sm" onClick={onLogout} className="w-full">
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
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm min-w-0">
              {breadcrumbs.map((crumb, idx) => (
                <span key={`${crumb.route}-${idx}`} className="flex items-center gap-1.5 min-w-0">
                  {idx > 0 && (
                    <ChevronRight
                      className="h-3.5 w-3.5 shrink-0 text-zinc-400"
                      aria-hidden="true"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => onNavigate(crumb.route)}
                    className={cn(
                      'truncate whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:underline',
                      idx === breadcrumbs.length - 1
                        ? 'font-medium text-zinc-900 dark:text-zinc-100'
                        : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                    )}
                  >
                    {crumb.title}
                  </button>
                </span>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('settings.appearance')}
            >
              Appearance
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
