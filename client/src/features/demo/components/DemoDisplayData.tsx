import { useWatch } from 'react-hook-form';
import { useFormContext } from '@features/forms';
import { DemoFormState } from '../demo.types';

function DisplayData() {
  const { control } = useFormContext<DemoFormState>();
  const formValues = useWatch({
    control,
  });

  return <div>{JSON.stringify(formValues)}</div>;
}

export default DisplayData;
