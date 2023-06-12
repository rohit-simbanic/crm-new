import Button, { ButtonPropsVariantOverrides } from '@mui/material/Button';
import { ReactNode } from 'react';

interface CustomInterface {
  id: string;
  label: string | JSX.Element;
  style?: object;
  variant?: any;
  size?: any;
  onClick?: (e: any) => void;
  disableElevation?: boolean;
  endIcon?: ReactNode;
}

const CustomButton = (props: CustomInterface) => {
  const {
    id,
    label,
    onClick,
    style,
    variant,
    size,
    disableElevation,
    endIcon
  } = props;

  return (
    <Button
      id={id ?? `basic-button-${label}`}
      onClick={onClick}
      style={style}
      variant={variant ?? ''}
      size={size ?? ''}
      name={`btn-custom-${label}`}
      disableElevation={disableElevation}
      endIcon={endIcon}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
