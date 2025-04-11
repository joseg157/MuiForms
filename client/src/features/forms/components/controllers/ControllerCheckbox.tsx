import { useEffect } from 'react';
import { useController, FieldValues, FieldPath } from 'react-hook-form';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ControllerCheckboxProps } from '../../types/controller.types';
import { useFormContext } from '../../hooks';
import {
  getUsedControllerProps,
  getComponentPropsWithoutControllerProps,
} from '../../helpers/controller.helper';

function ControllerCheckbox<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  name,
  slotProps,
  customSlotProps,
  ...rest
}: ControllerCheckboxProps<TFieldValues, TName>) {
  if (!name) {
    throw new Error('The name prop is required');
  }

  const { control, clearErrors, readOnly } = useFormContext<TFieldValues>();

  const {
    field: { ref, disabled, value, ...fields },
  } = useController({
    ...getUsedControllerProps({ control, name, ...rest }),
  });

  useEffect(() => {
    if (disabled) {
      clearErrors(name);
    }
  }, [disabled, clearErrors, name]);

  if (!label) {
    return (
      <Checkbox
        {...fields}
        value={value}
        checked={!!value}
        slotProps={{
          ...slotProps,
          input: {
            ref,
            ...slotProps?.input,
          },
        }}
        {...getComponentPropsWithoutControllerProps(rest)}
      />
    );
  }

  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          {...fields}
          value={value}
          checked={!!value}
          slotProps={{
            ...slotProps,
            input: {
              ref,
              readOnly,
              ...slotProps?.input,
            },
          }}
          {...getComponentPropsWithoutControllerProps(rest)}
        />
      }
      {...customSlotProps?.formControlLabel}
    />
  );
}

export { ControllerCheckbox };
