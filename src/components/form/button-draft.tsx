import DraftsIcon from '@mui/icons-material/Drafts';

import buttonText from 'assets/constants/button';
import SecondaryButton from 'components/button/button-secondary';

interface ButtonInterface {
  onClick: (e: any) => void;
  disabled?: boolean;
}

const DraftButton = ({ disabled = false, ...props }: ButtonInterface) => {
  return (
    <SecondaryButton
      variant="contained"
      size="medium"
      name="btn-search"
      color={'info'}
      onClick={(e: any) => {
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      startIcon={<DraftsIcon />}
      disabled={disabled}
    >
      {buttonText.draft}
    </SecondaryButton>
  );
};

export default DraftButton;
