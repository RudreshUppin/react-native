/**
 * Atom: Checkbox
 *
 * A pure, dumb checkbox control. No knowledge of any business domain.
 * Renders a custom checkbox (native CheckBox is Android-only).
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, spacing, typographyStyles } from '../tokens/theme';

export interface CheckboxProps {
  value: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  label?: string;
  hasError?: boolean;
  testID?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  value,
  onChange,
  onBlur,
  label,
  hasError = false,
  testID,
}) => {
  const handlePress = () => {
    onChange(!value);
    onBlur?.();
  };

  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={0.7}
      onPress={handlePress}
      style={styles.container}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value }}
      accessibilityLabel={label}
    >
      <View
        style={[
          styles.box,
          value && styles.boxChecked,
          hasError && !value && styles.boxError,
        ]}
      >
        {value && <Text style={styles.checkmark}>✓</Text>}
      </View>
      {label ? (
        <Text style={[styles.label, hasError && styles.labelError]}>
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.checkboxUnchecked,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1, // optical alignment with text
  },
  boxChecked: {
    backgroundColor: colors.checkboxChecked,
    borderColor: colors.checkboxChecked,
  },
  boxError: {
    borderColor: colors.error,
  },
  checkmark: {
    color: colors.textInverse,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 16,
  },
  label: {
    flex: 1,
    ...typographyStyles.inputText,
    color: colors.textSecondary,
  },
  labelError: {
    color: colors.error,
  },
});
