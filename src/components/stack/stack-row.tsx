import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ObjectType } from 'types';

interface StackRowType {
  children: React.ReactNode;
  sx?: ObjectType;
  isUnitItem?: boolean;
}

const StackRow = ({ children, sx = {}, isUnitItem = false }: StackRowType) => {
  const mobileView = useMediaQuery('(max-width:599px)');

  if (isUnitItem) {
    return (
      <Stack direction="row" spacing={2} sx={{ pt: mobileView ? 0 : 3, ...sx }}>
        {children}
      </Stack>
    );
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ pb: 2, pl: 2, pt: 2, pr: 2, ...sx }}
    >
      {children}
    </Stack>
  );
};

export default StackRow;
