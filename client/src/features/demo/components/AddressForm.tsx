import { createControllers } from '@features/forms';

import { states } from '@utils/constants';

import { AddressFormState } from '../demo.types';

const { TextField, Autocomplete } = createControllers<AddressFormState>();

function AddressForm() {
  return (
    <div className="tw:grid tw:grid-cols-3 tw:gap-4">
      <TextField name="street" label="Street" />
      <TextField name="city" label="City" />

      <Autocomplete
        name="state"
        label="State"
        options={states}
        getOptionLabel={(option) => option.name}
      />
    </div>
  );
}

export default AddressForm;
