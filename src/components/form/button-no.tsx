import buttonText from 'assets/constants/button';
import SecondaryButton from 'components/button/button-secondary';

interface NoInterface {
  onClick?: (e: any) => void;
}

const NoButton = (props: NoInterface) => {
  return (
    <SecondaryButton
      variant="contained"
      size="medium"
      name="btn-no"
      onClick={props.onClick}
    >
      {buttonText.no}
    </SecondaryButton>
  );
};

export default NoButton;
