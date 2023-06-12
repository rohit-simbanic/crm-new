import { useTheme } from '@mui/material';
import { tokens } from 'theme';

const useColorToken = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return colors;
};

export default useColorToken;
