import React, {Children, isValidElement, type ReactNode} from 'react';
import {View, type StyleProp, type ViewStyle} from 'react-native';
import useTheme from '../../theme/useTheme';
import {elevation, radius} from '../../theme/tokens';

interface CardProps {
  children: ReactNode;
  /** Insert hairline separators between children (list-style cards). */
  separated?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Card surface: `card` bg, 1pt `border`, radius 16, subtle elevation. */
const Card = ({children, separated = true, style}: CardProps) => {
  const {colors} = useTheme();
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: radius.card,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOpacity: elevation.card.opacity,
          shadowRadius: elevation.card.radius,
          shadowOffset: {width: 0, height: elevation.card.offsetY},
          elevation: 1,
        },
        style,
      ]}>
      {items.map((child, index) => (
        <React.Fragment key={index}>
          {separated && index > 0 ? (
            <View style={{height: 1, backgroundColor: colors.hairline}} />
          ) : null}
          {child}
        </React.Fragment>
      ))}
    </View>
  );
};

export default Card;
