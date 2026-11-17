import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/layouts/auth-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { route } from 'ziggy-js';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account."
    >
      <Head title="Register" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="register-name">Full name</Label>
          <Input
            id="register-name"
            type="text"
            required
            autoFocus
            autoComplete="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            placeholder="Mehrad Developer"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && (
            <p className="text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="register-email">Email address</Label>
          <Input
            id="register-email"
            type="email"
            required
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
          <Label htmlFor="register-password">Password</Label>
          <Input
            id="register-password"
            type="password"
            required
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
          <Label htmlFor="register-password-confirmation">Confirm password</Label>
          <Input
            id="register-password-confirmation"
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
          {processing ? 'Creating account...' : 'Create account'}
        </Button>

        <p className="pt-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
          Already have an account?{' '}
          <Link
            href={route('login')}
            className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
          >
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
