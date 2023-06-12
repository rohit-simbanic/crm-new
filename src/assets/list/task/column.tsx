import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import fieldLabel from 'assets/constants/fieldLabel';
import DateUtility from 'helpers/date-helper';
import { isEmpty } from 'helpers/misc-helper';

const taskColumn: GridColDef[] = [
  {
    headerName: 'Subject',
    field: 'name',
    sortable: true,
    flex: 1.5
  },
  {
    headerName: 'Status',
    field: 'status',
    sortable: true,
    flex: 0.5
  },
  {
    headerName: 'Due Date',
    field: 'date_due',
    sortable: true,
    flex: 0.5,
    renderCell: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateString(row.date_due);
    }
  },
  {
    headerName: 'Due Time',
    field: 'date_time',
    sortable: false,
    flex: 0.5,
    renderCell: ({ row }: GridRenderCellParams) => {
      return DateUtility.getTimeString(row.date_due);
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

export default taskColumn;
