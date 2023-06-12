import fieldLabel from 'assets/constants/fieldLabel';
import accountStatusType from 'assets/constants/account-status-type';
import RouteOpenNewIconLink from 'components/link/route-open-new-icon-link';

import {
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams
} from '@mui/x-data-grid';
import { getObjectKeyValue } from 'helpers/object-field-helper';
import RouteEditIconLink from 'components/link/route-edit-icon-link';
import RouteLink from 'components/link/route-link';
import { AccountEntity } from 'types/account-types';
import { useParams } from 'react-router-dom';
import { ObjectType } from 'types';
import DateUtility from 'helpers/date-helper';
const Action = ({ account }: { account: AccountEntity }) => {
  const { msa_id } = useParams<ObjectType>();

  return (
    <>
      {!msa_id && (
        <RouteEditIconLink
          url={
            msa_id
              ? `/msa/${msa_id}/accounts/${account?.id}/edit`
              : `/accounts/${account?.id}/edit`
          }
        />
      )}
      <RouteOpenNewIconLink
        url={
          msa_id
            ? `/msa/${msa_id}/accounts/${account?.id}/view`
            : `/accounts/${account?.id}/view`
        }
      />
    </>
  );
};

const accountColumn: GridColDef[] = [
  {
    headerName: 'Action',
    field: 'action',
    sortable: false,
    renderCell: (param: GridRenderCellParams) => <Action account={param.row} />,
    flex: 0.3,
    minWidth: 120
  },
  {
    headerName: fieldLabel.name,
    field: 'name',
    sortable: true,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      const { msa_id } = useParams<ObjectType>();
      return (
        <RouteLink
          url={
            msa_id
              ? `/msa/${msa_id}/accounts/${row?.id}/view`
              : `/accounts/${row?.id}/view`
          }
          name={row.name}
        />
      );
    }
  },
  {
    headerName: fieldLabel.companyName,
    field: 'company_name',
    sortable: true,
    flex: 1
  },
  {
    headerName: fieldLabel.companyPhone,
    field: 'phone_office',
    sortable: true,
    flex: 1
  },
  {
    headerName: fieldLabel.accountStatus,
    field: 'account_status',
    sortable: false,
    valueGetter: (param: GridValueGetterParams) => {
      return getObjectKeyValue(accountStatusType, param.row.account_status);
    },
    flex: 1
  },
  {
    headerName: fieldLabel.dateEntered,
    field: 'date_entered',
    sortable: true,
    flex: 0.5,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.date_entered);
    }
  }
];

export default accountColumn;
