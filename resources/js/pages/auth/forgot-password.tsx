import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/layouts/auth-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { route } from 'ziggy-js';

interface ForgotPasswordProps {
  status?: string;
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('password.email'));
  };

  return (
    <AuthLayout
      title="Forgot password"
      description="Enter your email to receive a password reset link."
    >
      <Head title="Forgot password" />

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
          <Label htmlFor="forgot-email">Email address</Label>
          <Input
            id="forgot-email"
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

        <Button type="submit" className="w-full" disabled={processing}>
          {processing ? 'Sending reset link...' : 'Email password reset link'}
        </Button>

        <p className="pt-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
          Or, return to{' '}
          <Link
            href={route('login')}
            className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
          >
            log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
