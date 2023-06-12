import ViewChangelog from 'features/view-changelog';
import { useEffect, useState } from 'react';
import { ObjectType } from 'types';
import { useParams } from 'react-router-dom';
import React from 'react';
import useRouteName from 'pages/route-outlet-context';

const ServiceViewChangelog = ({ routeTag }: { routeTag: string }) => {
  const { service_id } = useParams<ObjectType>();
  const [filter, setFilter] = useState({});
  const { routeName, setRouteName } = useRouteName();

  let filterInfo =
    service_id === undefined ? filter : { ...filter, service_id };

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <>
      <ViewChangelog
        action="service_change_logs"
        filter={filterInfo}
        setFilter={setFilter}
        fieldAction="services"
      />
    </>
  );
};

export default ServiceViewChangelog;
