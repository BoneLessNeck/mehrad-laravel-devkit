import assert from 'node:assert/strict';
import test from 'node:test';
import {
  PHASE_1_FILES,
  PHASE_1_STACK,
  filterStackDependencies,
  filterStarterFiles,
  getRouteBreadcrumbs,
  resolveEffectiveTheme,
  validateLoginForm,
  validatePasswordForm,
  validateProfileForm,
  validateRegisterForm,
} from './starter-kit';

test('filterStackDependencies filters by layer and search query', () => {
  const allBackend = filterStackDependencies(PHASE_1_STACK, 'backend', '');
  assert.ok(allBackend.length >= 3);
  assert.ok(allBackend.every((item) => item.layer === 'backend'));

  const inertiaOnly = filterStackDependencies(PHASE_1_STACK, 'all', 'inertia-laravel');
  assert.equal(inertiaOnly.length, 1);
  assert.equal(inertiaOnly[0].packageName, 'inertiajs/inertia-laravel');
});

test('filterStarterFiles filters by layer and path query', () => {
  const qualityFiles = filterStarterFiles(PHASE_1_FILES, 'quality', '');
  assert.ok(qualityFiles.length >= 2);
  assert.ok(qualityFiles.every((file) => file.layer === 'quality'));

  const sailFile = filterStarterFiles(PHASE_1_FILES, 'all', 'compose.yaml');
  assert.equal(sailFile.length, 1);
  assert.equal(sailFile[0].path, 'compose.yaml');
});

test('validateLoginForm catches missing or malformed inputs', () => {
  const emptyErrors = validateLoginForm({ email: '', password: '' });
  assert.equal(emptyErrors.email, 'Email address is required.');
  assert.equal(emptyErrors.password, 'Password is required.');

  const invalidEmail = validateLoginForm({ email: 'not-an-email', password: 'secret' });
  assert.equal(invalidEmail.email, 'Enter a valid email address.');
  assert.equal(invalidEmail.password, undefined);

  const valid = validateLoginForm({ email: 'admin@example.com', password: 'password' });
  assert.deepEqual(valid, {});
});

test('validateRegisterForm enforces password length and confirmation match', () => {
  const mismatch = validateRegisterForm({
    name: 'Mehrad Developer',
    email: 'dev@example.com',
    password: 'password123',
    passwordConfirmation: 'different',
  });
  assert.equal(mismatch.passwordConfirmation, 'Password confirmation does not match.');

  const shortPass = validateRegisterForm({
    name: 'Mehrad Developer',
    email: 'dev@example.com',
    password: '123',
    passwordConfirmation: '123',
  });
  assert.equal(shortPass.password, 'Password must be at least 8 characters.');

  const valid = validateRegisterForm({
    name: 'Mehrad Developer',
    email: 'dev@example.com',
    password: 'password123',
    passwordConfirmation: 'password123',
  });
  assert.deepEqual(valid, {});
});

test('validateProfileForm and validatePasswordForm validate settings updates', () => {
  assert.equal(validateProfileForm({ name: '', email: 'bad' }).name, 'Name is required.');
  assert.equal(
    validateProfileForm({ name: 'Ada', email: 'bad' }).email,
    'Enter a valid email address.'
  );
  assert.deepEqual(validateProfileForm({ name: 'Ada', email: 'ada@example.com' }), {});

  const pwdErr = validatePasswordForm({
    currentPassword: '',
    password: 'short',
    passwordConfirmation: 'other',
  });
  assert.equal(pwdErr.currentPassword, 'Current password is required.');
  assert.equal(pwdErr.password, 'New password must be at least 8 characters.');
  assert.equal(pwdErr.passwordConfirmation, 'Password confirmation does not match.');
});

test('resolveEffectiveTheme resolves explicit and system preferences', () => {
  assert.equal(resolveEffectiveTheme('light', true), 'light');
  assert.equal(resolveEffectiveTheme('dark', false), 'dark');
  assert.equal(resolveEffectiveTheme('system', true), 'dark');
  assert.equal(resolveEffectiveTheme('system', false), 'light');
});

test('getRouteBreadcrumbs returns expected breadcrumb trails', () => {
  const crumbs = getRouteBreadcrumbs('settings.appearance');
  assert.deepEqual(crumbs, [
    { title: 'Settings', route: 'settings.profile' },
    { title: 'Appearance', route: 'settings.appearance' },
  ]);
});
