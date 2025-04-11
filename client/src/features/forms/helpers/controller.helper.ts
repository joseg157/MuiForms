/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, FieldPath } from 'react-hook-form';
import { GetUseControllerProps } from '../types';

export const getUsedControllerProps = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  disabled,
}: GetUseControllerProps<TFieldValues, TName>) => ({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  disabled,
});

export const getComponentPropsWithoutControllerProps = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Partial<GetUseControllerProps<TFieldValues, TName>>,
) => {
  // Destructure the props to exclude the ones used by the controller
  // and return the remaining props

  const {
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
    disabled,
    ...rest
  } = props;

  return rest;
};
