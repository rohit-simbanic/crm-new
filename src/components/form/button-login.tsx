import buttonText from 'assets/constants/button';
import PrimaryButton from 'components/button/button-primary';
import { ObjectType } from 'types';
import { CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface SaveInterface {
  onClick: (e: any) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  sx?: ObjectType;
}

const LoginButton = ({
  disabled,
  onClick,
  loading = false,
  fullWidth = false,
  sx
}: SaveInterface) => {
  return (
    <PrimaryButton
      disabled={disabled === true}
      variant="contained"
      size="medium"
      fullWidth={fullWidth}
      onClick={onClick}
      endIcon={
        loading === false ? <SendIcon /> : <CircularProgress size="1.2rem" />
      }
      sx={{ ...sx }}
    >
      {buttonText.login}
    </PrimaryButton>
  );
};

export default LoginButton;
