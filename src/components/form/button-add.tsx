import buttonText from 'assets/constants/button';
import AddIcon from '@mui/icons-material/Add';
import PrimaryButton from 'components/button/button-primary';
import { ObjectType } from 'types';

interface SaveInterface {
  onClick: (e: any) => void;
  disabled?: boolean;
  sx?: ObjectType;
}

const AddButton = ({ onClick, disabled = false, sx }: SaveInterface) => {
  return (
    <PrimaryButton
      variant="contained"
      size="medium"
      name="btn-search"
      onClick={onClick}
      startIcon={<AddIcon />}
      sx={{ ...sx }}
      disabled={disabled}
    >
      {buttonText.add}
    </PrimaryButton>
  );
};

export default AddButton;
