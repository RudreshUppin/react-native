/**
 * Atom: TextInput
 *
 * A pure, dumb text input control. Has zero knowledge of any feature or
 * business domain. Receives value and events; renders itself; that's it.
 *
 * Used for: type="text" | type="email" | type="phone" | type="textarea"
 */

import React from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { colors, spacing, layout, typographyStyles } from '../tokens/theme';

export interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: RNTextInputProps['keyboardType'];
  autoCapitalize?: RNTextInputProps['autoCapitalize'];
  autoCorrect?: boolean;
  hasError?: boolean;
  editable?: boolean;
  maxLength?: number;
  testID?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  onBlur,
  onFocus,
  placeholder,
  multiline = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = false,
  hasError = false,
  editable = true,
  maxLength,
  testID,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <RNTextInput
      testID={testID}
      value={value}
      onChangeText={onChangeText}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      placeholderTextColor={colors.placeholder}
      multiline={multiline}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      editable={editable}
      maxLength={maxLength}
      style={[
        styles.input,
        multiline && styles.multiline,
        isFocused && styles.focused,
        hasError && styles.error,
        !editable && styles.disabled,
      ]}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: layout.inputHeight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.borderRadius,
    ...typographyStyles.inputText,
  },
  multiline: {
    height: layout.textareaHeight,
    paddingTop: spacing.sm,
  },
  focused: {
    borderColor: colors.borderFocus,
    borderWidth: 2,
  },
  error: {
    borderColor: colors.error,
    borderWidth: 1.5,
    backgroundColor: colors.errorLight,
  },
  disabled: {
    backgroundColor: colors.background,
    color: colors.textDisabled,
  },
});
