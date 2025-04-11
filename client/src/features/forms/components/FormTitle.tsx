import Typography from '@mui/material/Typography';

import { FormHeaderProps } from '../types';

function FormTitle({ title, ...props }: FormHeaderProps) {
  if (!title) return null;

  return (
    <Typography variant="h6" className="tw:text-center tw:font-bold" {...props}>
      {title}
    </Typography>
  );
}

export default FormTitle;
