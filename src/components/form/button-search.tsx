import buttonText from 'assets/constants/button';
import SearchIcon from '@mui/icons-material/Search';
import PrimaryButton from 'components/button/button-primary';

interface SearchButtonInterface {
  onClick: (e: any) => void;
  disabled?: boolean;
}

const SearchButton = (props: SearchButtonInterface) => {
  return (
    <PrimaryButton
      disabled={props.disabled === true}
      variant="contained"
      name="btn-search"
      size="medium"
      onClick={props.onClick}
      startIcon={<SearchIcon />}
    >
      {buttonText.search}
    </PrimaryButton>
  );
};

export default SearchButton;
