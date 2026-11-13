import { useState } from 'react';
import { useAppearance } from '../resources/js/hooks/use-appearance';
import { ForgotPasswordPage } from '../resources/js/pages/auth/forgot-password';
import { LoginPage } from '../resources/js/pages/auth/login';
import { RegisterPage } from '../resources/js/pages/auth/register';
import { DashboardPage } from '../resources/js/pages/dashboard';
import { AppearanceSettingsPage } from '../resources/js/pages/settings/appearance';
import { PasswordSettingsPage } from '../resources/js/pages/settings/password';
import { ProfileSettingsPage } from '../resources/js/pages/settings/profile';
import { WelcomePage } from '../resources/js/pages/welcome';
import type { AppRoute, User } from '../resources/js/types';

const DEFAULT_DEMO_USER: User = {
  id: 1,
  name: 'Mehrad Admin',
  email: 'admin@example.com',
  email_verified_at: '2026-11-13T00:00:00Z',
  created_at: '2026-11-13T00:00:00Z',
  updated_at: '2026-11-13T00:00:00Z',
};

export default function App() {
  const { appearance, updateAppearance } = useAppearance();

  const [route, setRoute] = useState<AppRoute>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        return 'dashboard';
      }
    }
    return 'welcome';
  });

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        return DEFAULT_DEMO_USER;
      }
    }
    return null;
  });

  const navigate = (nextRoute: AppRoute) => {
    const requiresAuth =
      nextRoute === 'dashboard' || nextRoute.startsWith('settings.');
    if (requiresAuth && !user) {
      setRoute('login');
      return;
    }
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleLogin = ({ email }: { email: string; remember: boolean }) => {
    setUser({
      ...DEFAULT_DEMO_USER,
      email,
    });
    setRoute('dashboard');
  };

  const handleRegister = ({ name, email }: { name: string; email: string }) => {
    setUser({
      ...DEFAULT_DEMO_USER,
      name,
      email,
    });
    setRoute('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setRoute('welcome');
  };

  const handleUpdateProfile = ({ name, email }: { name: string; email: string }) => {
    if (!user) return;
    setUser({
      ...user,
      name,
      email,
      updated_at: new Date().toISOString(),
    });
  };

  const handleDeleteAccount = () => {
    setUser(null);
    setRoute('welcome');
  };

  if (route === 'login') {
    return <LoginPage onLogin={handleLogin} onNavigate={navigate} />;
  }

  if (route === 'register') {
    return <RegisterPage onRegister={handleRegister} onNavigate={navigate} />;
  }

  if (route === 'forgot-password') {
    return <ForgotPasswordPage onNavigate={navigate} />;
  }

  if (route === 'dashboard' && user) {
    return (
      <DashboardPage
        user={user}
        onNavigate={navigate}
        onLogout={handleLogout}
      />
    );
  }

  if (route === 'settings.profile' && user) {
    return (
      <ProfileSettingsPage
        user={user}
        onUpdateProfile={handleUpdateProfile}
        onDeleteAccount={handleDeleteAccount}
        onNavigate={navigate}
        onLogout={handleLogout}
      />
    );
  }

  if (route === 'settings.password' && user) {
    return (
      <PasswordSettingsPage
        user={user}
        onNavigate={navigate}
        onLogout={handleLogout}
      />
    );
  }

  if (route === 'settings.appearance' && user) {
    return (
      <AppearanceSettingsPage
        user={user}
        appearance={appearance}
        onChangeAppearance={updateAppearance}
        onNavigate={navigate}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <WelcomePage
      user={user}
      appearance={appearance}
      onChangeAppearance={updateAppearance}
      onNavigate={navigate}
    />
  );
}
