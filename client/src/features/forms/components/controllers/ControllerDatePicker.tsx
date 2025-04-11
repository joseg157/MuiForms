import { useEffect } from 'react';
import { useController, FieldValues, FieldPath } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

import { ControllerDatePickerProps } from '../../types/controller.types';
import { useFormContext } from '../../hooks';
import {
  getUsedControllerProps,
  getComponentPropsWithoutControllerProps,
} from '../../helpers/controller.helper';

function ControllerDatePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  slotProps,
  ...rest
}: ControllerDatePickerProps<TFieldValues, TName>) {
  if (!name) {
    throw new Error('The name prop is required');
  }

  const { control, clearErrors } = useFormContext<TFieldValues>();

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

  return (
    <DatePicker
      {...fields}
      value={value && moment(value).isValid() ? moment(value) : null}
      onChange={(date) => onChange(date ? date.toDate() : null)}
      inputRef={ref}
      slotProps={{
        ...slotProps,
        textField: {
          error: !!error,
          helperText: error?.message,
          ...slotProps?.textField,
        },
      }}
      {...getComponentPropsWithoutControllerProps(rest)}
    />
  );
}

export { ControllerDatePicker };
