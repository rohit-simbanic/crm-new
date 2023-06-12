import { GridRenderCellParams } from '@mui/x-data-grid';
import origin from 'assets/constants/message-origin';
import sqsStatus from 'assets/constants/sqs-status';
import RouteOpenNewIconLink from 'components/link/route-open-new-icon-link';
import RouteEditIconLink from 'components/link/route-edit-icon-link';
import DateUtility from 'helpers/date-helper';
import { useParams } from 'react-router-dom';
import { SQSEntity } from 'types/sqs-types';
import RouteLink from 'components/link/route-link';

const Action = ({ sqs }: { sqs: SQSEntity }) => {
  const { opportunity_id } = useParams();

  return (
    <>
      <RouteEditIconLink
        url={
          opportunity_id
            ? `/opportunities/${opportunity_id}/sqs/${sqs.id}/edit`
            : `/sqs/${sqs.id}/edit`
        }
      />
      <RouteOpenNewIconLink
        url={
          opportunity_id
            ? `/opportunities/${opportunity_id}/sqs/${sqs.id}/view`
            : `/sqs/${sqs.id}/view`
        }
      />
    </>
  );
};

export const sqsColumns = [
  {
    headerName: '',
    field: 'action',
    sortable: false,
    renderCell: (param: GridRenderCellParams) => <Action sqs={param.row} />,
    flex: 0.6,
    minWidth: 100
  },
  {
    headerName: 'Event',
    field: 'name',
    sortable: true,
    flex: 1,
    renderCell: (param: GridRenderCellParams) => {
      const { opportunity_id } = useParams();

      return (
        <RouteLink
          url={
            opportunity_id
              ? `/opportunities/${opportunity_id}/sqs/${param.row.id}/view`
              : `/sqs/${param.row.id}/view`
          }
          name={param.row.name}
        />
      );
    }
  },
  {
    headerName: 'Opportunity',
    field: 'opportunity_id',
    sortable: false,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return <label className="text-start">{row?.opportunity?.name}</label>;
    }
  },
  {
    headerName: 'Market Preference Name',
    field: 'market_preference_id',
    sortable: false,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <label className="text-start">{row?.market_preference?.name}</label>
      );
    }
  },
  {
    headerName: 'Status',
    field: 'status',
    sortable: true,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <label className="text-start">
          {row.status ? sqsStatus[row.status] : row.status}
        </label>
      );
    }
  },
  {
    headerName: 'Message Origin',
    field: 'origin',
    sortable: false,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <label className="text-start">
          {row.origin ? origin[row.origin] : row.origin}
        </label>
      );
    }
  },
  {
    headerName: 'Queue',
    field: 'queue',
    sortable: true,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return <label className="text-start">{row.queue}</label>;
    }
  },
  {
    headerName: 'Date Sent',
    field: 'date_sent',
    sortable: true,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.date_sent);
    }
  },
  {
    headerName: 'Date Created',
    field: 'date_entered',
    sortable: true,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.date_entered);
    }
  }
];
