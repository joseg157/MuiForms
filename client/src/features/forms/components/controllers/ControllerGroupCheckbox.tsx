import { useEffect } from 'react';
import { useController, FieldValues, FieldPath } from 'react-hook-form';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from '@mui/material';

import { ControllerGroupCheckboxProps } from '../../types/controller.types';
import { useFormContext } from '../../hooks';
import { getUsedControllerProps } from '../../helpers/controller.helper';

function ControllerGroupCheckbox<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  options,
  helperText,
  label,
  slotProps,
  ...rest
}: ControllerGroupCheckboxProps<TFieldValues, TName>) {
  if (!Array.isArray(options)) {
    throw new Error('options prop must be an array');
  }

  if (!name) {
    throw new Error('The name prop is required');
  }

  const { control, clearErrors, readOnly } = useFormContext<TFieldValues>();

  const {
    field: { ref, disabled, value, onChange, ...fields },
    fieldState: { error },
  } = useController({
    ...getUsedControllerProps({ control, name, ...rest }),
  });

  useEffect(() => {
    if (disabled) {
      clearErrors(name);
    }
  }, [disabled, clearErrors, name]);

  const onSelect = (newValue: unknown, checked: boolean) => {
    if (Array.isArray(value)) {
      const newControlValue = checked
        ? [...value, newValue]
        : value.filter((v: unknown) => v !== newValue);

      onChange(newControlValue);

      return;
    }

    onChange(checked ? newValue : null);
  };

  const isSelected = (optionValue: unknown) => {
    if (!Array.isArray(value)) {
      return typeof value === typeof optionValue && value === optionValue;
    }

    return value.includes(optionValue);
  };

  return (
    <FormControl
      fullWidth
      disabled={disabled}
      error={!!error}
      {...slotProps?.formControl}
    >
      {label && <FormLabel {...slotProps?.formLabel}>{label}</FormLabel>}

      <FormGroup row {...slotProps?.formGroup}>
        {options.map((option) => (
          <FormControlLabel
            key={option?.value ? String(option.value) : option?.label}
            label={option.label}
            control={
              <Checkbox
                {...fields}
                value={option.value}
                checked={isSelected(option.value)}
                onChange={(_, checked) => onSelect(option.value, checked)}
                slotProps={{
                  ...option?.slotProps,
                  input: {
                    ref,
                    readOnly,
                    ...option?.slotProps?.input,
                  },
                }}
              />
            }
          />
        ))}
      </FormGroup>

      {(helperText || error?.message) && (
        <FormHelperText {...slotProps?.formHelperText}>
          {error?.message || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export { ControllerGroupCheckbox };
