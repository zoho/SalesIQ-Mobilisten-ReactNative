import React, {type ReactNode} from 'react';
import {Pressable, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../theme/useTheme';
import {sizing} from '../../theme/tokens';
import AppText from './AppText';
import IconBox from './IconBox';
import {AppIcons, type AppIconName, type IconTint} from './icons';

interface ListRowProps {
  title: string;
  /** 12pt secondary line — API names live here, never in the title. */
  subtitle?: string;
  icon?: AppIconName;
  tint?: IconTint;
  /** Trailing 13/500 secondary value (e.g. current selection). */
  value?: string;
  /** Show a trailing chevron (navigation / disclosure affordance). */
  chevron?: boolean;
  /** Custom trailing element (switch, badge, spinner…). */
  trailing?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  /** Tone for the title — `brand` renders the row as an inline action. */
  titleTone?: 'primary' | 'brand' | 'danger';
  accessibilityLabel?: string;
}

/** List row: [icon box] + title/subtitle + trailing value/chevron/control. */
const ListRow = ({
  title,
  subtitle,
  icon,
  tint = 'primary',
  value,
  chevron = false,
  trailing,
  onPress,
  disabled = false,
  titleTone = 'primary',
  accessibilityLabel,
}: ListRowProps) => {
  const {colors} = useTheme();

  const content = (
    <>
      {icon ? <IconBox icon={icon} tint={tint} /> : null}
      <View style={{flex: 1, minWidth: 0}}>
        <AppText
          variant="body"
          weight="400"
          tone={titleTone}
          style={{fontSize: 14.5, fontWeight: '500'}}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="caption" tone="secondary" style={{marginTop: 1}}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {value ? (
        <AppText
          variant="subhead"
          tone="secondary"
          weight="400"
          style={{fontWeight: '500'}}>
          {value}
        </AppText>
      ) : null}
      {trailing}
      {chevron ? (
        <MaterialCommunityIcons
          name={AppIcons.chevronRight}
          size={18}
          color={colors.textTertiary}
        />
      ) : null}
    </>
  );

  const layout = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 13,
    paddingHorizontal: 14,
    paddingVertical: 13,
    minHeight: sizing.listRowMinHeight,
    opacity: disabled ? 0.45 : 1,
  };

  if (!onPress) {
    return <View style={layout}>{content}</View>;
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      android_ripple={{color: colors.hairline}}
      style={({pressed}) => [
        layout,
        pressed ? {backgroundColor: colors.cardAlt} : null,
      ]}>
      {content}
    </Pressable>
  );
};

export default ListRow;
