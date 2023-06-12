import { Paper } from '@mui/material';
import useColorToken from 'hooks/useColorToken';
import { ReactNode } from 'react';
import { ObjectType } from 'types';

interface PaperBoxHeaderType {
  value: ReactNode;
  sx?: ObjectType;
}
const PaperBoxHeader = ({ value, sx }: PaperBoxHeaderType) => {
  const colors = useColorToken();

  return (
    <>
      <Paper
        sx={{
          p: 1,
          pl: 2,
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '0px',
          ...sx
        }}
        variant="outlined"
      >
        {value}
      </Paper>
    </>
  );
};

export default PaperBoxHeader;
