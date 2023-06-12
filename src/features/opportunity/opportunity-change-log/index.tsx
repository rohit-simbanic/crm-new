import ViewChangelog from 'features/view-changelog';
import { useEffect, useState } from 'react';
import { ObjectType } from 'types';
import { useParams } from 'react-router-dom';
import React from 'react';
import useRouteName from 'pages/route-outlet-context';
import initialViewChangeLogListFilter from 'state/view-changelog/initial-view-change-log-list-filter';

const OpportunityViewChangelog = ({ routeTag }: { routeTag: string }) => {
  const { opportunity_id } = useParams<ObjectType>();
  const [filter, setFilter] = useState(initialViewChangeLogListFilter);
  const { routeName, setRouteName } = useRouteName();

  let filterInfo =
    opportunity_id === undefined ? filter : { ...filter, opportunity_id };

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <>
      <ViewChangelog
        action="opportunity_change_logs"
        filter={filterInfo}
        setFilter={setFilter}
        fieldAction="opportunities"
      />
    </>
  );
};

export default OpportunityViewChangelog;
