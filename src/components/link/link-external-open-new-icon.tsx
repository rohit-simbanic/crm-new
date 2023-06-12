import { IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StyledLink from './link-styled';
import useColorToken from 'hooks/useColorToken';

const LinkExtenalOpenNewIcon = ({
  url,
  label = '',
  withIcon = true
}: {
  url: string;
  label?: string;
  withIcon?: boolean;
}) => {
  const colors = useColorToken();
  return (
    <StyledLink href={url} target="_blank" rel="noopener noreferrer">
      {label.length > 0 && label}
      {withIcon === true && (
        <IconButton>
          <OpenInNewIcon
            sx={{ color: `${colors.grey[900]}` }}
            fontSize="small"
          />
        </IconButton>
      )}
    </StyledLink>
  );
};

export default LinkExtenalOpenNewIcon;
