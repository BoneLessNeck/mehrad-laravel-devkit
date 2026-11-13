import { useCallback, useEffect, useState } from 'react';
import { resolveEffectiveTheme } from '../lib/starter-kit';
import type { ThemeMode } from '../types';

const STORAGE_KEY = 'mehrad-appearance';

function applyThemeToDocument(mode: ThemeMode) {
  if (typeof window === 'undefined') return;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const effective = resolveEffectiveTheme(mode, prefersDark);
  const root = document.documentElement;
  if (effective === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function useAppearance() {
  const [appearance, setAppearance] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved;
    }
    return 'light';
  });

  useEffect(() => {
    applyThemeToDocument(appearance);

    if (appearance !== 'system' || typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyThemeToDocument('system');
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, [appearance]);

  const updateAppearance = useCallback((nextMode: ThemeMode) => {
    setAppearance(nextMode);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextMode);
    }
    applyThemeToDocument(nextMode);
  }, []);

  return { appearance, updateAppearance } as const;
}
