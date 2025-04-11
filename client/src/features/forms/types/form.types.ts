import {
  type UseFormReturn,
  type DefaultValues,
  type FieldValues,
  type UseFormProps,
  type SubmitErrorHandler,
  type SubmitHandler,
} from 'react-hook-form';

import { ZodSchema } from 'zod';

import { TypographyProps } from '@mui/material/Typography';
import { ButtonProps } from '@mui/material/Button';

export type FormContextValues<T extends Record<string, unknown>> =
  UseFormReturn<T> & {
    readOnly?: boolean;
  };

export interface FormProps<T extends FieldValues>
  extends Omit<UseFormProps<T>, 'resolver' | 'defaultValues'> {
  /**
   * Custom header of the form. Will take precedence over the title prop.
   */
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;

  onSubmit?: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  schema?: ZodSchema<T>;
  defaultValues?: DefaultValues<T>;
  readOnly?: boolean;
  title?: string;

  slotProps?: {
    formContainerProps?: React.HTMLAttributes<HTMLFormElement>;
    titleProps?: TypographyProps;
    submitButtonProps?: ButtonProps;
    resetButtonProps?: ButtonProps;
  };
  /** If true, the form will be rendered as a child of the parent component.
   * This allows you to forward props and event handlers to a child component,
   */

  showResetButton?: boolean;
  asChild?: boolean;
}

export interface GetUseFormProps<T extends FieldValues>
  extends Omit<UseFormProps<T>, 'resolver' | 'defaultValues'> {
  defaultValues?: DefaultValues<T>;
  schema?: ZodSchema<T>;

  // Remove error in case we don't remove a prop we don't use
  [key: string]: unknown;
}

export interface FormHeaderProps extends TypographyProps {
  title?: string;
}
