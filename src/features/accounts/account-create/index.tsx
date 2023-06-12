import { useTheme } from '@mui/material';
import { moduleLabels } from 'assets/list/tracker/constant';
import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import { validateAccount } from 'helpers/validation/account-helper';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import accountService from 'services/accounts-service';
import trackerService from 'services/tracker-service';
import initialAccount from 'state/account/initial-account';
import { tokens } from 'theme';
import { AccountEntity } from 'types/account-types';

import RecordView from '../record-view';

const AccountCreate = ({ routeTag }: { routeTag: string }) => {
  const { routeName, setRouteName } = useRouteName();
  const { account_id } = useParams();
  const [account, setAccount] = useState<AccountEntity>(initialAccount);
  const [validation, setValidation] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleChange = (e: any) => {
    setAccount(Object.assign({}, account, { [e.target.name]: e.target.value }));
  };

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

  const handleSubmit = async () => {
    const { status, ...errors } = validateAccount(account);

    setValidation(errors);

    setIsLoading(true);

    if (!status) return;

    const reqBody = {
      name: account.name,
      entera_customer_id: account.entera_customer_id,
      company_name: account.company_name,
      contact_first_name: account.contact_first_name,
      contact_last_name: account.contact_last_name,
      website: account.website,
      phone_office: account.phone_office,
      phone_fax: account.phone_fax,
      account_type: account.account_type,
      account_status: account.account_status,
      whitelist_email_domains: account.whitelist_email_domains,
      enable_to_update_escrow_party: account.enable_to_update_escrow_party,
      use_jacksonville_nefar_contract: account.use_jacksonville_nefar_contract
    };

    let response;

    if (account_id) {
      response = await accountService.update(account_id, reqBody);
    } else {
      response = await accountService.create(reqBody);
    }

    setIsLoading(false);

    if (response.isValidationError) {
      setValidation(response.errorMessage);
    }

    if (response.isSuccess) {
      window.history.back();
    }
  };

  useEffect(() => {
    setRouteName(routeTag);
  });

  useEffect(() => {
    if (account_id !== undefined) loadAccount(account_id);
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView
          account={account}
          validation={validation}
          onChange={handleChange}
        />

        <StackRowWithDivider>
          <SaveButton onClick={handleSubmit} disabled={isLoading} />
          <CancelButton />
        </StackRowWithDivider>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default AccountCreate;
