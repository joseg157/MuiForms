import { useState, useMemo, useEffect, useCallback } from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';

import {
  WizardProps,
  WizardValues,
  StepConfig,
  ExcludeContextValues,
  WizardContextValues,
} from '../types/wizard.types';
import { FormContextValues } from '../types/form.types';

import {
  WizardContext,
  getActiveUseFormProps,
  getAllInitialValues,
} from '../helpers/wizard.helper';

import FormTitle from './FormTitle';

function Wizard<T extends WizardValues>({
  steps,
  onCompleted,

  header,
  footer,
}: WizardProps<T>) {
  const initialStep = steps[0];

  // State
  const [activeStep, setActiveStep] = useState(initialStep);
  // Gather data of all forms from each step here
  const [values, setValues] = useState<T>(
    () => getAllInitialValues(steps) as T,
  );
  const [isLoading, setIsLoading] = useState(false);

  const activeUseFormProps = useMemo(
    () => getActiveUseFormProps<T>(values, activeStep),
    [values, activeStep],
  );

  const methods = useForm({
    ...activeUseFormProps,
  });

  const { reset, getValues } = methods;

  // Variables
  const currentIndex: number = steps.findIndex((s) => s.id === activeStep.id);
  const stepNumber: number = currentIndex + 1;
  const totalSteps: number = steps.length;
  const isFirstStep: boolean = stepNumber === 1;
  const isLastStep: boolean = stepNumber === totalSteps;

  // Reset initial values when active step is changed

  useEffect(() => {
    if (isLoading) {
      reset(activeUseFormProps.defaultValues);
      setIsLoading(false);
    }
  }, [activeUseFormProps.defaultValues, reset, isLoading]);

  const getProceedingStep = useCallback(
    (remainingSteps: Array<StepConfig<T>>, newValues: T, direction: number) =>
      remainingSteps.find(
        (step) =>
          step.shouldSkip === undefined ||
          !step.shouldSkip(newValues, direction),
      ),
    [],
  );

  const resolveNextStep = useCallback(
    (newValues: T) => {
      const remainingSteps = steps.slice(currentIndex + 1);

      const nextStep = getProceedingStep(remainingSteps, newValues, 1);

      return nextStep;
    },
    [steps, currentIndex, getProceedingStep],
  );

  const resolvePreviousStep = useCallback(
    (newValues: T) => {
      const remainingSteps = steps.slice(0, currentIndex).reverse();

      const previousStep = getProceedingStep(remainingSteps, newValues, -1);

      return previousStep;
    },
    [getProceedingStep, steps, currentIndex],
  );

  const handlePreviousStep = useCallback(
    (stepValues: FieldValues) => {
      const newWizardValues = {
        ...values,
        [activeStep.id]: { ...stepValues },
      };

      setValues(newWizardValues);

      const previousStep = resolvePreviousStep(newWizardValues);

      if (!previousStep) {
        return;
      }

      setActiveStep(previousStep);
      setIsLoading(true);
    },
    [activeStep.id, values, resolvePreviousStep],
  );

  const handleNextStep = useCallback(
    (stepValues: FieldValues) => {
      const newWizardValues = {
        ...values,
        [activeStep.id]: stepValues,
      };

      setValues(newWizardValues);

      const nextStep = resolveNextStep(newWizardValues);

      if (!nextStep) {
        onCompleted?.(values);
        return;
      }

      setActiveStep(nextStep);
      setIsLoading(true);
    },
    [activeStep.id, values, onCompleted, resolveNextStep],
  );

  const context: WizardContextValues<T> = useMemo(
    () => ({
      values,
      setValues,

      goToPreviousStep: () => handlePreviousStep(getValues()),
      goToNextStep: () => handleNextStep(getValues()),
      goToStep: (index: number) => setActiveStep(steps[index]),

      activeStep,
      stepNumber,
      totalSteps,
      isFirstStep,
      isLastStep,
    }),
    [
      values,
      activeStep,
      stepNumber,
      totalSteps,
      isFirstStep,
      isLastStep,
      getValues,

      steps,

      handlePreviousStep,
      handleNextStep,
    ],
  );

  const extendFormContext: FormContextValues<FieldValues> = {
    ...methods,
    readOnly: activeStep.readOnly,
  };

  return (
    <WizardContext.Provider
      value={context as unknown as ExcludeContextValues<T>}
    >
      <FormProvider {...extendFormContext}>
        <form
          className="tw:space-y-4"
          {...activeStep?.slotProps?.formContainerProps}
          onSubmit={methods.handleSubmit(handleNextStep)}
        >
          {header}
          {activeStep?.title && (
            <FormTitle
              title={activeStep.title}
              {...activeStep?.slotProps?.titleProps}
            />
          )}
          {/* {activeStep?.component} */}
          {!isLoading && activeStep.component}
          {footer}
        </form>
      </FormProvider>
    </WizardContext.Provider>
  );
}

export default Wizard;
