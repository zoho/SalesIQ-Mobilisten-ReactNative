import React from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../theme/useTheme';
import {radius} from '../../theme/tokens';
import AppText from './AppText';
import {AppIcons, type AppIconName} from './icons';

type Tone = 'primary' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  label: string;
  tone?: Tone;
  icon?: AppIconName;
}

/** Pill badge: radius 100, 6/11 padding, 12/500, tint bg + matching strong-color text. */
const Badge = ({label, tone = 'primary', icon}: BadgeProps) => {
  const {colors} = useTheme();

  const appearance: Record<Tone, {bg: string; fg: string}> = {
    primary: {bg: colors.tintPrimary, fg: colors.primary},
    success: {bg: colors.tintSecondary, fg: colors.secondary},
    warning: {bg: colors.tintAccent, fg: colors.accent},
    danger: {bg: colors.tintDanger, fg: colors.danger},
  };
  const {bg, fg} = appearance[tone];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 6,
        backgroundColor: bg,
        borderRadius: radius.pill,
        paddingVertical: 6,
        paddingHorizontal: 11,
      }}>
      {icon ? (
        <MaterialCommunityIcons name={AppIcons[icon]} size={13} color={fg} />
      ) : null}
      <AppText
        variant="caption"
        weight="600"
        style={{fontSize: 12, fontWeight: '500', color: fg}}>
        {label}
      </AppText>
    </View>
  );
};

export default Badge;
