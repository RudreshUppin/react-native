/**
 * Atom: Button
 *
 * A pure, dumb button control. No business logic.
 * Variants: primary (default), secondary, destructive.
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, layout, typographyStyles } from '../tokens/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  testID,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        styles[variant],
        isDisabled && styles.disabled,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled }}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.textInverse : colors.primary}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.label,
            variant !== 'primary' && styles.labelAlt,
            isDisabled && styles.labelDisabled,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: layout.inputHeight,
    borderRadius: layout.borderRadius,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  destructive: {
    backgroundColor: colors.error,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    ...typographyStyles.buttonLabel,
    color: colors.textInverse,
  },
  labelAlt: {
    color: colors.primary,
  },
  labelDisabled: {},
});
