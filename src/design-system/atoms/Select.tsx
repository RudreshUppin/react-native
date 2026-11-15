/**
 * Atom: Select
 *
 * A pure, dumb select/picker control built without any third-party UI kit.
 * On iOS, tapping opens an ActionSheet-style modal overlay with options.
 *
 * Zero knowledge of any feature or business domain.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { colors, spacing, layout, typographyStyles, fontSizes } from '../tokens/theme';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  hasError?: boolean;
  testID?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  options,
  onChange,
  onBlur,
  placeholder = 'Select an option',
  hasError = false,
  testID,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find(o => o.value === value)?.label;

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    onBlur?.();
  };

  const handleClose = () => {
    setIsOpen(false);
    onBlur?.();
  };

  return (
    <>
      <TouchableOpacity
        testID={testID}
        activeOpacity={0.7}
        onPress={() => setIsOpen(true)}
        style={[
          styles.trigger,
          hasError && styles.error,
          isOpen && styles.focused,
        ]}
        accessibilityRole="combobox"
        accessibilityLabel={selectedLabel ?? placeholder}
        accessibilityState={{ expanded: isOpen }}
      >
        <Text
          style={[
            styles.triggerText,
            !selectedLabel && styles.placeholderText,
          ]}
          numberOfLines={1}
        >
          {selectedLabel ?? placeholder}
        </Text>
        <Text style={styles.chevron}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <Pressable style={styles.backdrop} onPress={handleClose}>
          <SafeAreaView style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Select an option</Text>
              <TouchableOpacity onPress={handleClose} hitSlop={8}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <TouchableOpacity
                    style={[styles.option, isSelected && styles.optionSelected]}
                    onPress={() => handleSelect(item.value)}
                    accessibilityRole="menuitem"
                    accessibilityState={{ selected: isSelected }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {isSelected && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={ItemSeparator}
            />
          </SafeAreaView>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: {
    height: layout.inputHeight,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  focused: {
    borderColor: colors.borderFocus,
    borderWidth: 2,
  },
  error: {
    borderColor: colors.error,
    borderWidth: 1.5,
    backgroundColor: colors.errorLight,
  },
  triggerText: {
    ...typographyStyles.inputText,
    flex: 1,
  },
  placeholderText: {
    color: colors.placeholder,
  },
  chevron: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '50%',
    paddingBottom: spacing.lg,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  sheetTitle: {
    ...typographyStyles.subheading,
    fontSize: fontSizes.md,
  },
  closeButton: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    padding: spacing.xs,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  optionSelected: {
    backgroundColor: colors.background,
  },
  optionText: {
    ...typographyStyles.inputText,
    flex: 1,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  checkmark: {
    color: colors.primary,
    fontSize: fontSizes.md,
    fontWeight: '700',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
