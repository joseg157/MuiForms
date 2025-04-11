import { FieldValues, UseControllerProps, FieldPath } from 'react-hook-form';
import type {
  TextFieldProps,
  InputBaseComponentProps,
  CheckboxProps,
  AutocompleteProps,
  FormControlLabelProps,
  FormControlProps,
  FormLabelProps,
  FormGroupProps,
  FormHelperTextProps,
} from '@mui/material';
import { Moment } from 'moment';

import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';

/**
 * @description This type is used to define the format types for the TextField component on the input field.
 */
export type FormatType =
  | 'number'
  | 'numWithCommas'
  | 'phone'
  | 'socialSecurity'
  | 'zipCode'
  | undefined;

export type ControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<UseControllerProps<TFieldValues, TName>, 'control'>;

export interface ControllerTextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ControllerProps<TFieldValues, TName>,
    Omit<TextFieldProps, 'name' | 'value' | 'defaultValue'> {
  formatType?: FormatType;
}

/**
 * @description This interface is used to define the ALL props with controller props.
 * Will be used to extract or exclude the controller props from the component props.
 * @example
 * const { name, rules, shouldUnregister, defaultValue, control, disabled, ...rest } = props;
 * return rest; // rest can be used to pass the remaining props to the component.
 */

export interface GetUseControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  [key: string]: unknown;
}

/**
 * @description This type is used to define the format types for the TextField component on the input field.
 */

export type CustomNumberFormatProps = InputBaseComponentProps & {
  onChange: (event: { target: { value: string; name: string } }) => void;
  name: string;
};

export interface ControllerDatePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ControllerProps<TFieldValues, TName>,
    Omit<
      DatePickerProps<Moment>,
      'name' | 'value' | 'defaultValue' | 'onChange'
    > {}

export interface ControllerCheckboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ControllerProps<TFieldValues, TName>,
    Omit<CheckboxProps, 'name' | 'value' | 'defaultValue'> {
  label?: string;
  customSlotProps?: {
    formControlLabel?: FormControlLabelProps;
  };
}

export interface CheckboxOption extends CheckboxProps {
  label: string;
  value: unknown;
}

/**
 * Note: The value type is unknown because it can be a string, number, or boolean.
 * However, if the value is a array, then it will be a multi option checkbox.
 */
export interface ControllerGroupCheckboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ControllerProps<TFieldValues, TName> {
  options: CheckboxOption[];

  label?: string;
  /** Error message will take precedent over helperText */
  helperText?: string;

  slotProps?: {
    formControl?: FormControlProps;
    formLabel?: FormLabelProps;
    formGroup?: FormGroupProps;
    formHelperText?: FormHelperTextProps;
  };
}

export interface ControllerAutocompleteProps<
  Value,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
  ChipComponent extends React.ElementType = 'div',
> extends ControllerProps<TFieldValues, TName>,
    Omit<
      AutocompleteProps<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent
      >,
      'defaultValue' | 'renderInput'
    > {
  label?: string;
  customSlotProps?: {
    textField?: Omit<TextFieldProps, 'name' | 'value' | 'defaultValue'>;
  };
}
