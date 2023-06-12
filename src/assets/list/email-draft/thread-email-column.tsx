import Chip from '@mui/material/Chip';
import { GridRenderCellParams } from '@mui/x-data-grid';
import fieldLabel from 'assets/constants/fieldLabel';
import RouteLink from 'components/link/route-link';
import DateUtility from 'helpers/date-helper';
import { useParams } from 'react-router-dom';
import { ObjectType } from 'types';

export const threadEmailColumns: any[] = [
  {
    headerName: fieldLabel.opportunity,
    field: 'opportunity',
    sortable: true,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      const { opportunity_id } = useParams<ObjectType>();

      return (
        <>
          <RouteLink
            url={
              opportunity_id
                ? `/opportunities/${opportunity_id}/email/draft/thread/${row.thread_id}`
                : `/email/draft/${row.thread_id}`
            }
            name={`${row?.opportunity?.name}`}
          />{' '}
          &nbsp;
          {row?.thread_emails_count > 0 ? (
            <Chip label={row?.thread_emails_count} size="small" />
          ) : (
            ''
          )}
        </>
      );
    }
  },
  {
    headerName: fieldLabel.subject,
    field: 'name',
    sortable: true,
    flex: 1
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
    renderCell: ({ row }: GridRenderCellParams) => (
      <>{DateUtility.getDateTimeString(row.date_entered)}</>
    )
  }
];
