/**
 * Lead Feature — Form Config
 *
 * This is the ONLY place where the lead form's field definitions live.
 * Adding a new field = adding one object here. Zero JSX changes needed.
 *
 * Rules embedded here:
 *  - columnSpan controls the 2-col layout behaviour.
 *  - visibleWhen controls conditional visibility (Company Name).
 *  - validations are strings that leadValidation.ts interprets.
 */

import { FieldConfig } from '../../design-system/types/formTypes';

export const leadConfig: FieldConfig[] = [
  {
    name: 'fullName',
    type: 'text',
    label: 'Full name',
    validations: ['required'],
    columnSpan: 'half',
    autoCapitalize: 'words',
    keyboardType: 'default',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    validations: ['required', 'email'],
    columnSpan: 'half',
    autoCapitalize: 'none',
    keyboardType: 'email-address',
  },
  {
    name: 'leadType',
    type: 'select',
    label: 'Lead type',
    options: [
      { label: 'Individual', value: 'Individual' },
      { label: 'Company', value: 'Company' },
    ],
    validations: ['required'],
    columnSpan: 'half',
  },
  {
    name: 'companyName',
    type: 'text',
    label: 'Company name',
    /**
     * Visible only when leadType === 'Company'.
     * Required only when visible (enforced in leadValidation.ts).
     */
    visibleWhen: { field: 'leadType', equals: 'Company' },
    validations: ['required'],
    columnSpan: 'half',
    autoCapitalize: 'words',
    keyboardType: 'default',
  },
  {
    name: 'phone',
    type: 'phone',
    label: 'Phone',
    validations: ['required', 'phone10'],
    columnSpan: 'half',
    keyboardType: 'phone-pad',
    autoCapitalize: 'none',
    maxLength: 10,
  },
  {
    name: 'notes',
    type: 'textarea',
    label: 'Notes',
    hint: 'Max 200 characters',
    validations: ['maxLength:200'],
    columnSpan: 'full',
    maxLength: 200,
  },
  {
    name: 'consent',
    type: 'checkbox',
    label: 'I agree to the terms and privacy policy',
    validations: ['required'],
    columnSpan: 'full',
  },
];
