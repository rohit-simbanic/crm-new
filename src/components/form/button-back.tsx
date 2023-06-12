import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'helpers/misc-helper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SecondaryButton from 'components/button/button-secondary';

const BackButton = ({ onClick }: { onClick?: any }) => {
  const navigate = useNavigate();

  return (
    <SecondaryButton
      variant="contained"
      name="btn-search"
      size="small"
      onClick={
        !isEmpty(onClick)
          ? onClick
          : () => {
              navigate(-1);
            }
      }
      startIcon={<ArrowBackIcon />}
    >
      Back
    </SecondaryButton>
  );
};

export default BackButton;
