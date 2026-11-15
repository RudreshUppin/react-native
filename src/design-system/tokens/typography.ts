/**
 * Design System — Typography Tokens
 */

import { StyleSheet } from 'react-native';
import { colors } from './colors';

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

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
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
