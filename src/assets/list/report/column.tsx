import fieldLabel from 'assets/constants/fieldLabel';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import RouteLink from 'components/link/route-link';
import { ReportListEntity } from 'types/report';
import LinkExtenalOpenNewIcon from 'components/link/link-external-open-new-icon';
import userFullName from 'helpers/user-name-helper';
import { getObjectKeyValue } from 'helpers/object-field-helper';
import reportType from 'assets/constants/report-type';
import DateUtility from 'helpers/date-helper';
import envConfig from 'config/env';

const Action = ({ report }: { report: ReportListEntity }) => {
  let token = localStorage.getItem('accessToken')!;
  let action =
    report.report_type === 'raw_query' ? 'RawQueryView' : 'DetailView';
  return (
    <>
      <LinkExtenalOpenNewIcon
        url={`${envConfig.REACT_APP_CRM_URL}/index.php?module=AOR_Reports&action=${action}&record=${report.id}&source=${token}`}
      />
    </>
  );
};

const reportColumn: GridColDef[] = [
  {
    headerName: '',
    field: 'action',
    sortable: false,
    renderCell: (param: GridRenderCellParams) => <Action report={param.row} />,
    flex: 0.3
  },
  {
    headerName: fieldLabel.name,
    field: 'name',
    sortable: true,
    flex: 1,
    renderCell: (param: GridRenderCellParams) => (
      <RouteLink url={`/reports/${param.row.id}/view`} name={param.row.name} />
    )
  },
  {
    headerName: fieldLabel.reportType,
    field: 'report_type',
    sortable: true,
    flex: 1,
    valueGetter: (param: GridRenderCellParams) => {
      return getObjectKeyValue(reportType, param.row.report_type);
    }
  },
  {
    headerName: fieldLabel.module,
    field: 'report_module',
    sortable: true,
    flex: 1
  },
  {
    headerName: fieldLabel.lastVisitedAt,
    field: 'last_visited_at',
    sortable: true,
    flex: 1,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.last_visited_at);
    }
  },
  {
    headerName: fieldLabel.assignedTo,
    field: 'assigned_user_name',
    sortable: true,
    flex: 1,
    valueGetter: (param: GridRenderCellParams) => {
      return `${userFullName(param.row.assigned_to)}`;
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
  }
];

export default reportColumn;
