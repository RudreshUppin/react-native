/**
 * Lead Feature — useLeadForm hook
 *
 * Owns ALL form state: values, touched fields, errors, submission status.
 * Calls the pure validateForm / validateField functions — no logic here.
 *
 * Returns everything LeadCaptureScreen needs; the screen is a thin shell.
 */

import { useState, useCallback } from 'react';
import { leadConfig } from './leadConfig';
import { validateForm, validateField } from './leadValidation';
import { FormValues, FormErrors } from '../../design-system/types/formTypes';

/** Initial form values — every field starts empty / false */
function buildInitialValues(): FormValues {
  const values: FormValues = {};
  for (const field of leadConfig) {
    values[field.name] = field.type === 'checkbox' ? false : '';
  }
  return values;
}

export interface UseLeadFormReturn {
  values: FormValues;
  errors: FormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  handleChange: (name: string, value: string | boolean) => void;
  handleBlur: (name: string) => void;
  handleSubmit: () => void;
  handleReset: () => void;
}

export function useLeadForm(): UseLeadFormReturn {
  const [values, setValues] = useState<FormValues>(buildInitialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /** Called by DynamicForm onChange */
  const handleChange = useCallback(
    (name: string, value: string | boolean) => {
      setValues(prev => {
        const next = { ...prev, [name]: value };

        // If the field has been touched, re-validate it on change too
        if (touched[name]) {
          const fieldError = validateField(leadConfig, next, name);
          setErrors(prevErrors => ({
            ...prevErrors,
            [name]: fieldError,
          }));
        }

        // When leadType changes, clear companyName error if now hidden
        if (name === 'leadType') {
          setErrors(prevErrors => {
            const updated = { ...prevErrors };
            if (value !== 'Company') {
              delete updated.companyName;
            }
            return updated;
          });
        }

        return next;
      });
    },
    [touched],
  );

  /** Called by DynamicForm onBlur */
  const handleBlur = useCallback(
    (name: string) => {
      setTouched(prev => ({ ...prev, [name]: true }));

      setValues(currentValues => {
        const fieldError = validateField(leadConfig, currentValues, name);
        setErrors(prev => ({ ...prev, [name]: fieldError }));
        return currentValues; // unchanged
      });
    },
    [],
  );

  /** Called by the Submit button */
  const handleSubmit = useCallback(() => {
    // Run full validation
    const allErrors = validateForm(leadConfig, values);

    // Mark every visible field as touched so errors render
    const allTouched: Record<string, boolean> = {};
    for (const field of leadConfig) {
      allTouched[field.name] = true;
    }
    setTouched(allTouched);
    setErrors(allErrors);

    if (Object.keys(allErrors).length > 0) {
      // Invalid — block submission, errors are now visible
      return;
    }

    // Valid — "submit"
    setIsSubmitting(true);
    // Simulate a brief async delay (no real backend)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  }, [values]);

  /** Called by "Submit another" button on success screen */
  const handleReset = useCallback(() => {
    setValues(buildInitialValues());
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsSubmitted(false);
  }, []);

  return {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  };
}
