import { Paper as PaperMUI } from '@mui/material';
import { ObjectType } from 'types';

type WhiteBoxProps = {
  children: React.ReactNode;
  variantValue?: 'elevation' | 'outlined' | undefined;
  evelationValue?: number;
  sx?: ObjectType;
};

const PaperBox = ({
  variantValue = 'elevation',
  evelationValue = 2,
  children,
  sx
}: WhiteBoxProps) => {
  return (
    <PaperMUI elevation={evelationValue} variant={variantValue} sx={{ ...sx }}>
      {children}
    </PaperMUI>
  );
};

export default PaperBox;
