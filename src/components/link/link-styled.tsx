import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material';
import useColorToken from 'hooks/useColorToken';

const LinkStyled = styled(MuiLink)(() => {
  const colors = useColorToken();

  return {
    textDecoration: 'none',
    color: colors.grey[900],
    maxWidth: '100%',
    fontWeight: 700
  };
});

export default LinkStyled;
