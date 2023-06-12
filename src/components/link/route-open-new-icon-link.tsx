import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { IconButton } from '@mui/material';
import useColorToken from 'hooks/useColorToken';

import StyledLinkRRD from './route-link-styled';

const RouteOpenNewIconLink = ({ url }: { url: string }) => {
  const colors = useColorToken();

  return (
    <StyledLinkRRD to={url} target="_blank">
      <IconButton>
        <OpenInNewIcon sx={{ color: `${colors.grey[900]}` }} fontSize="small" />
      </IconButton>
    </StyledLinkRRD>
  );
};

export default RouteOpenNewIconLink;
