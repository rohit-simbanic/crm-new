import { Box } from '@mui/system';
import { ReactNode } from 'react';

const ContainerRight = ({
  p = 1,
  children
}: {
  p?: number;
  children: ReactNode;
}) => {
  return (
    <Box p={p} height={`calc(100vh - 13vh)`}>
      {children}
    </Box>
  );
};

export default ContainerRight;
