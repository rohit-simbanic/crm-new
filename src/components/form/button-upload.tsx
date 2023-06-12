import buttonText from 'assets/constants/button';
import AddIcon from '@mui/icons-material/Add';
import PrimaryButton from 'components/button/button-primary';
import CircularProgress from '@mui/material/CircularProgress';

interface SaveInterface {
  onClick: (val: any) => void;
  disabled?: boolean;
}

const UploadButton = (props: SaveInterface) => {
  return (
    <PrimaryButton
      disabled={props.disabled === true}
      variant="contained"
      size="medium"
      name="btn-search"
      onClick={props.onClick}
      startIcon={
        props.disabled ? (
          <CircularProgress size={15} color="inherit" />
        ) : (
          <AddIcon />
        )
      }
    >
      {buttonText.upload}
    </PrimaryButton>
  );
};

export default UploadButton;
