import CancelIcon from '@mui/icons-material/Cancel';
import buttonText from 'assets/constants/button';
import SecondaryButton from 'components/button/button-secondary';
import { isEmpty } from 'helpers/misc-helper';
import { useNavigate } from 'react-router-dom';

const CancelButton = ({ onClick }: { onClick?: any }) => {
  const navigate = useNavigate();
  return (
    <SecondaryButton
      variant="contained"
      size="medium"
      name="btn-search"
      onClick={
        !isEmpty(onClick)
          ? onClick
          : () => {
              navigate(-1);
            }
      }
      startIcon={<CancelIcon />}
    >
      {buttonText.cancel}
    </SecondaryButton>
  );
};

export default CancelButton;
