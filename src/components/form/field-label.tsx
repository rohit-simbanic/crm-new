import MuiInputLabel from '@mui/material/InputLabel';
import React from 'react';

export const FieldLabel = ({ ...props }) => {
  return <MuiInputLabel data-testid="field-label" {...props} />;
};

export default FieldLabel;
