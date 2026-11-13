import { useState, type FormEvent } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { AuthLayout } from '../../layouts/auth-layout';
import { isValidEmail } from '../../lib/starter-kit';
import type { AppRoute } from '../../types';

interface ForgotPasswordPageProps {
  onNavigate: (route: AppRoute) => void;
}

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <AuthLayout
      title="Forgot password"
      description="Enter your email to receive a password reset link."
      onNavigate={onNavigate}
    >
      {submitted && (
        <div
          role="status"
          className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300"
        >
          A reset link will be sent if the account exists in your Laravel application.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="forgot-email">Email address</Label>
          <Input
            id="forgot-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            aria-invalid={Boolean(error)}
          />
          {error && (
            <p className="text-xs text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Email password reset link
        </Button>

        <p className="pt-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
          Or, return to{' '}
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="font-medium text-zinc-900 hover:underline dark:text-zinc-100 cursor-pointer"
          >
            log in
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}
