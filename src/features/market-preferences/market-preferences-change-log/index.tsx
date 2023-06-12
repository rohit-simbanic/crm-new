import ViewChangelog from 'features/view-changelog';
import { useEffect, useState } from 'react';
import { ObjectType } from 'types';
import { useParams } from 'react-router-dom';
import React from 'react';
import useRouteName from 'pages/route-outlet-context';

const MarketPreferenceViewChangelog = ({ routeTag }: { routeTag: string }) => {
  const { market_preference_id } = useParams<ObjectType>();
  const [filter, setFilter] = useState({});
  const { routeName, setRouteName } = useRouteName();

  let filterInfo =
    market_preference_id === undefined
      ? filter
      : { ...filter, market_preference_id };

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <>
      <ViewChangelog
        action="market_preference_change_logs"
        filter={filterInfo}
        setFilter={setFilter}
        fieldAction="market_preferences"
      />
    </>
  );
};

export default MarketPreferenceViewChangelog;
