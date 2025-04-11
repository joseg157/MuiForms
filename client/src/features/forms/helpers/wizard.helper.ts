import { createContext } from 'react';
import { FieldValues, UseFormProps } from 'react-hook-form';

import { ZodType, ZodTypeDef } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { WizardValues, StepConfig } from '../types/wizard.types';

const WizardContext = createContext<Record<string, unknown> | undefined>(
  undefined,
);

/**
 * Get all initial values from the steps.
 * @example
 * steps= [
 *  { id: 'step1', initialValues: { name: '' } },
 *  { id: 'step2', initialValues: { age: 0 } },
 * ]
 * const initialValues = getAllInitialValues(steps);
 */
const getAllInitialValues = <T extends WizardValues>(
  steps: Array<StepConfig<T>>,
): WizardValues =>
  steps.reduce((acc, step) => {
    acc[step.id as keyof WizardValues] = step.initialValues;
    return acc;
  }, {} as WizardValues);

/**
 * Get the active step useForm props.
 * @example
 * const values = {
 *  step1: { name: 'John' },
 *  step2: { age: 30 },
 * }
 * const activeStep = steps[0];
 * const formProps = getActiveStepUseFormProps(values, activeStep);
 * const { register, handleSubmit } = useForm(formProps);
 */

const getActiveStepUseFormProps = <T extends WizardValues>(
  values: T,
  activeStep: StepConfig<T>,
): UseFormProps<FieldValues> => ({
  defaultValues:
    values[activeStep.id as keyof WizardValues] || activeStep.initialValues,

  mode: activeStep.mode,
  disabled: activeStep.disabled,
  reValidateMode: activeStep.reValidateMode,

  errors: activeStep.errors,
  resetOptions: activeStep.resetOptions,
  context: activeStep.context,
  shouldUnregister: activeStep.shouldUnregister,
  shouldFocusError: activeStep.shouldFocusError,
  shouldUseNativeValidation: activeStep.shouldUseNativeValidation,
  progressive: activeStep.progressive,
  criteriaMode: activeStep.criteriaMode,
  delayError: activeStep.delayError,

  resolver: activeStep.schema
    ? zodResolver(
        activeStep.schema as ZodType<FieldValues, ZodTypeDef, FieldValues>,
      )
    : undefined,
});

export {
  WizardContext,
  getAllInitialValues,
  getActiveStepUseFormProps as getActiveUseFormProps,
};
