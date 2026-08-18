import React from 'react';
import {View} from 'react-native';
import useTheme from '../../theme/useTheme';

/** 1pt hairline separator. Cards already separate their own children — use this between free-standing blocks. */
const Divider = () => {
  const {colors} = useTheme();
  return <View style={{height: 1, backgroundColor: colors.hairline}} />;
};

export default Divider;
