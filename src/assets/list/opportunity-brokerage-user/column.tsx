import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams
} from '@mui/x-data-grid';
import brokerageTransactionRole from 'assets/constants/brokerage-transaction-roles';
import crmStatusType from 'assets/constants/crm-status-type';
import fieldLabel from 'assets/constants/fieldLabel';
import UnitSwitch from 'components/form/unit-switch';
import RouteEditIconLink from 'components/link/route-edit-icon-link';
import RouteLink from 'components/link/route-link';
import RouteOpenNewIconLink from 'components/link/route-open-new-icon-link';
import DateUtility from 'helpers/date-helper';
import userFullName from 'helpers/user-name-helper';
import { useParams } from 'react-router-dom';
import { OpportunityBrokerageUserEntity } from 'types/opportunity-brokerage-user-types';

const Action = ({
  opportunityBrokerageUser
}: {
  opportunityBrokerageUser: OpportunityBrokerageUserEntity;
}) => {
  const { opportunity_id } = useParams();

  return (
    <>
      <RouteEditIconLink
        url={
          opportunity_id
            ? `/opportunities/${opportunity_id}/opportunity-brokerage-users/${opportunityBrokerageUser.id}/edit`
            : `/opportunity-brokerage-users/${opportunityBrokerageUser.id}/edit`
        }
      />
      <RouteOpenNewIconLink
        url={
          opportunity_id
            ? `/opportunities/${opportunity_id}/opportunity-brokerage-users/${opportunityBrokerageUser.id}/view`
            : `/opportunity-brokerage-users/${opportunityBrokerageUser.id}/view`
        }
      />
    </>
  );
};

const opportunityBrokerageUsersColumn: GridColDef[] = [
  {
    headerName: '',
    field: 'action',
    sortable: false,
    renderCell: (param: GridRenderCellParams) => (
      <Action opportunityBrokerageUser={param.row} />
    ),
    flex: 0.5,
    minWidth: 100
  },
  {
    headerName: fieldLabel.name,
    field: 'name',
    sortable: true,
    flex: 1,
    renderCell: (param: GridRenderCellParams) => (
      <RouteLink
        url={`/opportunity-brokerage-users/${param.row.id}/view`}
        name={param.row.name}
      />
    )
  },
  {
    headerName: fieldLabel.opportunity,
    field: 'opportunity_id',
    sortable: false,
    flex: 1,
    valueGetter: ({ row }: GridValueGetterParams) => {
      return `${row?.opportunity?.name}`;
    }
  },
  {
    headerName: fieldLabel.marketPreference,
    field: 'market_preference_id',
    sortable: false,
    flex: 1,
    valueGetter: ({ row }: GridValueGetterParams) => {
      return `${row?.market_preference?.name}`;
    }
  },
  {
    headerName: fieldLabel.primary,
    field: 'primary_user',
    sortable: false,
    flex: 1,
    renderCell: (param: GridRenderCellParams) => (
      <UnitSwitch
        value={param.row.primary_user ?? 0}
        onChange={() => {
          return '';
        }}
        disabled
        name="primary_user"
        label=""
      />
    )
  },
  {
    headerName: fieldLabel.brokerageRole,
    field: 'brokerage_transaction_role_name',
    sortable: false,
    flex: 1,
    valueGetter: (param: GridValueGetterParams) => {
      return `${
        brokerageTransactionRole[param.row.brokerage_transaction_role?.name] ??
        param.row.brokerage_transaction_role?.name ??
        ''
      }`;
    }
  },
  {
    headerName: fieldLabel.status,
    field: 'status',
    sortable: true,
    flex: 1,
    valueGetter: (param: GridValueGetterParams) => {
      return `${crmStatusType[param.row.status]}`;
    }
  },
  {
    headerName: fieldLabel.user,
    field: 'brokerage_user_name',
    sortable: false,
    flex: 1,
    valueGetter: (param: GridValueGetterParams) => {
      return `${userFullName(param.row.brokerage_user)}`;
    }
  },
  {
    headerName: fieldLabel.lastActivatedAt,
    field: 'last_activated_at',
    sortable: true,
    flex: 0.5,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.last_activated_at);
    }
  },
  {
    headerName: fieldLabel.lastDeactivatedAt,
    field: 'last_deactivated_at',
    sortable: true,
    flex: 0.5,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.last_deactivated_at);
    }
  },
  {
    headerName: fieldLabel.dateEntered,
    field: 'date_entered',
    sortable: true,
    flex: 0.5,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.date_entered);
    }
  },
  {
    headerName: fieldLabel.dateModified,
    field: 'date_modified',
    sortable: true,
    flex: 0.5,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.date_modified);
    }
  }
];

export default opportunityBrokerageUsersColumn;
