import { AppLogo } from '@/components/app-logo';
import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { route } from 'ziggy-js';

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-12 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link
            href={route('home')}
            aria-label="Return to Mehrad Devkit home"
            className="mb-6 rounded-lg focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none dark:focus-visible:ring-zinc-200"
          >
            <AppLogo />
          </Link>
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
