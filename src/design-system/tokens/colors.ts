/**
 * Design System — Color Tokens
 * Single source of truth for every color used in the app.
 */

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
  borderFocused: '#007AFF',
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
