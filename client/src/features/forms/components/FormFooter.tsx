import Button, { ButtonProps } from '@mui/material/Button';

interface FormFooterProps {
  showResetButton?: boolean;
  resetButtonProps?: ButtonProps;
  submitButtonProps?: ButtonProps;
}

function FormFooter({
  resetButtonProps,
  submitButtonProps,
  showResetButton = true,
}: FormFooterProps) {
  return (
    <div className="tw:flex tw:justify-end tw:gap-2">
      {showResetButton && (
        <Button
          variant="outlined"
          color="secondary"
          type="button"
          {...resetButtonProps}
        >
          Reset
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        {...submitButtonProps}
      >
        Submit
      </Button>
    </div>
  );
}

export default FormFooter;
