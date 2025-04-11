import { useEffect, forwardRef } from 'react';
import { useController, FieldValues, FieldPath } from 'react-hook-form';
import { NumericFormat, PatternFormat } from 'react-number-format';

import TextField from '@mui/material/TextField';

import {
  ControllerTextFieldProps,
  CustomNumberFormatProps,
  FormatType,
} from '../../types/controller.types';
import { useFormContext } from '../../hooks';
import {
  getUsedControllerProps,
  getComponentPropsWithoutControllerProps,
} from '../../helpers/controller.helper';

const createNumberFormat = (
  formatConfig: {
    format?: string;
    mask?: string;
    thousandSeparator?: string;
    allowEmptyFormatting?: boolean;
  } = {},
) => {
  return forwardRef<HTMLInputElement, CustomNumberFormatProps>(
    function NumberFormat(props, ref) {
      const { onChange, name, ...other } = props;

      const handleValueChange = (value: { value: string }) => {
        onChange({ target: { value: value?.value, name } });
      };

      const Component = formatConfig.format ? PatternFormat : NumericFormat;

      return (
        <Component
          {...other}
          {...formatConfig}
          format={formatConfig.format ?? ''}
          getInputRef={ref}
          onValueChange={handleValueChange}
        />
      );
    },
  );
};

const formatComponents = {
  number: createNumberFormat(),
  numWithCommas: createNumberFormat({
    thousandSeparator: ',',
  }),
  phone: createNumberFormat({
    format: '(###) ###-####',
    mask: '_',
  }),
  socialSecurity: createNumberFormat({
    format: '### ## ####',
    mask: '_',
  }),

  zipCode: createNumberFormat({
    format: '#####',
    mask: '_',
  }),
};

const getInputComponent = (format?: FormatType) =>
  format ? formatComponents?.[format] : undefined;

function ControllerTextField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  slotProps,
  formatType,
  ...rest
}: ControllerTextFieldProps<TFieldValues, TName>) {
  if (!name) {
    throw new Error('The name prop is required');
  }

  const { control, clearErrors, readOnly } = useFormContext<TFieldValues>();

  const {
    field: { ref, disabled, ...fields },
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
    <TextField
      {...fields}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      disabled={disabled}
      slotProps={{
        ...slotProps,
        input: {
          readOnly,
          ...slotProps?.input,
          inputComponent: getInputComponent(formatType),
        },
      }}
      {...getComponentPropsWithoutControllerProps(rest)}
    />
  );
}

export { ControllerTextField };
