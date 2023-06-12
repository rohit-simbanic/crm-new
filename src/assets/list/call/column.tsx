import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import fieldLabel from 'assets/constants/fieldLabel';
import DateUtility from 'helpers/date-helper';
import { isEmpty } from 'helpers/misc-helper';

const callColumn: GridColDef[] = [
  {
    headerName: 'Direction',
    field: 'direction',
    sortable: false,
    flex: 0.5
  },
  {
    headerName: 'Subject',
    field: 'name',
    sortable: true,
    flex: 0.5
  },
  {
    headerName: 'Customer User',
    field: 'customer_user',
    sortable: false,
    flex: 0.5,
    renderCell: ({ row }: GridRenderCellParams) => {
      const name = [row.contact_first_name ?? '', row.contact_last_name ?? ''];
      return name.join(' ');
    }
  },
  {
    headerName: 'Related to',
    field: 'opportunity_name',
    sortable: false,
    flex: 0.5,
    renderCell: ({ row }: GridRenderCellParams) => {
      return row?.opportunity?.name ?? '';
    }
  },
  {
    headerName: 'Start Date',
    field: 'date_start',
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.date_start);
    }
  },
  {
    headerName: 'Assigned User',
    field: 'assigned_to',
    sortable: true,
    flex: 0.5,
    renderCell: ({ row }: GridRenderCellParams) => {
      const name = [
        row.assign_user_first_name ?? '',
        row.assign_user_last_name ?? ''
      ];
      return name.join(' ');
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

export default callColumn;
