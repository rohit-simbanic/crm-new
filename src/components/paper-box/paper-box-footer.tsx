import useTheme from '@mui/material/styles/useTheme';
import { Box } from '@mui/system';
import { tokens } from 'theme';
import { ObjectType } from 'types';

type WhiteBoxProps = {
  children?: React.ReactNode;
  sx?: ObjectType;
};

const PaperBoxFooter = ({ sx = { p: 2 }, children }: WhiteBoxProps) => {
  return <Box sx={{ ...sx }}>{children}</Box>;
};

export default PaperBoxFooter;
