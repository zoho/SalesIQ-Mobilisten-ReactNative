import React from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../theme/useTheme';
import AppText from './AppText';
import {AppIcons, type AppIconName} from './icons';

type Variant = 'info' | 'ok' | 'warning' | 'danger';

interface StatusBannerProps {
  title: string;
  body?: string;
  variant?: Variant;
  icon?: AppIconName;
}

/** Tinted banner: icon box + title 13.5/600 (strong color) + body 12 secondary. */
const StatusBanner = ({
  title,
  body,
  variant = 'info',
  icon,
}: StatusBannerProps) => {
  const {colors} = useTheme();

  const appearance: Record<
    Variant,
    {bg: string; fg: string; icon: AppIconName}
  > = {
    info: {bg: colors.tintPrimary, fg: colors.primary, icon: icon ?? 'info'},
    ok: {bg: colors.tintSecondary, fg: colors.secondary, icon: icon ?? 'check'},
    warning: {bg: colors.tintAccent, fg: colors.accent, icon: icon ?? 'alert'},
    danger: {bg: colors.tintDanger, fg: colors.danger, icon: icon ?? 'alert'},
  };
  const {bg, fg, icon: glyph} = appearance[variant];

  return (
    <View
      accessibilityRole="text"
      style={{
        flexDirection: 'row',
        gap: 11,
        alignItems: 'flex-start',
        backgroundColor: bg,
        borderRadius: 14,
        paddingVertical: 13,
        paddingHorizontal: 14,
      }}>
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: fg + '24',
        }}>
        <MaterialCommunityIcons name={AppIcons[glyph]} size={18} color={fg} />
      </View>
      <View style={{flex: 1, minWidth: 0}}>
        <AppText
          variant="subhead"
          weight="600"
          style={{fontSize: 13.5, fontWeight: '600', color: fg}}>
          {title}
        </AppText>
        {body ? (
          <AppText
            variant="caption"
            tone="secondary"
            style={{marginTop: 2, lineHeight: 17}}>
            {body}
          </AppText>
        ) : null}
      </View>
    </View>
  );
};

export default StatusBanner;
