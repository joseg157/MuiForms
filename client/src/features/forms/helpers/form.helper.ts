import { type FieldValues, type UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { GetUseFormProps } from '../types';

/**
 * This is a helper function to get the useForm props for the form.
 */
export const getUseFormProps = <T extends FieldValues>({
  defaultValues,
  values,
  schema,
  mode,
  disabled,
  reValidateMode,
  errors,
  resetOptions,
  context,
  shouldUnregister,
  shouldFocusError,
  shouldUseNativeValidation,
  progressive,
  criteriaMode,
  delayError,
}: GetUseFormProps<T>): UseFormProps<T> => ({
  defaultValues,
  values,
  mode,
  disabled,
  reValidateMode,
  errors,
  resetOptions,
  context,
  shouldUnregister,
  shouldFocusError,
  shouldUseNativeValidation,

  progressive,
  criteriaMode,
  delayError,
  resolver: schema ? zodResolver(schema) : undefined,
});
