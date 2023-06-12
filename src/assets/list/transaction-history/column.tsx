import fieldLabel from 'assets/constants/fieldLabel';
import RouteOpenNewIconLink from 'components/link/route-open-new-icon-link';
import {
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams
} from '@mui/x-data-grid';
import RouteLink from 'components/link/route-link';
import { TransactionHistoryEntity } from 'types/transaction-history-types';
import { useParams } from 'react-router-dom';
import oppurtunityStatusOptions from 'assets/constants/oppurtunity-status-options';
import DateUtility from 'helpers/date-helper';

const Action = ({
  transactionHistory
}: {
  transactionHistory: TransactionHistoryEntity;
}) => {
  const { opportunity_id } = useParams();

  return (
    <>
      <RouteOpenNewIconLink
        url={
          opportunity_id
            ? `/opportunities/${opportunity_id}/transaction-histories/${transactionHistory.id}/view`
            : `/transaction-histories/${transactionHistory.id}/view`
        }
      />
    </>
  );
};

const transactionHistoryColumn: GridColDef[] = [
  {
    headerName: '',
    field: 'action',
    sortable: false,
    renderCell: (param: GridRenderCellParams) => (
      <Action transactionHistory={param.row} />
    ),
    flex: 0.3
  },
  {
    headerName: fieldLabel.name,
    field: 'name',
    sortable: true,
    flex: 1,
    renderCell: (param: GridRenderCellParams) => (
      <RouteLink
        url={`/transaction-histories/${param.row.id}/view`}
        name={param.row.name}
      />
    )
  },
  {
    headerName: fieldLabel.originalStatus,
    field: 'original_status',
    sortable: true,
    flex: 1,
    valueGetter: (param: GridValueGetterParams) => {
      return `${oppurtunityStatusOptions[param.row.original_status]}`;
    }
  },
  {
    headerName: fieldLabel.changedStatus,
    field: 'changed_status',
    sortable: true,
    flex: 1,
    valueGetter: (param: GridValueGetterParams) => {
      return `${oppurtunityStatusOptions[param.row.changed_status]}`;
    }
  },
  {
    headerName: fieldLabel.transactionDetail,
    field: 'transaction_detail',
    sortable: true,
    flex: 1
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

export default transactionHistoryColumn;
