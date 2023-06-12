import styled from '@emotion/styled';
import useColorToken from 'hooks/useColorToken';
import { Link as RRDLink } from 'react-router-dom';

const RouteLinkStyled = styled(RRDLink)(() => {
  const colors = useColorToken();

  return {
    textDecoration: 'none',
    color: colors.grey[900],
    maxWidth: '100%',
    fontWeight: 700
  };
});

export default RouteLinkStyled;
