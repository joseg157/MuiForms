import { FieldValues, UseFormProps, DefaultValues } from 'react-hook-form';
import { ZodSchema } from 'zod';
import { TypographyProps } from '@mui/material/Typography';

export type WizardValues = { [key: string]: FieldValues };

export type StepConfig<
  T extends WizardValues,
  ID extends keyof T = keyof T,
> = Omit<UseFormProps<T[ID]>, 'defaultValues' | 'resolver' | 'formControl'> & {
  /**
   * Unique ID for step component.
   * 1. Serves as a key when retrieving inputted form values from `useWizard`.
   *
   * @example
   * ```jsx
   * const steps = [{ id: 'Step1', component: <Step1 />, initialValues: { name: '' } }]
   * ...
   * const { values } = useWizard()
   * console.log(values.Step1.name)
   */

  readonly id: ID;
  initialValues: DefaultValues<T[ID]>;
  schema?: ZodSchema<T[ID]>;
  readOnly?: boolean;

  /** Step component to be rendered. */
  component?: React.ReactElement;

  title?: string;

  slotProps?: {
    formContainerProps?: React.HTMLAttributes<HTMLFormElement>;
    titleProps?: TypographyProps;
  };

  /** Optional function that is called when the step is submitted.
   *  This helps to validate the step before moving to the next step
   */
  shouldSkip?: (allValues: T, direction: number) => boolean;
};

export interface WizardProps<T extends WizardValues> {
  /** List of step objects. */
  steps: Array<StepConfig<T>>;

  /**
   * Function that is called when last step is submitted.
   *
   * @param values Object containing all form field values from previous steps
   */
  onCompleted?: (values: T) => void;

  /** Optional header that is show above ALL active step */
  header?: React.ReactElement;

  /** Optional footer that is shown below ALL active step. */
  footer?: React.ReactElement;
}

export interface WizardContextValues<T extends Record<string, unknown>> {
  /** Object containing all form field values from previous steps. */
  values: T;

  /** Function to update the form field values. */
  setValues: (newValues: T) => void;

  /** Go to previous step. */
  goToPreviousStep: () => void;
  /** Go to next step. */
  goToNextStep: () => void;
  /** Go to step specified by index. */
  goToStep: (index: number) => void;

  /** Currently active step's config object. */
  // activeStep: StepConfig<T, keyof T>;
  /** Current index, numbering starts from 1. */
  stepNumber: number;
  /** Total number of steps. */
  totalSteps: number;

  /** Is currently active step first step. */
  isFirstStep: boolean;
  /** Is currently active step last step. */
  isLastStep: boolean;
}

export type ExcludeContextValues<T extends Record<string, unknown>> = Omit<
  WizardContextValues<T>,
  'values' | 'setValues'
> & {
  values: T;
  setValues: (newValues: T) => void;
};
