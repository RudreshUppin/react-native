/**
 * Lead Feature — LeadCaptureScreen
 *
 * The main screen. Thin shell: wires useLeadForm ↔ DynamicForm.
 *
 * Layout responsibilities owned HERE:
 *  - SafeAreaView (notch / home indicator)
 *  - KeyboardAvoidingView (keeps focused field above keyboard on compact)
 *  - ScrollView (scrollable content, keyboardShouldPersistTaps="handled")
 *  - Compact vs regular-width outer padding
 *  - Submit button placement (always reachable)
 *
 * Zero validation logic. Zero field definitions. Pure composition.
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import { DynamicForm } from '../../design-system/components/DynamicForm';
import { Button } from '../../design-system/atoms/Button';
import { colors, spacing, typographyStyles, layout, REGULAR_WIDTH_BREAKPOINT } from '../../design-system/tokens/theme';
import { leadConfig } from './leadConfig';
import { useLeadForm } from './useLeadForm';
import { SuccessScreen } from './SuccessScreen';

export const LeadCaptureScreen: React.FC = () => {
  const {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = useLeadForm();

  const { width } = useWindowDimensions();
  const isWide = width >= REGULAR_WIDTH_BREAKPOINT;

  // Show the success view after submission
  if (isSubmitted) {
    return <SuccessScreen values={values} onReset={handleReset} />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            isWide && styles.scrollContentWide,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Screen header */}
          <View style={styles.header}>
            <Text style={typographyStyles.heading}>Capture a Lead</Text>
            <Text style={[typographyStyles.hint, styles.headerSub]}>
              Fill in the details below. Fields marked * are required.
            </Text>
          </View>

          {/* Config-driven form — the ONLY place DynamicForm is used */}
          <DynamicForm
            config={leadConfig}
            values={values}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {/* Submit button — always at bottom, always reachable */}
          <View style={[styles.submitRow, isWide && styles.submitRowWide]}>
            <Button
              label={isSubmitting ? 'Submitting…' : 'Submit Lead'}
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={false} // allow tap to trigger full validation + error display
              testID="btn-submit"
            />
          </View>

          {/* Bottom spacer so content clears keyboard */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  kav: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: layout.screenPaddingVertical,
  },
  // On wide layouts: center and cap the form width
  scrollContentWide: {
    maxWidth: layout.formMaxWidth,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: spacing.xl,
  },
  header: {
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  headerSub: {
    marginTop: spacing.xs,
  },
  submitRow: {
    marginTop: spacing.md,
  },
  // On wide layout, right-align the submit button
  submitRowWide: {
    alignItems: 'flex-end',
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
