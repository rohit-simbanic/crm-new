import { ReactNode } from 'react';
import StyledLink from './link-styled';

const Link = ({ children, url }: { children: ReactNode; url: string }) => {
  return <StyledLink href={url || '#'}>{children}</StyledLink>;
};
export default Link;
