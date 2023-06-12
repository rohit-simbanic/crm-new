import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material';

export const MuiCheckbox = styled(Checkbox)(() => ({
  '&.Mui-checked': {
    color: 'inherit'
  }
}));
