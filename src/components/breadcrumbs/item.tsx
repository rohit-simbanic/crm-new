import Typography from '@mui/material/Typography';
import RouteLinkBlack from 'components/link/route-link-black';
import useColorToken from 'hooks/useColorToken';
import { v4 as uuid } from 'uuid';

interface BreadcrumbItemType {
  title: string;
  to?: string;
  type?: 'link' | 'title';
}

const BreadcrumbItem = ({ title, to, type }: BreadcrumbItemType) => {
  const colors = useColorToken();
  const LinkComponent = (
    <RouteLinkBlack url={to ?? ''} key={uuid()} name={title} />
  );

  const TitleComponent = (
    <Typography
      component={'span'}
      sx={{ color: colors.grey[900], wordBreak: 'break-word' }}
      key={uuid()}
    >
      {title}
    </Typography>
  );

  if (type === 'title') {
    return TitleComponent;
  }
  return LinkComponent;
};

export default BreadcrumbItem;
