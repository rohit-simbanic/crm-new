import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import useColorToken from 'hooks/useColorToken';

import StyledLinkRRD from './route-link-styled';

const RouteEditIconLink = ({
  url,
  target = false
}: {
  url: string;
  target?: boolean;
}) => {
  const colors = useColorToken();

  if (target) {
    return (
      <StyledLinkRRD to={url} target="_blank">
        <IconButton>
          <EditIcon sx={{ color: `${colors.grey[900]}` }} fontSize="small" />
        </IconButton>
      </StyledLinkRRD>
    );
  } else {
    return (
      <StyledLinkRRD to={url}>
        <IconButton>
          <EditIcon sx={{ color: `${colors.grey[900]}` }} fontSize="small" />
        </IconButton>
      </StyledLinkRRD>
    );
  }
};

export default RouteEditIconLink;
