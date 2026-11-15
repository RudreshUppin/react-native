/**
 * Molecule: FormField
 *
 * Renders the field label (with * if required), the mapped Atom control,
 * an optional hint string, and the red validation error string directly
 * underneath without clipping.
 *
 * This molecule does NOT know what a "lead" is. It receives:
 *   - label: human-readable field label
 *   - hint: optional helper text
 *   - error: current error string (empty = no error)
 *   - required: whether to show the * marker
 *   - children: the atom control (TextInput | Select | Checkbox)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, layout, typographyStyles } from '../tokens/theme';

export interface FormFieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  /** Used for two-column layout: 'full' | 'half' */
  columnSpan?: 'full' | 'half';
  isWide?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  hint,
  error,
  required = false,
  children,
  columnSpan = 'full',
  isWide = false,
}) => {
  const hasError = Boolean(error);

  return (
    <View
      style={[
        styles.container,
        isWide && columnSpan === 'half' && styles.halfWidth,
        isWide && columnSpan === 'full' && styles.fullWidth,
      ]}
    >
      {/* Label row */}
      {label ? (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}> *</Text>}
        </View>
      ) : null}

      {/* Hint (shown above control if present) */}
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}

      {/* The atom control (TextInput | Select | Checkbox) */}
      {children}

      {/* Error message — renders without clipping */}
      {hasError ? (
        <Text style={styles.errorText} accessibilityLiveRegion="polite">
          ⚠ {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
    marginBottom: layout.fieldGap,
    // Default: full width (compact layout)
    width: '100%',
  },
  halfWidth: {
    // On wide layout, half-width fields share a row
    flex: 1,
    minWidth: 0,
  },
  fullWidth: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...typographyStyles.label,
  },
  required: {
    ...typographyStyles.label,
    color: colors.error,
  },
  hint: {
    ...typographyStyles.hint,
  },
  errorText: {
    ...typographyStyles.error,
    marginTop: spacing.xxs,
  },
});
