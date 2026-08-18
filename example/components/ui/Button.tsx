import React, {type ReactNode} from 'react';
import {
  ActivityIndicator,
  Pressable,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../theme/useTheme';
import {radius, sizing} from '../../theme/tokens';
import AppText from './AppText';
import {AppIcons, type AppIconName} from './icons';

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: AppIconName;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/** Full-width action button: height 48, radius 13, 14.5/600 label. */
const Button = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  disabled = false,
  loading = false,
  style,
  accessibilityLabel,
}: ButtonProps) => {
  const {colors} = useTheme();
  const isDisabled = disabled || loading;

  const appearance: Record<
    Variant,
    {
      bg: string;
      border?: string;
      textColor: string;
      shadow?: boolean;
    }
  > = {
    primary: {bg: colors.primary, textColor: colors.onPrimary, shadow: true},
    secondary: {
      bg: colors.card,
      border: colors.border,
      textColor: colors.primary,
    },
    ghost: {bg: 'transparent', textColor: colors.primary},
    destructive: {
      bg: 'transparent',
      border: colors.danger,
      textColor: colors.danger,
    },
  };

  const {bg, border, textColor, shadow} = appearance[variant];

  let content: ReactNode;
  if (loading) {
    content = <ActivityIndicator size="small" color={textColor} />;
  } else {
    content = (
      <>
        {icon ? (
          <MaterialCommunityIcons
            name={AppIcons[icon]}
            size={18}
            color={textColor}
          />
        ) : null}
        <AppText
          variant="body"
          weight="600"
          style={{fontSize: 14.5, color: textColor}}>
          {title}
        </AppText>
      </>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{disabled: isDisabled, busy: loading}}
      style={({pressed}) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          height: sizing.buttonHeight,
          borderRadius: radius.control,
          backgroundColor: bg,
          borderWidth: border ? 1 : 0,
          borderColor: border,
          opacity: isDisabled ? 0.45 : pressed ? 0.85 : 1,
        },
        shadow
          ? {
              shadowColor: colors.primary,
              shadowOpacity: 0.28,
              shadowRadius: 12,
              shadowOffset: {width: 0, height: 4},
              elevation: 3,
            }
          : null,
        style,
      ]}>
      {content}
    </Pressable>
  );
};

export default Button;
