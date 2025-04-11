import { FieldPath, FieldValues } from 'react-hook-form';
import {
  ControllerTextFieldProps,
  ControllerDatePickerProps,
  ControllerAutocompleteProps,
  ControllerCheckboxProps,
  ControllerGroupCheckboxProps,
} from '../types';
import {
  ControllerTextField,
  ControllerDatePicker,
  ControllerAutocomplete,
  ControllerCheckbox,
  ControllerGroupCheckbox,
} from './controllers';

const createTextField = <TFieldValues extends FieldValues>() => {
  const TextField = <
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >(
    props: ControllerTextFieldProps<TFieldValues, TName>,
  ) => <ControllerTextField {...props} />;

  TextField.displayName = 'TextField';

  return TextField;
};

const createDatePicker = <TFieldValues extends FieldValues>() => {
  const DatePicker = <
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >(
    props: ControllerDatePickerProps<TFieldValues, TName>,
  ) => <ControllerDatePicker {...props} />;

  DatePicker.displayName = 'DatePicker';

  return DatePicker;
};

const createAutocomplete = <TFieldValues extends FieldValues>() => {
  const Autocomplete = <
    Value,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined,
    ChipComponent extends React.ElementType = 'div',
  >(
    props: ControllerAutocompleteProps<
      Value,
      TFieldValues,
      TName,
      Multiple,
      DisableClearable,
      FreeSolo,
      ChipComponent
    >,
  ) => <ControllerAutocomplete {...props} />;

  Autocomplete.displayName = 'Autocomplete';

  return Autocomplete;
};

const createCheckbox = <TFieldValues extends FieldValues>() => {
  const Checkbox = <
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >(
    props: ControllerCheckboxProps<TFieldValues, TName>,
  ) => <ControllerCheckbox {...props} />;

  Checkbox.displayName = 'Checkbox';

  return Checkbox;
};

const createGroupCheckbox = <TFieldValues extends FieldValues>() => {
  const GroupCheckbox = <
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >(
    props: ControllerGroupCheckboxProps<TFieldValues, TName>,
  ) => <ControllerGroupCheckbox {...props} />;

  GroupCheckbox.displayName = 'GroupCheckbox';

  return GroupCheckbox;
};

export const createControllers = <TFieldValues extends FieldValues>() => ({
  TextField: createTextField<TFieldValues>(),
  DatePicker: createDatePicker<TFieldValues>(),
  Autocomplete: createAutocomplete<TFieldValues>(),
  Checkbox: createCheckbox<TFieldValues>(),
  GroupCheckbox: createGroupCheckbox<TFieldValues>(),
});
