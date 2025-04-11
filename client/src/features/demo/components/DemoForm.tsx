import { createControllers, Form } from '@features/forms';
import { states } from '@utils/constants';

import { DemoFormState } from '../demo.types';
import DisplayData from './DemoDisplayData';

const { TextField, DatePicker, GroupCheckbox, Checkbox, Autocomplete } =
  createControllers<DemoFormState>();

const defaultValues: DemoFormState = {
  name: '',
  chooseDate: null,
  favoriteSnacks: ['chocolate'],
  isHungry: true,
  state: null,
};

let renderCount = 0;

function DemoForm() {
  renderCount++;

  return (
    <Form title="Demo Form" defaultValues={defaultValues}>
      <div>Render Count: {renderCount}</div>
      <div className="tw:grid tw:gap-4">
        <TextField name="name" label="Name" />

        <DatePicker name="chooseDate" label="Choose Date" />

        <GroupCheckbox
          name="favoriteSnacks"
          label="Favorite Snacks"
          options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'chips', label: 'Chips' },
            { value: 'cookies', label: 'Cookies' },
          ]}
        />

        <Checkbox name="isHungry" label="Are you hungry?" />

        <Autocomplete
          name="state"
          label="State"
          options={states}
          getOptionKey={(option) => option?.abbreviation}
          getOptionLabel={(option) => option?.name}
        />
      </div>

      <DisplayData />
    </Form>
  );
}

export default DemoForm;
