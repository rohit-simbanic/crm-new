import ViewChangelog from 'features/view-changelog';
import { useEffect, useState } from 'react';
import { ObjectType } from 'types';
import { useParams } from 'react-router-dom';
import useRouteName from 'pages/route-outlet-context';

const AccountViewChangelog = ({ routeTag }: { routeTag: string }) => {
  const { account_id } = useParams<ObjectType>();
  const [filter, setFilter] = useState({});
  const { routeName, setRouteName } = useRouteName();

  let filterInfo =
    account_id === undefined ? filter : { ...filter, account_id };

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <>
      <ViewChangelog
        action="account_change_logs"
        filter={filterInfo}
        setFilter={setFilter}
        fieldAction="accounts"
      />
    </>
  );
};

export default AccountViewChangelog;
