import React from 'react';
import {Platform, Text, type TextProps, type TextStyle} from 'react-native';
import useTheme from '../../theme/useTheme';
import {typography, type TypeStyle} from '../../theme/tokens';

type Variant = keyof typeof typography.scale;
type Tone =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'brand'
  | 'success'
  | 'danger'
  | 'accent';

interface AppTextProps extends TextProps {
  variant?: Variant;
  tone?: Tone;
  /** Overrides the variant's default weight (400 or 600 only). */
  weight?: '400' | '600';
}

/** Token-driven text — the only way type styles are applied in the app. */
const AppText = ({
  variant = 'body',
  tone = 'primary',
  weight,
  style,
  children,
  ...rest
}: AppTextProps) => {
  const {colors} = useTheme();
  const t: TypeStyle = typography.scale[variant];
  const color = {
    primary: colors.textPrimary,
    secondary: colors.textSecondary,
    tertiary: colors.textTertiary,
    brand: colors.primary,
    success: colors.secondary,
    danger: colors.danger,
    accent: colors.accent,
  }[tone];

  const base: TextStyle = {
    fontSize: t.size,
    fontWeight: weight ?? t.weight,
    letterSpacing: t.letterSpacing,
    color,
    ...(t.uppercase ? {textTransform: 'uppercase'} : null),
    ...(variant === 'mono'
      ? {
          fontFamily: Platform.select({ios: 'Menlo', default: 'monospace'}),
          fontVariant: ['tabular-nums'],
        }
      : null),
  };

  return (
    <Text style={[base, style]} {...rest}>
      {children}
    </Text>
  );
};

export default AppText;
