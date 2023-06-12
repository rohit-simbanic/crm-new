import Chip from '@mui/material/Chip';
import { GridRenderCellParams } from '@mui/x-data-grid';
import fieldLabel from 'assets/constants/fieldLabel';
import LinkExtenalOpenNewIcon from 'components/link/link-external-open-new-icon';
import RouteLink from 'components/link/route-link';
import DateUtility from 'helpers/date-helper';
import { useParams } from 'react-router-dom';
import { ObjectType } from 'types';
import { EmailThreadListItem } from 'types/email-types';

const Action = ({ email }: { email: EmailThreadListItem }) => {
  const { opportunity_id } = useParams<ObjectType>();
  return (
    <>
      <LinkExtenalOpenNewIcon
        url={
          opportunity_id
            ? `/app/opportunities/${opportunity_id}/email/inbox/thread/${email.thread_id}`
            : `/app/email/inbox/${email.thread_id}`
        }
      />
    </>
  );
};

export const threadEmailColumns: any[] = [
  {
    headerName: '',
    field: 'action',
    sortable: false,
    renderCell: (param: GridRenderCellParams) => <Action email={param.row} />,
    flex: 0.3
  },
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
            url={`/opportunities/${row?.opportunity?.id}/view`}
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
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      const { opportunity_id } = useParams<ObjectType>();

      return (
        <>
          <RouteLink
            url={
              opportunity_id
                ? `/opportunities/${opportunity_id}/email/inbox/${row.thread_id}`
                : `/email/inbox/${row.thread_id}`
            }
            name={`${row?.name}`}
          />
        </>
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
    renderCell: ({ row }: GridRenderCellParams) => (
      <>{DateUtility.getDateTimeString(row.date_entered)}</>
    )
  }
];
