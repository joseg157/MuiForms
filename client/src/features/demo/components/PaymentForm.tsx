import { createControllers } from '@features/forms';

import { PaymentFormState } from '../demo.types';

const { TextField, DatePicker } = createControllers<PaymentFormState>();

function PaymentForm() {
  return (
    <div className="tw:grid tw:grid-cols-2 tw:gap-4">
      <TextField name="cardNumber" label="Card Number" formatType="number" />

      <DatePicker name="expirationDate" />
    </div>
  );
}

export default PaymentForm;
