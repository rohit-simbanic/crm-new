import MuiTextField from '@mui/material/TextField';
import { styled } from '@mui/material';

const StyledFieldText = styled(MuiTextField)(() => ({
  '& label.Mui-focused': {
    color: 'inherit'
  },
  '& .MuiFilledInput-input': {
    padding: '12px'
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'inherit'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'inherit'
    }
  }
}));

export const FieldText = ({ InputLabelProps = {}, ...props }) => {
  return <StyledFieldText data-testid="field-text" {...props} />;
};

export default FieldText;
