import StyledLinkRRD from './route-link-styled';

const RouteLink = ({
  url,
  name,
  target,
  style
}: {
  url: string;
  name: string | JSX.Element;
  target?: boolean;
  style?: object;
}) => {
  if (target) {
    return (
      <StyledLinkRRD to={url} target="_blank" style={style}>
        {name}
      </StyledLinkRRD>
    );
  } else {
    return (
      <StyledLinkRRD to={url} style={style}>
        {name}
      </StyledLinkRRD>
    );
  }
};

export default RouteLink;
