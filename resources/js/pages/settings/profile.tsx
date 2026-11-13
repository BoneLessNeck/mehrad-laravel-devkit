import { useState, type FormEvent } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import { AppLayout } from '../../layouts/app-layout';
import { SettingsLayout } from '../../layouts/settings-layout';
import { getRouteBreadcrumbs, validateProfileForm } from '../../lib/starter-kit';
import type { AppRoute, User, ValidationErrors } from '../../types';

interface ProfilePageProps {
  user: User;
  onUpdateProfile: (payload: { name: string; email: string }) => void;
  onDeleteAccount: () => void;
  onNavigate: (route: AppRoute) => void;
  onLogout: () => void;
}

export function ProfileSettingsPage({
  user,
  onUpdateProfile,
  onDeleteAccount,
  onNavigate,
  onLogout,
}: ProfilePageProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [savedNotice, setSavedNotice] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateProfileForm({ name, email });
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setSavedNotice(false);
      return;
    }
    onUpdateProfile({ name: name.trim(), email: email.trim() });
    setSavedNotice(true);
  };

  return (
    <AppLayout
      user={user}
      activeRoute="settings.profile"
      breadcrumbs={getRouteBreadcrumbs('settings.profile')}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <SettingsLayout activeRoute="settings.profile" onNavigate={onNavigate}>
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Profile information
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Update your name and email address.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="profile-name">Name</Label>
              <Input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSavedNotice(false);
                }}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && (
                <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="profile-email">Email address</Label>
              <Input
                id="profile-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSavedNotice(false);
                }}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit">Save profile</Button>
              {savedNotice && (
                <span
                  role="status"
                  className="text-sm text-emerald-700 dark:text-emerald-400"
                >
                  Saved.
                </span>
              )}
            </div>
          </form>

          <Separator />

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Delete account
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Remove your session and return to the public welcome screen.
              </p>
            </div>

            {!confirmingDelete ? (
              <Button
                variant="destructive"
                onClick={() => setConfirmingDelete(true)}
              >
                Delete account
              </Button>
            ) : (
              <div className="rounded-xl border border-red-200 bg-red-50/70 p-4 dark:border-red-900/60 dark:bg-red-950/30">
                <p className="text-sm font-medium text-red-900 dark:text-red-200">
                  Are you sure you want to delete this account?
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <Button variant="destructive" size="sm" onClick={onDeleteAccount}>
                    Confirm delete
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConfirmingDelete(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
