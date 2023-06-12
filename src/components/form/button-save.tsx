import buttonText from 'assets/constants/button';
import SaveIcon from '@mui/icons-material/Save';
import PrimaryButton from 'components/button/button-primary';

interface SaveInterface {
  onClick: (e: any) => void;
  disabled?: boolean;
}

const SaveButton = (props: SaveInterface) => {
  return (
    <PrimaryButton
      disabled={props.disabled === true}
      variant="contained"
      size="medium"
      name="btn-search"
      onClick={props.onClick}
      startIcon={<SaveIcon />}
    >
      {buttonText.save}
    </PrimaryButton>
  );
};

export default SaveButton;
