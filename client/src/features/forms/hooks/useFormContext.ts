import { useFormContext as useRHFFormContext } from 'react-hook-form';

import { FormContextValues } from '../types';

const useFormContext = <T extends Record<string, unknown>>() => {
  const context = useRHFFormContext<T>() as FormContextValues<T>;

  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }

  return context;
};

export { useFormContext };
