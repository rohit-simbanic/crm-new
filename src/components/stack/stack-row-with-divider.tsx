import { Divider } from '@mui/material';
import Stack from '@mui/material/Stack';

interface StackRowType {
  children?: React.ReactNode;
}

const StackRowWithDivider = ({ children }: StackRowType) => {
  return (
    <>
      <Divider light sx={{ mt: 2 }} />
      <Stack direction="row" spacing={2} mt={2}>
        {children}
      </Stack>
    </>
  );
};

export default StackRowWithDivider;
