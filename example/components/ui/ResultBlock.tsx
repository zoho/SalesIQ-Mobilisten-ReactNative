import React, {useMemo} from 'react';
import {View} from 'react-native';
import useTheme from '../../theme/useTheme';
import {radius} from '../../theme/tokens';
import AppText from './AppText';

interface ResultBlockProps {
  /** Any JSON-serializable value, or a preformatted string. */
  data: unknown;
  /** Optional label rendered above the block (e.g. "Last result"). */
  label?: string;
}

/** Renders `key: value` pairs with keys tinted primary and string values tinted secondary-green. */
const renderLine = (
  line: string,
  index: number,
  keyColor: string,
  stringColor: string,
) => {
  const match = line.match(/^(\s*)("[^"]+")(:\s*)(.*)$/);
  if (!match) {
    return (
      <AppText key={index} variant="mono" tone="secondary">
        {line}
        {'\n'}
      </AppText>
    );
  }
  const [, indent, key, colon, rest] = match;
  const isStringValue = /^".*"[,]?$/.test(rest);
  return (
    <AppText key={index} variant="mono" tone="secondary">
      {indent}
      <AppText variant="mono" style={{color: keyColor}}>
        {key}
      </AppText>
      {colon}
      <AppText
        variant="mono"
        style={{color: isStringValue ? stringColor : undefined}}>
        {rest}
      </AppText>
      {'\n'}
    </AppText>
  );
};

/** `ResultBlock`: mono 12, resultBlockBg surface, radius 12, selectable output for API results. */
const ResultBlock = ({data, label}: ResultBlockProps) => {
  const {colors} = useTheme();

  const text = useMemo(() => {
    if (typeof data === 'string') {
      return data;
    }
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  }, [data]);

  const lines = useMemo(() => text.split('\n'), [text]);

  return (
    <View style={{gap: 6}}>
      {label ? (
        <AppText
          variant="sectionLabel"
          tone="tertiary"
          style={{paddingHorizontal: 6}}>
          {label}
        </AppText>
      ) : null}
      <View
        style={{
          backgroundColor: colors.resultBlockBg,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: radius.control,
          paddingVertical: 11,
          paddingHorizontal: 13,
        }}>
        <AppText selectable variant="mono" tone="secondary">
          {lines.map((line, index) =>
            renderLine(line, index, colors.primary, colors.secondary),
          )}
        </AppText>
      </View>
    </View>
  );
};

export default ResultBlock;
