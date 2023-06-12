import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import useColorToken from 'hooks/useColorToken';

import StyledLinkRRD from './route-link-styled';

const RouteViewIconLink = ({ url }: { url: string }) => {
  const colors = useColorToken();
  return (
    <StyledLinkRRD to={url}>
      <IconButton>
        <VisibilityIcon
          sx={{ color: `${colors.grey[900]}` }}
          fontSize="small"
        />
      </IconButton>
    </StyledLinkRRD>
  );
};

export default RouteViewIconLink;
