import { StepConfig, Wizard } from '@features/forms';

import { WizardDemoFormState } from '../demo.types';
import PersonalForm from './PersonalForm';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import DemoWizardDisplayData from './DemoWizardDisplayData';

const personalStep: StepConfig<WizardDemoFormState, 'personal'> = {
  id: 'personal',
  initialValues: {
    name: '',
    email: '',
  },
  title: 'Personal Information',
  component: <PersonalForm />,
};

const addressStep: StepConfig<WizardDemoFormState, 'address'> = {
  id: 'address',
  initialValues: {
    street: '',
    city: '',
    state: null,
  },
  title: 'Address Information',
  component: <AddressForm />,
};

const paymentStep: StepConfig<WizardDemoFormState, 'payment'> = {
  id: 'payment',
  initialValues: {
    cardNumber: '',
    expirationDate: null,
  },
  title: 'Payment Information',
  component: <PaymentForm />,
};

const steps = [personalStep, addressStep, paymentStep];

function WizardDemoForm() {
  const onComplete = (values: WizardDemoFormState) => {
    // eslint-disable-next-line no-console
    console.log('Form completed with values:', values);
  };

  return (
    <Wizard
      steps={steps}
      onCompleted={onComplete}
      footer={<DemoWizardDisplayData />}
    />
  );
}

export default WizardDemoForm;
