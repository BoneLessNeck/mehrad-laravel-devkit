import type { ReactNode } from 'react';
import { AppLogo } from '../components/app-logo';
import type { AppRoute } from '../types';

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  onNavigate: (route: AppRoute) => void;
}

export function AuthLayout({ title, description, children, onNavigate }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-12 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <button
            type="button"
            onClick={() => onNavigate('welcome')}
            aria-label="Return to Mehrad Devkit home"
            className="mb-6 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-200 cursor-pointer"
          >
            <AppLogo />
          </button>
          <h1 className="text-2xl font-semibold tracking-tight text-balance text-zinc-900 dark:text-zinc-100">
            {title}
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          {children}
        </div>
      </div>
    </div>
  );
}
