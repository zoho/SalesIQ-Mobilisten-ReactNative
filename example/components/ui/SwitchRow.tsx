import React from 'react';
import {Switch, View} from 'react-native';
import useTheme from '../../theme/useTheme';
import {sizing} from '../../theme/tokens';
import AppText from './AppText';
import IconBox from './IconBox';
import type {AppIconName, IconTint} from './icons';

interface SwitchRowProps {
  title: string;
  subtitle?: string;
  icon?: AppIconName;
  tint?: IconTint;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
}

/** List row with a trailing 44×27 switch — same composition/metrics as ListRow. */
const SwitchRow = ({
  title,
  subtitle,
  icon,
  tint = 'primary',
  value,
  onValueChange,
  disabled = false,
  accessibilityLabel,
}: SwitchRowProps) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
        paddingHorizontal: 14,
        paddingVertical: 13,
        minHeight: sizing.listRowMinHeight,
        opacity: disabled ? 0.45 : 1,
      }}>
      {icon ? <IconBox icon={icon} tint={tint} /> : null}
      <View style={{flex: 1, minWidth: 0}}>
        <AppText
          variant="body"
          weight="400"
          style={{fontSize: 14.5, fontWeight: '500'}}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="caption" tone="secondary" style={{marginTop: 1}}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel ?? title}
        trackColor={{false: colors.switchOff, true: colors.switchOn}}
        thumbColor="#FFFFFF"
        ios_backgroundColor={colors.switchOff}
      />
    </View>
  );
};

export default SwitchRow;
