import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppLayout } from '@/layouts/app-layout';
import { SettingsLayout } from '@/layouts/settings-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useRef, type FormEventHandler } from 'react';
import { route } from 'ziggy-js';

export default function Password() {
  const currentPasswordInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const { data, setData, put, processing, errors, reset, recentlySuccessful } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Settings', href: route('profile.edit') },
    { title: 'Password', href: route('password.edit') },
  ];

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (formErrors) => {
        if (formErrors.password) {
          reset('password', 'password_confirmation');
          passwordInput.current?.focus();
        }
        if (formErrors.current_password) {
          reset('current_password');
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Password settings" />
      <SettingsLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Update password
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Ensure your account uses a strong password at least 8 characters long.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="current-password">Current password</Label>
              <Input
                id="current-password"
                ref={currentPasswordInput}
                type="password"
                required
                autoComplete="current-password"
                value={data.current_password}
                onChange={(e) => setData('current_password', e.target.value)}
                aria-invalid={Boolean(errors.current_password)}
              />
              {errors.current_password && (
                <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                  {errors.current_password}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                ref={passwordInput}
                type="password"
                required
                autoComplete="new-password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
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
                required
                autoComplete="new-password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                aria-invalid={Boolean(errors.password_confirmation)}
              />
              {errors.password_confirmation && (
                <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                  {errors.password_confirmation}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={processing}>
                {processing ? 'Saving...' : 'Save password'}
              </Button>
              {recentlySuccessful && (
                <span role="status" className="text-sm text-emerald-700 dark:text-emerald-400">
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
