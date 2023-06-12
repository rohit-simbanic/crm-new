import ViewChangelog from 'features/view-changelog';
import { useEffect, useState } from 'react';
import { ObjectType } from 'types';
import { useParams } from 'react-router-dom';
import React from 'react';
import useRouteName from 'pages/route-outlet-context';

const MarketViewChangelog = ({ routeTag }: { routeTag: string }) => {
  const { msa_id } = useParams<ObjectType>();
  const { routeName, setRouteName } = useRouteName();
  const [filter, setFilter] = useState({});
  let filterInfo =
    msa_id === undefined ? filter : { ...filter, market_id: msa_id };

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <>
      <ViewChangelog
        action="msa_change_logs"
        filter={filterInfo}
        setFilter={setFilter}
        fieldAction="msa"
      />
    </>
  );
};

export default MarketViewChangelog;
