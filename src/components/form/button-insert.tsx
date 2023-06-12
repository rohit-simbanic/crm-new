import buttonText from 'assets/constants/button';
import AddIcon from '@mui/icons-material/Add';
import PrimaryButton from 'components/button/button-primary';

interface SaveInterface {
  onClick: (e: any) => void;
}

const InsertButton = (props: SaveInterface) => {
  return (
    <PrimaryButton
      variant="contained"
      size="medium"
      name="btn-search"
      onClick={props.onClick}
      startIcon={<AddIcon />}
    >
      {buttonText.insert}
    </PrimaryButton>
  );
};

export default InsertButton;
