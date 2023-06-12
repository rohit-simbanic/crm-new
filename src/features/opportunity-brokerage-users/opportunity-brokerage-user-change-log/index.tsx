import ViewChangelog from 'features/view-changelog';
import { useEffect, useState } from 'react';
import { ObjectType } from 'types';
import { useParams } from 'react-router-dom';
import React from 'react';
import useRouteName from 'pages/route-outlet-context';

const OpportunityBrokerageUserViewChangelog = ({
  routeTag
}: {
  routeTag: string;
}) => {
  const { opportunity_brokerage_user_id } = useParams<ObjectType>();
  const [filter, setFilter] = useState({});
  const { routeName, setRouteName } = useRouteName();

  let filterInfo =
    opportunity_brokerage_user_id === undefined
      ? filter
      : { ...filter, opportunity_brokerage_user_id };

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <>
      <ViewChangelog
        action="opportunity_brokerage_user_change_logs"
        filter={filterInfo}
        setFilter={setFilter}
        fieldAction="opportunity_brokerage_users"
      />
    </>
  );
};

export default OpportunityBrokerageUserViewChangelog;
