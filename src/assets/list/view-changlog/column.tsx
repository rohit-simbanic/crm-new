import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import fieldLabel from 'assets/constants/fieldLabel';
import WrapTextBox from 'components/box/wrap-text-box';
import DateUtility from 'helpers/date-helper';

const changelogColumn: GridColDef[] = [
  {
    headerName: fieldLabel.field,
    field: 'field_label',
    sortable: false,
    flex: 0.5,
    renderCell: ({ row }: GridRenderCellParams) => (
      <>{row?.field_label || row.field_name}</>
    )
  },
  {
    headerName: fieldLabel.oldValue,
    field: 'before_value_text',
    sortable: false,
    minWidth: 350,
    renderCell: ({ row }: GridRenderCellParams) => (
      <WrapTextBox>
        {row?.before_value_text || row.before_value_string}
      </WrapTextBox>
    ),
    flex: 0.3
  },
  {
    headerName: fieldLabel.newValue,
    field: 'after_value_text',
    sortable: false,
    minWidth: 350,
    renderCell: ({ row }: GridRenderCellParams) => (
      <WrapTextBox>
        {row?.after_value_text || row.after_value_string}
      </WrapTextBox>
    ),
    flex: 0.3
  },
  {
    headerName: fieldLabel.createdBy,
    field: 'created_by',
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => (
      <>{row.created_by?.user_name}</>
    ),
    flex: 0.5
  },
  {
    headerName: fieldLabel.changeDate,
    field: 'date_created',
    sortable: true,
    renderCell: ({ row }: GridRenderCellParams) => (
      <>{DateUtility.convertUTCtoTimeZone(row.date_created)}</>
    ),
    flex: 0.5
  }
];

export default changelogColumn;
