import { useEffect } from 'react';
import { useController, FieldValues, FieldPath } from 'react-hook-form';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { ControllerAutocompleteProps } from '../../types/controller.types';
import { useFormContext } from '../../hooks';
import {
  getUsedControllerProps,
  getComponentPropsWithoutControllerProps,
} from '../../helpers/controller.helper';

function ControllerAutocomplete<
  Value,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
  ChipComponent extends React.ElementType = 'div',
>({
  name,
  options = [],
  label,
  ...rest
}: ControllerAutocompleteProps<
  Value,
  TFieldValues,
  TName,
  Multiple,
  DisableClearable,
  FreeSolo,
  ChipComponent
>) {
  if (!name) {
    throw new Error('The name prop is required');
  }

  const { control, clearErrors } = useFormContext<TFieldValues>();

  const {
    field: { ref, onChange, disabled, ...fields },
    fieldState: { error },
  } = useController({
    ...getUsedControllerProps({ control, name, ...rest }),
  });

  useEffect(() => {
    if (disabled) {
      clearErrors(name);
    }
  }, [clearErrors, name, disabled]);

  return (
    <Autocomplete
      {...fields}
      options={options}
      onChange={(_, newValue) => onChange(newValue)}
      {...getComponentPropsWithoutControllerProps(rest)}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={ref}
          label={label}
          error={!!error}
          helperText={error?.message}
          disabled={disabled}
        />
      )}
    />
  );
}

export { ControllerAutocomplete };
