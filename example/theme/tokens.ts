/**
 * GENERATED from design/design-tokens.json (v1.0.0) — do not edit by hand.
 * Every color/size/type value in the app must come from this file.
 */

export interface ColorTokens {
  primary: string;
  onPrimary: string;
  secondary: string;
  accent: string;
  danger: string;
  success: string;
  warning: string;
  page: string;
  card: string;
  cardAlt: string;
  border: string;
  borderSubtle: string;
  hairline: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  tintPrimary: string;
  tintSecondary: string;
  tintAccent: string;
  tintDanger: string;
  segmentTrack: string;
  segmentThumb: string;
  switchOn: string;
  switchOff: string;
  resultBlockBg: string;
  statusBarStyle: 'dark-content' | 'light-content';
}

export const lightColors: ColorTokens = {
  primary: '#2E63F6',
  onPrimary: '#FFFFFF',
  secondary: '#12A06E',
  accent: '#D8722F',
  danger: '#E24B4A',
  success: '#12A06E',
  warning: '#D8722F',
  page: '#FBFBFD',
  card: '#FFFFFF',
  cardAlt: '#F6F7F9',
  border: '#ECEEF2',
  borderSubtle: '#F1F2F5',
  hairline: '#EFF1F5',
  textPrimary: '#0B1220',
  textSecondary: '#6E7683',
  textTertiary: '#9098A3',
  tintPrimary: '#EAF0FF',
  tintSecondary: '#E7F7F0',
  tintAccent: '#FBEFE6',
  tintDanger: '#FCEBEB',
  segmentTrack: '#EFF1F5',
  segmentThumb: '#FFFFFF',
  switchOn: '#12A06E',
  switchOff: '#ECEEF2',
  resultBlockBg: '#F6F7F9',
  statusBarStyle: 'dark-content',
};

export const darkColors: ColorTokens = {
  primary: '#5A86FF',
  onPrimary: '#FFFFFF',
  secondary: '#35C79A',
  accent: '#F0955A',
  danger: '#F0706F',
  success: '#35C79A',
  warning: '#F0955A',
  page: '#0B1220',
  card: '#151B2B',
  cardAlt: '#1B2233',
  border: '#232B3E',
  borderSubtle: '#1E2536',
  hairline: '#1E2537',
  textPrimary: '#F4F6FA',
  textSecondary: '#A0A8B8',
  textTertiary: '#6E7788',
  tintPrimary: '#17233F',
  tintSecondary: '#123027',
  tintAccent: '#33251A',
  tintDanger: '#3A1D1D',
  segmentTrack: '#1B2233',
  segmentThumb: '#2B344B',
  switchOn: '#35C79A',
  switchOff: '#232B3E',
  resultBlockBg: '#1B2233',
  statusBarStyle: 'light-content',
};

export interface TypeStyle {
  size: number;
  weight: '400' | '600';
  letterSpacing: number;
  uppercase?: boolean;
}

/** family: "system", monoFamily: "system-mono", weights: regular 400 / medium 600 */
export const typography = {
  scale: {
    largeTitle: {size: 28, weight: '600', letterSpacing: -0.6} as TypeStyle,
    title: {size: 20, weight: '600', letterSpacing: -0.3} as TypeStyle,
    headline: {size: 16, weight: '600', letterSpacing: 0} as TypeStyle,
    body: {size: 15, weight: '400', letterSpacing: 0} as TypeStyle,
    subhead: {size: 13, weight: '400', letterSpacing: 0} as TypeStyle,
    caption: {size: 12, weight: '400', letterSpacing: 0} as TypeStyle,
    sectionLabel: {
      size: 11,
      weight: '600',
      letterSpacing: 1.0,
      uppercase: true,
    } as TypeStyle,
    mono: {size: 12, weight: '400', letterSpacing: 0} as TypeStyle,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  control: 13,
  card: 16,
  icon: 10,
  input: 12,
  pill: 100,
} as const;

export const sizing = {
  minTouchTarget: 44,
  listRowIconBox: 34,
  listRowIconGlyph: 19,
  listRowMinHeight: 52,
  buttonHeight: 48,
  switchWidth: 44,
  switchHeight: 27,
} as const;

export const elevation = {
  card: {opacity: 0.05, radius: 2, offsetY: 1},
  buttonPrimary: {opacity: 0.28, radius: 12, offsetY: 4, colorFrom: 'primary'},
} as const;

export const iconGrid = {viewBox: 24, safeInset: 2, strokeWidth: 1.7} as const;
