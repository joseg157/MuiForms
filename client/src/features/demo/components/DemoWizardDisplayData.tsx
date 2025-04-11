import { useWizardContext } from '@features/forms';
import Button from '@mui/material/Button';

import { WizardDemoFormState } from '../demo.types';

function DemoWizardDisplayData() {
  const { values, goToPreviousStep, isLastStep } =
    useWizardContext<WizardDemoFormState>();

  return (
    <div>
      {JSON.stringify(values)}
      <div className="tw:mt-4 tw:flex tw:justify-end tw:gap-2">
        <Button variant="outlined" color="secondary" onClick={goToPreviousStep}>
          Previous Step
        </Button>

        <Button variant="contained" type="submit">
          {isLastStep ? 'Submit' : 'Next Step'}
        </Button>
      </div>
    </div>
  );
}

export default DemoWizardDisplayData;
