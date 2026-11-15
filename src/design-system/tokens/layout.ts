/**
 * Design System — Layout Tokens
 *
 * BREAKPOINT: the window width in points at which the layout
 * switches from single-column (compact / iPhone) to two-column
 * (regular / iPad or wide window).
 */

export const BREAKPOINT = 744; // pt — matches iPad mini portrait

export const layout = {
  /** Width at which we switch from 1-col to 2-col */
  breakpoint: BREAKPOINT,

  /** Corner radius for input controls */
  borderRadius: 10,

  /** Height of a standard single-line input */
  inputHeight: 44,

  /** Height of a textarea control */
  textareaHeight: 100,

  /** Maximum form width on regular-width layout */
  formMaxWidth: 720,

  /** Horizontal screen padding (compact) */
  screenPaddingHorizontal: 16,

  /** Vertical screen padding */
  screenPaddingVertical: 24,

  /** Gap between field columns (regular layout) */
  columnGap: 16,

  /** Gap between fields vertically */
  fieldGap: 16,
} as const;
