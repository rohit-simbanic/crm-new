import { Typography } from '@mui/material';
import useColorToken from 'hooks/useColorToken';
import { ReactNode } from 'react';

const BoxHeader = ({ value }: { value: ReactNode }) => {
  const colors = useColorToken();

  return (
    <Typography
      sx={{ color: colors.grey[900], fontWeight: 700, pb: 2, fontSize: 16 }}
    >
      {value}
    </Typography>
  );
};

export default BoxHeader;
