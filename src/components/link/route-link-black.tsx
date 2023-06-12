import useColorToken from 'hooks/useColorToken';
import StyledLinkRRD from './route-link-styled';

interface RouteLinkBlack {
  url: string;
  name: string;
  handleClick?: () => any;
}

const RouteLinkBlack = ({ url, name, handleClick }: RouteLinkBlack) => {
  return (
    <StyledLinkRRD to={url} onClick={handleClick}>
      {name}
    </StyledLinkRRD>
  );
};

export default RouteLinkBlack;
