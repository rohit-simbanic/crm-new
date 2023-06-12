import { Box } from '@mui/system';

type WrapTextBoxProps = {
  children: React.ReactNode;
};

const WrapTextBox = (props: WrapTextBoxProps) => {
  return (
    <Box
      style={{
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        overflowWrap: 'break-word'
      }}
    >
      {props.children}
    </Box>
  );
};

export default WrapTextBox;
