/**
 * Lead Feature — SuccessScreen
 *
 * Shown after a valid submission. Displays all submitted values as a
 * clean summary card on screen and offers a "Submit Another Lead" button
 * that resets the form.
 *
 * Knows about leadConfig to render human-readable field labels.
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import { Button } from '../../design-system/atoms/Button';
import {
  colors,
  spacing,
  typographyStyles,
  fontSizes,
  layout,
  REGULAR_WIDTH_BREAKPOINT,
} from '../../design-system/tokens/theme';
import { FormValues } from '../../design-system/types/formTypes';
import { leadConfig } from './leadConfig';

interface SuccessScreenProps {
  values: FormValues;
  onReset: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  values,
  onReset,
}) => {
  const { width } = useWindowDimensions();
  const isWide = width >= REGULAR_WIDTH_BREAKPOINT;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          isWide && styles.scrollWide,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Success header */}
        <View style={styles.header}>
          <Text style={styles.checkIcon}>✅</Text>
          <Text style={styles.heading}>Lead Captured!</Text>
          <Text style={styles.subheading}>
            Here's a summary of the submitted information.
          </Text>
        </View>

        {/* Summary card */}
        <View style={styles.card}>
          {leadConfig.map(field => {
            // Skip hidden fields
            if (field.visibleWhen) {
              const parentValue = values[field.visibleWhen.field];
              if (parentValue !== field.visibleWhen.equals) return null;
            }

            const raw = values[field.name];
            let displayValue: string;

            if (field.type === 'checkbox') {
              displayValue = raw ? 'Yes' : 'No';
            } else if (field.type === 'select') {
              const opt = field.options?.find(o => o.value === raw);
              displayValue = opt?.label ?? (raw as string) ?? '—';
            } else {
              displayValue = (raw as string) || '—';
            }

            return (
              <View key={field.name} style={styles.row}>
                <Text style={styles.rowLabel}>{field.label}</Text>
                <Text style={styles.rowValue}>{displayValue}</Text>
              </View>
            );
          })}
        </View>

        {/* Reset button */}
        <Button
          label="Submit Another Lead"
          onPress={onReset}
          testID="btn-reset"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
    padding: layout.screenPaddingHorizontal,
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },
  scrollWide: {
    maxWidth: layout.formMaxWidth,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  checkIcon: {
    fontSize: 48,
  },
  heading: {
    ...typographyStyles.heading,
    textAlign: 'center',
  },
  subheading: {
    ...typographyStyles.hint,
    textAlign: 'center',
    fontSize: fontSizes.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius,
    padding: spacing.md,
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  rowLabel: {
    ...typographyStyles.label,
    flex: 1,
    color: colors.textSecondary,
  },
  rowValue: {
    ...typographyStyles.inputText,
    flex: 2,
    textAlign: 'right',
    color: colors.textPrimary,
  },
});
