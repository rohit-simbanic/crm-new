import { Button } from '@mui/material';
import buttonText from 'assets/constants/button';
import RefreshIcon from '@mui/icons-material/Refresh';
import useColorToken from 'hooks/useColorToken';
import SecondaryButton from 'components/button/button-secondary';

interface RefreshInterface {
  onClick: (e: any) => void;
}

const RefreshButton = (props: RefreshInterface) => {
  return (
    <SecondaryButton
      variant="contained"
      size="medium"
      name="btn-refresh"
      onClick={props.onClick}
      startIcon={<RefreshIcon />}
    >
      {buttonText.refresh}
    </SecondaryButton>
  );
};

export default RefreshButton;
