import { useState, type FormEvent } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { AppLayout } from '../../layouts/app-layout';
import { SettingsLayout } from '../../layouts/settings-layout';
import { getRouteBreadcrumbs, validatePasswordForm } from '../../lib/starter-kit';
import type { AppRoute, User, ValidationErrors } from '../../types';

interface PasswordSettingsPageProps {
  user: User;
  onNavigate: (route: AppRoute) => void;
  onLogout: () => void;
}

export function PasswordSettingsPage({
  user,
  onNavigate,
  onLogout,
}: PasswordSettingsPageProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validatePasswordForm({
      currentPassword,
      password,
      passwordConfirmation,
    });
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setSavedNotice(false);
      return;
    }
    setCurrentPassword('');
    setPassword('');
    setPasswordConfirmation('');
    setSavedNotice(true);
  };

  return (
    <AppLayout
      user={user}
      activeRoute="settings.password"
      breadcrumbs={getRouteBreadcrumbs('settings.password')}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <SettingsLayout activeRoute="settings.password" onNavigate={onNavigate}>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Update password
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Ensure your account uses a strong password at least 8 characters long.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="current-password">Current password</Label>
              <Input
                id="current-password"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setSavedNotice(false);
                }}
                aria-invalid={Boolean(errors.currentPassword)}
              />
              {errors.currentPassword && (
                <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                  {errors.currentPassword}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setSavedNotice(false);
                }}
                aria-invalid={Boolean(errors.password)}
              />
              {errors.password && (
                <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirm-new-password">Confirm password</Label>
              <Input
                id="confirm-new-password"
                type="password"
                autoComplete="new-password"
                value={passwordConfirmation}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                  setSavedNotice(false);
                }}
                aria-invalid={Boolean(errors.passwordConfirmation)}
              />
              {errors.passwordConfirmation && (
                <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                  {errors.passwordConfirmation}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit">Save password</Button>
              {savedNotice && (
                <span
                  role="status"
                  className="text-sm text-emerald-700 dark:text-emerald-400"
                >
                  Password updated.
                </span>
              )}
            </div>
          </form>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
