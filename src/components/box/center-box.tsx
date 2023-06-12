import { Box } from '@mui/system';

type CenterBoxProps = {
  children: React.ReactNode;
};

const CenterBox = (props: CenterBoxProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      {props.children}
    </Box>
  );
};

export default CenterBox;
