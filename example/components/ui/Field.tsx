import React from 'react';
import {TextInput, View, type KeyboardTypeOptions} from 'react-native';
import useTheme from '../../theme/useTheme';
import AppText from './AppText';

interface FieldProps {
  /** Uppercase 11/600 letter-spaced label. */
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
}

/** Form field: label 11/600 uppercase textTertiary → value 14.5 input, 12/14 padding. */
const Field = ({
  label,
  value,
  onChangeText,
  placeholder,
  editable = true,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
}: FieldProps) => {
  const {colors} = useTheme();

  return (
    <View style={{paddingHorizontal: 14, paddingVertical: 10}}>
      <AppText
        variant="sectionLabel"
        tone="tertiary"
        style={{letterSpacing: 0.4}}>
        {label}
      </AppText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        editable={editable}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        accessibilityLabel={label}
        style={{
          marginTop: 4,
          fontSize: 14.5,
          fontWeight: '400',
          color: editable ? colors.textPrimary : colors.textTertiary,
          padding: 0,
        }}
      />
    </View>
  );
};

export default Field;
