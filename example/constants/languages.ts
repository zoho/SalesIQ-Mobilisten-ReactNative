/**
 * Mirrors a representative subset of the SDK's `SalesIQLanguageCodes` union
 * (`@react-native-zohosalesiq/mobilisten`) for the Settings/Core language pickers.
 * Kept local rather than deep-imported since the package only publishes its root
 * type surface.
 */
export type SupportedLanguageCode = 'en' | 'fr' | 'de' | 'es' | 'ja' | 'zh';

export interface SupportedLanguage {
  code: SupportedLanguageCode;
  label: string;
}

export const SUPPORTED_LANGUAGES: readonly SupportedLanguage[] = [
  {code: 'en', label: 'English'},
  {code: 'fr', label: 'French'},
  {code: 'de', label: 'German'},
  {code: 'es', label: 'Spanish'},
  {code: 'ja', label: 'Japanese'},
  {code: 'zh', label: 'Chinese'},
] as const;

/** Cycles to the next language in the supported list, wrapping around. */
export const nextLanguage = (currentLabel: string): SupportedLanguage => {
  const index = SUPPORTED_LANGUAGES.findIndex(
    item => item.label === currentLabel,
  );
  return SUPPORTED_LANGUAGES[(index + 1) % SUPPORTED_LANGUAGES.length];
};
