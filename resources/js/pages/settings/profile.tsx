import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AppLayout } from '@/layouts/app-layout';
import { SettingsLayout } from '@/layouts/settings-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useRef, useState, type FormEventHandler } from 'react';
import { route } from 'ziggy-js';

interface ProfileProps {
  mustVerifyEmail?: boolean;
  status?: string;
}

export default function Profile({ status }: ProfileProps) {
  const { auth } = usePage<SharedData>().props;
  const user = auth.user;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deletePasswordInput = useRef<HTMLInputElement>(null);

  const profileForm = useForm({
    name: user?.name ?? '',
    email: user?.email ?? '',
  });

  const deleteForm = useForm({
    password: '',
  });

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Settings', href: route('profile.edit') },
    { title: 'Profile', href: route('profile.edit') },
  ];

  const handleProfileSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    profileForm.patch(route('profile.update'), {
      preserveScroll: true,
    });
  };

  const handleDeleteSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    deleteForm.delete(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => setDeleteDialogOpen(false),
      onError: () => deletePasswordInput.current?.focus(),
      onFinish: () => deleteForm.reset(),
    });
  };

  const handleDeleteDialogChange = (open: boolean) => {
    setDeleteDialogOpen(open);
    if (!open) {
      deleteForm.clearErrors();
      deleteForm.reset();
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profile settings" />
      <SettingsLayout>
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Profile information
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Update your name and email address.
            </p>
          </div>

          {status && (
            <div
              role="status"
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300"
            >
              {status}
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="profile-name">Name</Label>
              <Input
                id="profile-name"
                type="text"
                required
                autoComplete="name"
                value={profileForm.data.name}
                onChange={(e) => profileForm.setData('name', e.target.value)}
                aria-invalid={Boolean(profileForm.errors.name)}
              />
              {profileForm.errors.name && (
                <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                  {profileForm.errors.name}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="profile-email">Email address</Label>
              <Input
                id="profile-email"
                type="email"
                required
                autoComplete="username"
                value={profileForm.data.email}
                onChange={(e) => profileForm.setData('email', e.target.value)}
                aria-invalid={Boolean(profileForm.errors.email)}
              />
              {profileForm.errors.email && (
                <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                  {profileForm.errors.email}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={profileForm.processing}>
                {profileForm.processing ? 'Saving...' : 'Save profile'}
              </Button>
              {profileForm.recentlySuccessful && (
                <span role="status" className="text-sm text-emerald-700 dark:text-emerald-400">
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
                Permanently remove your account and all associated session data.
              </p>
            </div>

            <Dialog open={deleteDialogOpen} onOpenChange={handleDeleteDialogChange}>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete account</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                  <DialogDescription>
                    Once your account is deleted, all of its data will be permanently removed.
                    Please enter your password to confirm.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleDeleteSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="delete-account-password">Password</Label>
                    <Input
                      id="delete-account-password"
                      ref={deletePasswordInput}
                      type="password"
                      required
                      autoComplete="current-password"
                      value={deleteForm.data.password}
                      onChange={(e) => deleteForm.setData('password', e.target.value)}
                      placeholder="Current password"
                      aria-invalid={Boolean(deleteForm.errors.password)}
                    />
                    {deleteForm.errors.password && (
                      <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                        {deleteForm.errors.password}
                      </p>
                    )}
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" variant="destructive" disabled={deleteForm.processing}>
                      {deleteForm.processing ? 'Deleting...' : 'Delete account'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
