import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import useColorToken from 'hooks/useColorToken';

import StyledLinkRRD from './route-link-styled';

const RouteCreateIconLink = ({
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
          <AddCircleIcon
            sx={{ color: `${colors.grey[900]}` }}
            fontSize="small"
            cursor={'pointer'}
          />
        </IconButton>
      </StyledLinkRRD>
    );
  } else {
    return (
      <StyledLinkRRD to={url}>
        <IconButton>
          <AddCircleIcon
            sx={{ color: `${colors.grey[900]}` }}
            fontSize="small"
            cursor={'pointer'}
          />
        </IconButton>
      </StyledLinkRRD>
    );
  }
};

export default RouteCreateIconLink;
