import { GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import fieldLabel from 'assets/constants/fieldLabel';
import { EmailListItem } from 'types/email-types';
import DateUtility from 'helpers/date-helper';
import { useParams } from 'react-router-dom';
import RouteLink from 'components/link/route-link';
import { ObjectType } from 'types';

export const emailInboxColumns: any[] = [
  {
    headerName: fieldLabel.opportunity,
    field: 'opportunity_name',
    sortable: true,
    flex: 1,
    renderCell: (param: GridRenderCellParams) => {
      const { opportunity_id } = useParams<ObjectType>();
      return (
        <RouteLink
          url={`/opportunities/${opportunity_id}/view`}
          name={param.row.opportunity_name}
        />
      );
    }
  },
  {
    headerName: fieldLabel.name,
    field: 'name',
    sortable: true,
    flex: 1,
    renderCell: (param: GridRenderCellParams) => {
      const { opportunity_id } = useParams<ObjectType>();
      return (
        <RouteLink
          url={`/opportunities/${opportunity_id}/email/inbox/${param.row.id}`}
          name={param.row.name}
        />
      );
    }
  },
  {
    headerName: fieldLabel.subject,
    field: 'subject',
    sortable: true,
    flex: 1,
    renderCell: (param: GridRenderCellParams) => {
      const { opportunity_id } = useParams<ObjectType>();
      return (
        <RouteLink
          url={`/opportunities/${opportunity_id}/email/inbox/${param.row.id}`}
          name={param.row.name}
        />
      );
    }
  },
  {
    headerName: fieldLabel.status,
    field: 'status',
    sortable: true,
    flex: 1
  },

  {
    headerName: fieldLabel.createdDate,
    field: 'date_entered',
    sortable: true,
    flex: 1,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.date_entered);
    }
  }
];
