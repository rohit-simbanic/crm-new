import { Typography } from '@mui/material';
import useColorToken from 'hooks/useColorToken';
import { ReactNode } from 'react';
import { ObjectType } from 'types';

interface TitleProps {
  value: ReactNode;
  sx?: ObjectType;
}

const Title = ({ value, sx = {} }: TitleProps) => {
  const colors = useColorToken();

  return (
    <Typography
      display={'flex'}
      component="span"
      sx={{
        textDecoration: 'none',
        color: colors.grey[900],
        maxWidth: '100%',
        fontWeight: 700,
        fontSize: 16,
        ...sx
      }}
    >
      {value}
    </Typography>
  );
};

export default Title;
