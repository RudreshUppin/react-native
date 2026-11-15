/**
 * Lead Feature — Validation Rules
 *
 * A PURE FUNCTION: takes config + current values, returns errors.
 * No React. No side effects. Fully testable in plain Node.
 *
 * Rule strings defined in leadConfig.ts:
 *   'required'        — value must be non-empty / true
 *   'email'           — value must match a valid email pattern
 *   'phone10'         — value must be exactly 10 digits
 *   'maxLength:N'     — value must be ≤ N characters
 *
 * Hidden fields (visibleWhen not met) are skipped entirely.
 */

import { FieldConfig, FormValues, FormErrors } from '../../design-system/types/formTypes';

// ─── Individual rule handlers ────────────────────────────────────────────────

function applyRule(
  rule: string,
  value: string | boolean,
  _fieldName: string,
): string | null {
  // 'required'
  if (rule === 'required') {
    if (typeof value === 'boolean') {
      return value ? null : 'This field is required.';
    }
    const str = (value as string).trim();
    return str.length > 0 ? null : 'This field is required.';
  }

  // 'email'
  if (rule === 'email') {
    const str = (value as string).trim();
    if (str.length === 0) return null; // 'required' handles empty separately
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRe.test(str) ? null : 'Please enter a valid email address.';
  }

  // 'phone10'
  if (rule === 'phone10') {
    const str = (value as string).trim();
    if (str.length === 0) return null; // 'required' handles empty
    const digitsOnly = /^\d{10}$/;
    return digitsOnly.test(str) ? null : 'Phone must be exactly 10 digits.';
  }

  // 'maxLength:N'
  if (rule.startsWith('maxLength:')) {
    const max = parseInt(rule.split(':')[1], 10);
    const str = (value as string);
    return str.length <= max
      ? null
      : `Must be ${max} characters or fewer (currently ${str.length}).`;
  }

  // Unknown rule — ignore
  return null;
}

// ─── Visibility helper ───────────────────────────────────────────────────────

function isVisible(field: FieldConfig, values: FormValues): boolean {
  if (!field.visibleWhen) return true;
  return values[field.visibleWhen.field] === field.visibleWhen.equals;
}

// ─── Main validation functions ───────────────────────────────────────────────

/**
 * Validates all visible fields against their configured rules.
 * This is the spec-required function signature: validateForm(config, values).
 *
 * @param config  - The form config array (leadConfig)
 * @param values  - Current form values keyed by field name
 * @returns       - An object of { fieldName: errorMessage }.
 *                  Empty object = form is valid.
 */
export function validateForm(
  config: FieldConfig[],
  values: FormValues,
): FormErrors {
  const errors: FormErrors = {};

  for (const field of config) {
    // Skip hidden fields — they are neither shown nor validated
    if (!isVisible(field, values)) continue;

    const value = values[field.name] ?? (field.type === 'checkbox' ? false : '');

    for (const rule of field.validations) {
      const errorMsg = applyRule(rule, value, field.name);
      if (errorMsg !== null) {
        errors[field.name] = errorMsg;
        // Stop at the first failing rule per field (top-priority error)
        break;
      }
    }
  }

  return errors;
}

/**
 * Validates a single field.
 * This is the spec-required function signature: validateField(field, values).
 * Used for on-blur validation without re-validating the entire form.
 */
export function validateField(
  config: FieldConfig[],
  values: FormValues,
  fieldName: string,
): string {
  const field = config.find(f => f.name === fieldName);
  if (!field) return '';
  if (!isVisible(field, values)) return '';

  const value = values[fieldName] ?? (field.type === 'checkbox' ? false : '');

  for (const rule of field.validations) {
    const errorMsg = applyRule(rule, value, fieldName);
    if (errorMsg !== null) return errorMsg;
  }

  return '';
}

/**
 * Returns true when validateForm produces zero errors.
 */
export function isFormValid(
  config: FieldConfig[],
  values: FormValues,
): boolean {
  return Object.keys(validateForm(config, values)).length === 0;
}
