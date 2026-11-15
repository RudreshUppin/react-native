/**
 * Types for the config-driven form system.
 *
 * These types live in the design system because DynamicForm uses them.
 * They contain NO lead-specific knowledge — just the shape of a field config.
 */

export type FieldType = 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox';

/** A single validation rule, e.g. 'required', 'email', 'phone10', 'maxLength:200' */
export type ValidationRule = string;

/** Condition that controls field visibility */
export interface VisibleWhenCondition {
  /** Name of the field whose value is checked */
  field: string;
  /** The value that makes this field visible */
  equals: string;
}

/** One entry in the form config array */
export interface FieldConfig {
  /** Unique field identifier — used as the key in form values/errors */
  name: string;

  /** Which atom to render */
  type: FieldType;

  /** Human-readable label shown above the field */
  label: string;

  /** Optional helper text shown below the label */
  hint?: string;

  /** Options for type="select" */
  options?: Array<{ label: string; value: string }>;

  /** Validation rules: e.g. ['required', 'email', 'maxLength:200'] */
  validations: ValidationRule[];

  /**
   * If set, the field is only shown (and validated) when this condition is met.
   * Company name uses: { field: 'leadType', equals: 'Company' }
   */
  visibleWhen?: VisibleWhenCondition;

  /**
   * Column span on wide (2-col) layout.
   * 'half' = shares a row with another half field.
   * 'full' = spans both columns.
   * Default: 'half'
   */
  columnSpan?: 'full' | 'half';

  /** Keyboard type hint for text inputs */
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';

  /** Auto-capitalize hint */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';

  /** Max character length (for textarea / text) */
  maxLength?: number;
}

/** The shape of form values: field name → string | boolean */
export type FormValues = Record<string, string | boolean>;

/** The shape of form errors: field name → error message string */
export type FormErrors = Record<string, string>;
