import ViewChangelog from 'features/view-changelog';
import { useEffect, useState } from 'react';
import { ObjectType } from 'types';
import { useParams } from 'react-router-dom';
import React from 'react';
import useRouteName from 'pages/route-outlet-context';

const PartyViewChangelog = ({ routeTag }: { routeTag: string }) => {
  const { party_id } = useParams<ObjectType>();
  const [filter, setFilter] = useState({});
  const { routeName, setRouteName } = useRouteName();
  let filterInfo = party_id === undefined ? filter : { ...filter, party_id };

  useEffect(() => {
    setRouteName(routeTag);
  });

  return (
    <>
      <ViewChangelog
        action="party_change_logs"
        filter={filterInfo}
        setFilter={setFilter}
        fieldAction="parties"
      />
    </>
  );
};

export default PartyViewChangelog;
