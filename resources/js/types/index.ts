export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BreadcrumbItem {
  title: string;
  route: AppRoute;
}

export type AppRoute =
  | 'welcome'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'dashboard'
  | 'settings.profile'
  | 'settings.password'
  | 'settings.appearance';

export type ThemeMode = 'light' | 'dark' | 'system';

export type StackLayer = 'all' | 'backend' | 'frontend' | 'quality' | 'infrastructure';

export interface StackDependency {
  name: string;
  packageName: string;
  version: string;
  layer: Exclude<StackLayer, 'all'>;
  purpose: string;
  phase: 'Phase 1';
}

export interface StarterFileNode {
  path: string;
  layer: Exclude<StackLayer, 'all'>;
  summary: string;
}

export interface SetupStep {
  step: number;
  title: string;
  command: string;
  note: string;
}

export interface ValidationErrors {
  [field: string]: string | undefined;
}
