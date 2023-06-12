import { useTheme } from '@mui/material';
import { moduleLabels } from 'assets/list/tracker/constant';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import accountService from 'services/accounts-service';
import trackerService from 'services/tracker-service';
import initialAccount from 'state/account/initial-account';
import { tokens } from 'theme';
import { ObjectType } from 'types';
import { AccountEntity } from 'types/account-types';

import RecordView from '../record-view';

const AccountsView = ({ routeTag }: { routeTag: string }) => {
  const { routeName, setRouteName } = useRouteName();

  const { account_id } = useParams<ObjectType>();

  const [account, setAccount] = useState<AccountEntity>(initialAccount);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const loadAccount = async (account_id: string) => {
    let response = await accountService.get(account_id);
    setAccount(response.data);

    trackerService.createRecentlyViewed({
      module_name: moduleLabels.Accounts.label,
      item_id: account_id,
      item_summary: response.data.name,
      action: 'detailview'
    });
  };

  useEffect(() => {
    if (account_id) loadAccount(account_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView account={account} readOnly={true} />
      </PaperBoxContent>
    </PaperBox>
  );
};

export default AccountsView;
