import ViewChangelog from 'features/view-changelog';
import { useEffect, useState } from 'react';
import { ObjectType } from 'types';
import { useParams } from 'react-router-dom';
import React from 'react';
import useRouteName from 'pages/route-outlet-context';

const SqsViewChangelog = ({ routeTag }: { routeTag: string }) => {
  const { sqs_id } = useParams<ObjectType>();
  const [filter, setFilter] = useState({});
  const { routeName, setRouteName } = useRouteName();

  let filterInfo = sqs_id === undefined ? filter : { ...filter, sqs_id };

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <>
      <ViewChangelog
        action="sqs_change_logs"
        filter={filterInfo}
        setFilter={setFilter}
        fieldAction="sqs-messages"
      />
    </>
  );
};

export default SqsViewChangelog;
