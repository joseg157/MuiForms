import { useContext } from 'react';

import { WizardContext } from '../helpers/wizard.helper';
import { WizardContextValues } from '../types/wizard.types';

/**
 * Type must be type not a interface
 */

const useWizardContext = <T extends Record<string, unknown>>() => {
  const context = useContext(WizardContext) as
    | WizardContextValues<T>
    | undefined;

  if (!context) {
    throw new Error('useWizardContext must be used within a WizardProvider');
  }

  return context;
};

export { useWizardContext };
