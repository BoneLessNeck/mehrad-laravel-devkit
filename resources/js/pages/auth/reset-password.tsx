import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { route } from 'ziggy-js';

interface ResetPasswordProps {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email: email ?? '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('password.store'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <AuthLayout title="Reset password" description="Please enter your new password below.">
      <Head title="Reset password" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="reset-email">Email address</Label>
          <Input
            id="reset-email"
            type="email"
            required
            autoComplete="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <p className="text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="reset-password">Password</Label>
          <Input
            id="reset-password"
            type="password"
            required
            autoFocus
            autoComplete="new-password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            placeholder="Minimum 8 characters"
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password && (
            <p className="text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="reset-password-confirmation">Confirm password</Label>
          <Input
            id="reset-password-confirmation"
            type="password"
            required
            autoComplete="new-password"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            placeholder="Confirm password"
            aria-invalid={Boolean(errors.password_confirmation)}
          />
          {errors.password_confirmation && (
            <p className="text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.password_confirmation}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={processing}>
          {processing ? 'Resetting password...' : 'Reset password'}
        </Button>
      </form>
    </AuthLayout>
  );
}
