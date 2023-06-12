//@ts-nocheck
import BreadcrumbItem from 'components/breadcrumbs/item';
import MuiBreadcrumbs from 'components/breadcrumbs';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ params }) => {
  let breadcrumbs = [];

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to="/" title="Home" type="link" />
  );
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} to={'#'} title="Dashboard" type="title" />
  );

  if (params.routeName === 'negotiator') {
    breadcrumbs.push(
      <BreadcrumbItem key={uuid()} to="" type="title" title="Negotiator" />
    );
  }

  if (params.routeName === 'transaction') {
    breadcrumbs.push(
      <BreadcrumbItem key={uuid()} type="title" title="Transaction" />
    );
  }

  if (params.routeName === 'closing') {
    breadcrumbs.push(
      <BreadcrumbItem key={uuid()} type="title" title="Closing" />
    );
  }

  return <MuiBreadcrumbs> {breadcrumbs} </MuiBreadcrumbs>;
};

export default Breadcrumbs;
