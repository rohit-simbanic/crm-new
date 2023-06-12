import buttonText from 'assets/constants/button';
import PrimaryButton from 'components/button/button-primary';

interface YesInterface {
  onClick?: (e: any) => void;
  autoFocus?: boolean;
}

const YesButton = (props: YesInterface) => {
  return (
    <PrimaryButton
      variant="contained"
      size="medium"
      name="btn-yes"
      onClick={props.onClick}
      autoFocus={props.autoFocus}
    >
      {buttonText.yes}
    </PrimaryButton>
  );
};

export default YesButton;
