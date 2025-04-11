import { createControllers } from '@features/forms';

import { PersonalFormState } from '../demo.types';

const { TextField } = createControllers<PersonalFormState>();

function PersonalForm() {
  return (
    <div className="tw:grid tw:grid-cols-2 tw:gap-4">
      <TextField name="name" label="Name" />
      <TextField name="email" label="Email" />
    </div>
  );
}

export default PersonalForm;
