import { Button } from '@mui/material';
import buttonText from 'assets/constants/button';
import ClearIcon from '@mui/icons-material/Clear';
import useColorToken from 'hooks/useColorToken';
import SecondaryButton from 'components/button/button-secondary';

interface ClearButtonInterface {
  onClick: (e: any) => void;
}

const ClearButton = ({ onClick }: ClearButtonInterface) => {
  return (
    <SecondaryButton
      variant="contained"
      size="medium"
      name="btn-clear"
      onClick={onClick}
      startIcon={<ClearIcon />}
    >
      {buttonText.clear}
    </SecondaryButton>
  );
};

export default ClearButton;
