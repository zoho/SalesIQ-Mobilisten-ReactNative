import React from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../theme/useTheme';
import {radius, sizing} from '../../theme/tokens';
import {AppIcons, type AppIconName, type IconTint} from './icons';

interface IconBoxProps {
  icon: AppIconName;
  tint?: IconTint;
  /** Box edge length; defaults to the 34pt list-row icon box. */
  size?: number;
  /** Glyph size; defaults to 19pt per tokens. */
  glyphSize?: number;
}

/** 34×34 tinted icon box (radius 10) with a 19pt colored glyph. */
const IconBox = ({
  icon,
  tint = 'primary',
  size = sizing.listRowIconBox,
  glyphSize = sizing.listRowIconGlyph,
}: IconBoxProps) => {
  const {colors} = useTheme();
  const tintBg = {
    primary: colors.tintPrimary,
    secondary: colors.tintSecondary,
    accent: colors.tintAccent,
    danger: colors.tintDanger,
  }[tint];
  const glyph = {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    danger: colors.danger,
  }[tint];

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius.icon,
        backgroundColor: tintBg,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <MaterialCommunityIcons
        name={AppIcons[icon]}
        size={glyphSize}
        color={glyph}
      />
    </View>
  );
};

export default IconBox;
