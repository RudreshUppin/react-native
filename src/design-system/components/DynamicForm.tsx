/**
 * DynamicForm
 *
 * The heart of the config-driven form system.
 *
 * Responsibilities:
 *  - Accepts a `config` array and renders one <FormField> per visible entry.
 *  - Maps field `type` → the correct atom component.
 *  - Implements the compact (1-col) vs regular (2-col) responsive layout.
 *  - Passes value, error, onChange, onBlur down to each FormField/atom.
 *  - Has ZERO knowledge of leads, validation rules, or any domain logic.
 *
 * Responsive layout rules (from spec):
 *  Compact  (width < REGULAR_WIDTH_BREAKPOINT): 1 column, all fields full-width.
 *  Regular  (width ≥ REGULAR_WIDTH_BREAKPOINT): 2 columns. Fields with
 *            columnSpan='full' span both columns; 'half' fields share a row.
 */

import React from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { FormField } from '../molecules/FormField';
import { TextInput } from '../atoms/TextInput';
import { Select } from '../atoms/Select';
import { Checkbox } from '../atoms/Checkbox';
import { REGULAR_WIDTH_BREAKPOINT, layout } from '../tokens/theme';
import { FieldConfig, FormValues, FormErrors } from '../types/formTypes';

export interface DynamicFormProps {
  config: FieldConfig[];
  values: FormValues;
  errors: FormErrors;
  onChange: (name: string, value: string | boolean) => void;
  onBlur: (name: string) => void;
}

/** Determines if a field should be rendered given current form values */
function isFieldVisible(field: FieldConfig, values: FormValues): boolean {
  if (!field.visibleWhen) return true;
  return values[field.visibleWhen.field] === field.visibleWhen.equals;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  config,
  values,
  errors,
  onChange,
  onBlur,
}) => {
  const { width } = useWindowDimensions();
  const isWide = width >= REGULAR_WIDTH_BREAKPOINT;

  const visibleFields = config.filter(field => isFieldVisible(field, values));

  if (!isWide) {
    // ── COMPACT LAYOUT: simple vertical stack, all fields full-width ──
    return (
      <View style={styles.compactContainer}>
        {visibleFields.map(field =>
          renderField(field, values, errors, onChange, onBlur, false),
        )}
      </View>
    );
  }

  // ── REGULAR LAYOUT: 2-column grid with row grouping ──
  const rows = buildRows(visibleFields);

  return (
    <View style={styles.wideContainer}>
      {rows.map((row, _rowIndex) => {
        if (row.length === 1 && row[0].columnSpan === 'full') {
          return (
            <View key={row[0].name} style={styles.fullWidthRow}>
              {renderField(row[0], values, errors, onChange, onBlur, true)}
            </View>
          );
        }
        return (
          <View key={row.map(f => f.name).join('-')} style={styles.halfRow}>
            {row.map(field =>
              renderField(field, values, errors, onChange, onBlur, true),
            )}
          </View>
        );
      })}
    </View>
  );
};

/**
 * Renders a single FormField molecule with the correct atom inside.
 */
function renderField(
  field: FieldConfig,
  values: FormValues,
  errors: FormErrors,
  onChange: (name: string, value: string | boolean) => void,
  onBlur: (name: string) => void,
  isWide: boolean,
): React.ReactNode {
  const value = values[field.name];
  const error = errors[field.name] ?? '';
  const hasError = error.length > 0;

  const handleChange = (val: string | boolean) => onChange(field.name, val);
  const handleBlur = () => onBlur(field.name);

  let control: React.ReactNode;

  switch (field.type) {
    case 'text':
    case 'email':
    case 'phone':
      control = (
        <TextInput
          value={value as string}
          onChangeText={handleChange as (t: string) => void}
          onBlur={handleBlur}
          keyboardType={field.keyboardType ?? 'default'}
          autoCapitalize={field.autoCapitalize ?? 'sentences'}
          autoCorrect={false}
          hasError={hasError}
          maxLength={field.maxLength}
          testID={`input-${field.name}`}
        />
      );
      break;

    case 'textarea':
      control = (
        <TextInput
          value={value as string}
          onChangeText={handleChange as (t: string) => void}
          onBlur={handleBlur}
          multiline
          autoCapitalize={field.autoCapitalize ?? 'sentences'}
          hasError={hasError}
          maxLength={field.maxLength}
          testID={`input-${field.name}`}
        />
      );
      break;

    case 'select':
      control = (
        <Select
          value={value as string}
          options={field.options ?? []}
          onChange={handleChange as (v: string) => void}
          onBlur={handleBlur}
          hasError={hasError}
          placeholder={`Select ${field.label}`}
          testID={`select-${field.name}`}
        />
      );
      break;

    case 'checkbox':
      control = (
        <Checkbox
          value={value as boolean}
          onChange={handleChange as (v: boolean) => void}
          onBlur={handleBlur}
          label={field.label}
          hasError={hasError}
          testID={`checkbox-${field.name}`}
        />
      );
      break;

    default:
      control = null;
  }

  // Checkbox: label is rendered inside the atom itself
  const fieldLabel = field.type === 'checkbox' ? '' : field.label;
  const isRequired = field.validations.some(v => v === 'required');
  const colSpan = field.columnSpan ?? 'half';

  return (
    <FormField
      key={field.name}
      label={fieldLabel}
      hint={field.hint}
      error={error}
      required={isRequired && field.type !== 'checkbox'}
      columnSpan={colSpan}
      isWide={isWide}
    >
      {control}
    </FormField>
  );
}

/**
 * Groups visible fields into rows for the 2-column layout.
 * Consecutive 'half' fields are grouped into pairs (max 2 per row).
 * 'full' fields always get their own row.
 */
function buildRows(fields: FieldConfig[]): FieldConfig[][] {
  const rows: FieldConfig[][] = [];
  let i = 0;

  while (i < fields.length) {
    const field = fields[i];
    const colSpan = field.columnSpan ?? 'half';

    if (colSpan === 'full') {
      rows.push([field]);
      i++;
    } else {
      const next = fields[i + 1];
      const nextSpan = next ? (next.columnSpan ?? 'half') : 'full';

      if (next && nextSpan === 'half') {
        rows.push([field, next]);
        i += 2;
      } else {
        rows.push([field]);
        i++;
      }
    }
  }

  return rows;
}

const styles = StyleSheet.create({
  compactContainer: {},
  wideContainer: {},
  fullWidthRow: {
    width: '100%',
  },
  halfRow: {
    flexDirection: 'row',
    gap: layout.columnGap,
    width: '100%',
  },
});
