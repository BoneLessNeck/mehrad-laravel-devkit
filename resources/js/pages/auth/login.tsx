import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/layouts/auth-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { route } from 'ziggy-js';

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false as boolean,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <AuthLayout
      title="Log in to your account"
      description="Enter your email and password below to log in."
    >
      <Head title="Log in" />

      {status && (
        <div
          role="status"
          className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300"
        >
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="login-email">Email address</Label>
          <Input
            id="login-email"
            type="email"
            required
            autoFocus
            autoComplete="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            placeholder="email@example.com"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <p className="text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Password</Label>
            {canResetPassword && (
              <Link
                href={route('password.request')}
                className="text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <Input
            id="login-password"
            type="password"
            required
            autoComplete="current-password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            placeholder="Password"
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password && (
            <p className="text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            id="login-remember"
            type="checkbox"
            checked={data.remember}
            onChange={(e) => setData('remember', e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950"
          />
          <Label htmlFor="login-remember" className="text-sm font-normal">
            Remember me
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={processing}>
          {processing ? 'Logging in...' : 'Log in'}
        </Button>

        <p className="pt-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link
            href={route('register')}
            className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
