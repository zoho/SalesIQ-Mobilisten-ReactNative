import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {useColorScheme} from 'react-native';
import {darkColors, lightColors, type ColorTokens} from './tokens';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  /** Resolved color tokens for the active scheme. */
  colors: ColorTokens;
  /** Resolved scheme after applying the mode override. */
  scheme: 'light' | 'dark';
  /** The user-selected appearance mode (Settings → Appearance). */
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  colors: lightColors,
  scheme: 'light',
  mode: 'system',
  setMode: () => {},
});

/** In-memory persistence: the override survives re-mounts for the app session. */
let persistedMode: ThemeMode = 'system';

const ThemeProvider = ({children}: {children: ReactNode}) => {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(persistedMode);

  const setMode = useCallback((next: ThemeMode) => {
    persistedMode = next;
    setModeState(next);
  }, []);

  const scheme: 'light' | 'dark' =
    mode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode;

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors: scheme === 'dark' ? darkColors : lightColors,
      scheme,
      mode,
      setMode,
    }),
    [scheme, mode, setMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
