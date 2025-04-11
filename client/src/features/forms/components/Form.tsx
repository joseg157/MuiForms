import { FormProvider, useForm, type FieldValues } from 'react-hook-form';
import { Slot } from '@radix-ui/react-slot';
import FormTitle from './FormTitle';
import FormFooter from './FormFooter';

import { FormProps, FormContextValues } from '../types/form.types';

import { getUseFormProps } from '../helpers/form.helper';

function Form<T extends FieldValues>({
  header,
  children,
  footer,

  slotProps,
  onSubmit = () => {},
  onError,

  readOnly = false,
  asChild = false,
  title,

  showResetButton,

  ...formProps
}: FormProps<T>) {
  const methods = useForm<T>({
    ...getUseFormProps<T>(formProps),
  });

  const Comp = asChild ? Slot : 'form';

  const extendedForm: FormContextValues<T> = {
    ...methods,
    readOnly,
  };

  const onReset = () => {
    methods.reset(formProps?.defaultValues);
  };

  return (
    <FormProvider {...extendedForm}>
      <Comp
        className="tw:space-y-4"
        {...slotProps?.formContainerProps}
        onSubmit={methods.handleSubmit(onSubmit, onError)}
      >
        {header ? (
          header
        ) : (
          <FormTitle title={title} {...slotProps?.titleProps} />
        )}

        {children}

        {footer
          ? footer
          : !readOnly && (
              <FormFooter
                resetButtonProps={{
                  ...slotProps?.resetButtonProps,
                  onClick: onReset,
                }}
                submitButtonProps={slotProps?.submitButtonProps}
                showResetButton={showResetButton}
              />
            )}
      </Comp>
    </FormProvider>
  );
}

export default Form;
