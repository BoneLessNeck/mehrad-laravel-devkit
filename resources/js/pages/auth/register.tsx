import { useState, type FormEvent } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { AuthLayout } from '../../layouts/auth-layout';
import { validateRegisterForm } from '../../lib/starter-kit';
import type { AppRoute, ValidationErrors } from '../../types';

interface RegisterPageProps {
  onRegister: (payload: { name: string; email: string }) => void;
  onNavigate: (route: AppRoute) => void;
}

export function RegisterPage({ onRegister, onNavigate }: RegisterPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateRegisterForm({
      name,
      email,
      password,
      passwordConfirmation,
    });
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      return;
    }
    onRegister({ name: name.trim(), email: email.trim() });
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account."
      onNavigate={onNavigate}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="register-name">Full name</Label>
          <Input
            id="register-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <Label htmlFor="register-password">Password</Label>
          <Input
            id="register-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            autoComplete="new-password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirm password"
            aria-invalid={Boolean(errors.passwordConfirmation)}
          />
          {errors.passwordConfirmation && (
            <p className="text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.passwordConfirmation}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Create account
        </Button>

        <p className="pt-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="font-medium text-zinc-900 hover:underline dark:text-zinc-100 cursor-pointer"
          >
            Log in
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}
