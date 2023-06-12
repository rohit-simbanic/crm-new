import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams
} from '@mui/x-data-grid';
import brokerageTransactionRole from 'assets/constants/brokerage-transaction-roles';
import fieldLabel from 'assets/constants/fieldLabel';
import marketPreferenceBrokerageUserStatus from 'assets/constants/market-preference-brokerage-user-status';
import RouteLink from 'components/link/route-link';
import RouteOpenNewIconLink from 'components/link/route-open-new-icon-link';
import ActionDropdown from 'features/market-preference-brokerage-users/action';
import DateUtility from 'helpers/date-helper';
import { getObjectKeyValue } from 'helpers/object-field-helper';
import userFullName from 'helpers/user-name-helper';
import { useParams } from 'react-router-dom';
import { MarketPreferenceBrokerageUserEntity } from 'types/market-preference-brokerage-user-types';

const Action = ({
  marketPreferenceBrokerageUser
}: {
  marketPreferenceBrokerageUser: MarketPreferenceBrokerageUserEntity;
}) => {
  const { market_preference_id } = useParams();
  return (
    <>
      <ActionDropdown data={marketPreferenceBrokerageUser} />

      <RouteOpenNewIconLink
        url={`/market-preferences-brokerage-users/${marketPreferenceBrokerageUser.id}/view`}
      />
    </>
  );
};

const marketPreferenceBrokerageUserColumn: GridColDef[] = [
  {
    headerName: '',
    field: 'action',
    sortable: false,
    renderCell: (param: GridRenderCellParams) => (
      <Action marketPreferenceBrokerageUser={param.row} />
    ),
    flex: 0.7,
    minWidth: 120
  },
  {
    headerName: fieldLabel.name,
    field: 'name',
    sortable: true,
    flex: 3,
    renderCell: (param: GridRenderCellParams) => (
      <RouteLink
        url={`/market-preferences-brokerage-users/${param.row.id}/view`}
        name={param.row.name}
      />
    )
  },
  {
    headerName: fieldLabel.status,
    field: 'status',
    sortable: true,
    flex: 1,
    valueGetter: ({ row }: GridValueGetterParams) => {
      return getObjectKeyValue(marketPreferenceBrokerageUserStatus, row.status);
    }
  },
  {
    headerName: fieldLabel.brokerageRole,
    field: 'brokerage_role',
    sortable: false,
    flex: 1,
    valueGetter: (params: GridRenderCellParams) => {
      if (params.row.brokerage_transaction_role) {
        return `${
          brokerageTransactionRole[
            params.row.brokerage_transaction_role.name
          ] ?? params.row.brokerage_transaction_role.name
        }`;
      } else {
        return ``;
      }
    }
  },
  {
    headerName: fieldLabel.brokerageUser,
    field: `brokerage_user`,
    sortable: false,
    flex: 1,
    valueGetter: (param: GridValueGetterParams) => {
      return `${userFullName(param.row.brokerage_user)}`;
    }
  },
  {
    headerName: fieldLabel.marketPreferenceName,
    field: 'market_preference_name',
    sortable: false,
    flex: 1,
    valueGetter: ({ row }: GridValueGetterParams) => {
      return `${row?.market_preference?.name}`;
    }
  },
  {
    headerName: fieldLabel.lastActivatedAt,
    field: 'last_activated_at',
    sortable: true,
    flex: 1,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.last_activated_at);
    }
  },
  {
    headerName: fieldLabel.lastDeactivatedAt,
    field: 'last_deactivated_at',
    sortable: true,
    flex: 1,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.last_deactivated_at);
    }
  }
];

export default marketPreferenceBrokerageUserColumn;
