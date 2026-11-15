/**
 * Design System — theme.ts
 *
 * Single source of truth for all design tokens:
 *   colors, spacing, typography, layout constants.
 *
 * REGULAR_WIDTH_BREAKPOINT: the window width (in points) at which the
 * layout switches from 1-column (compact/iPhone) to 2-column (regular/iPad).
 */

import { StyleSheet } from 'react-native';

// ─── Breakpoint ──────────────────────────────────────────────────────────────

export const REGULAR_WIDTH_BREAKPOINT = 768;

// ─── Colors ──────────────────────────────────────────────────────────────────

export const colors = {
  // Brand
  primary: '#007AFF',
  primaryDark: '#0056CC',

  // Semantic
  error: '#FF3B30',
  errorLight: '#FFF0EF',
  success: '#34C759',

  // Neutral
  background: '#F2F2F7',
  surface: '#FFFFFF',
  border: '#C7C7CC',
  borderFocus: '#007AFF',
  placeholder: '#8E8E93',

  // Text
  textPrimary: '#1C1C1E',
  textSecondary: '#6C6C70',
  textDisabled: '#AEAEB2',
  textInverse: '#FFFFFF',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.4)',

  // Checkbox
  checkboxChecked: '#007AFF',
  checkboxUnchecked: '#C7C7CC',
} as const;

export type ColorKey = keyof typeof colors;

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export type SpacingKey = keyof typeof spacing;

// ─── Typography ──────────────────────────────────────────────────────────────

export const fontSizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
} as const;

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const typographyStyles = StyleSheet.create({
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.textPrimary,
    letterSpacing: 0.1,
  },
  hint: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    color: colors.textSecondary,
  },
  error: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    color: colors.error,
  },
  inputText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    color: colors.textPrimary,
  },
  buttonLabel: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.textInverse,
  },
  heading: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  subheading: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
});

// ─── Layout ──────────────────────────────────────────────────────────────────

export const layout = {
  /** Width at which we switch from 1-col to 2-col */
  breakpoint: REGULAR_WIDTH_BREAKPOINT,

  /** Corner radius for input controls */
  borderRadius: 10,

  /** Height of a standard single-line input */
  inputHeight: 44,

  /** Height of a textarea control */
  textareaHeight: 100,

  /** Maximum form width on regular-width layout */
  formMaxWidth: 720,

  /** Horizontal screen padding */
  screenPaddingHorizontal: 16,

  /** Vertical screen padding */
  screenPaddingVertical: 24,

  /** Gap between field columns (regular layout) */
  columnGap: 16,

  /** Gap between fields vertically */
  fieldGap: 16,
} as const;
