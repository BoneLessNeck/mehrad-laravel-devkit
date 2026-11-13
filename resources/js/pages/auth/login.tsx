import { useState, type FormEvent } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { AuthLayout } from '../../layouts/auth-layout';
import { validateLoginForm } from '../../lib/starter-kit';
import type { AppRoute, ValidationErrors } from '../../types';

interface LoginPageProps {
  statusMessage?: string | null;
  onLogin: (payload: { email: string; remember: boolean }) => void;
  onNavigate: (route: AppRoute) => void;
}

export function LoginPage({ statusMessage, onLogin, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateLoginForm({ email, password });
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      return;
    }
    onLogin({ email: email.trim(), remember });
  };

  return (
    <AuthLayout
      title="Log in to your account"
      description="Enter your email and password below to log in."
      onNavigate={onNavigate}
    >
      {statusMessage && (
        <div
          role="status"
          className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300"
        >
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="login-email">Email address</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            <button
              type="button"
              onClick={() => onNavigate('forgot-password')}
              className="text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100 cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950"
          />
          <Label htmlFor="login-remember" className="text-sm font-normal">
            Remember me
          </Label>
        </div>

        <Button type="submit" className="w-full">
          Log in
        </Button>

        <p className="pt-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="font-medium text-zinc-900 hover:underline dark:text-zinc-100 cursor-pointer"
          >
            Sign up
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}
