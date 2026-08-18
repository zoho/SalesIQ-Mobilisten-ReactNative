import React from 'react';
import {Pressable, View} from 'react-native';
import useTheme from '../../theme/useTheme';
import AppText from './AppText';

interface Segment<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  segments: ReadonlyArray<Segment<T>>;
  value: T;
  onChange: (value: T) => void;
  accessibilityLabel?: string;
}

/** Segmented control: track radius 12 pad 3, selected thumb radius 9 with subtle shadow. */
function SegmentedControl<T extends string>({
  segments,
  value,
  onChange,
  accessibilityLabel,
}: SegmentedControlProps<T>) {
  const {colors} = useTheme();

  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
      style={{
        flexDirection: 'row',
        backgroundColor: colors.segmentTrack,
        borderRadius: 12,
        padding: 3,
      }}>
      {segments.map(segment => {
        const selected = segment.value === value;
        return (
          <Pressable
            key={segment.value}
            onPress={() => onChange(segment.value)}
            accessibilityRole="tab"
            accessibilityState={{selected}}
            accessibilityLabel={segment.label}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 8,
              borderRadius: 9,
              backgroundColor: selected ? colors.segmentThumb : 'transparent',
              ...(selected
                ? {
                    shadowColor: '#000',
                    shadowOpacity: 0.14,
                    shadowRadius: 3,
                    shadowOffset: {width: 0, height: 1},
                    elevation: 1,
                  }
                : null),
            }}>
            <AppText
              variant="subhead"
              tone={selected ? 'primary' : 'secondary'}
              weight={selected ? '600' : '400'}
              style={{fontSize: 12.5, fontWeight: selected ? '600' : '500'}}>
              {segment.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

export default SegmentedControl;
