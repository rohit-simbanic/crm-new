import PrimaryButton from 'components/button/button-primary';
import SendIcon from '@mui/icons-material/Send';
import buttonText from 'assets/constants/button';

interface ButtonInterface {
  onClick: (e: any) => void;
  disabled?: boolean;
}

const SendButton = ({ disabled = false, ...props }: ButtonInterface) => {
  return (
    <PrimaryButton
      variant="contained"
      size="medium"
      name="btn-search"
      color={'info'}
      onClick={(e: any) => {
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      startIcon={<SendIcon />}
      disabled={disabled}
    >
      {buttonText.send}
    </PrimaryButton>
  );
};

export default SendButton;
