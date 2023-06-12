import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams
} from '@mui/x-data-grid';
import fieldLabel from 'assets/constants/fieldLabel';
import RouteOpenNewIconLink from 'components/link/route-open-new-icon-link';
import RouteEditIconLink from 'components/link/route-edit-icon-link';
import RouteLink from 'components/link/route-link';
import { OpportunityContext } from 'pages/opportunity/Context';
import { useContext } from 'react';
import { useParams } from 'react-router';
import { ObjectType } from 'types';
import { EmailListItem } from 'types/email-types';
import DateUtility from 'helpers/date-helper';

const Action = ({ email }: { email: EmailListItem }) => {
  return (
    <>
      <RouteEditIconLink url={`/email/${email.id}/edit`} />
      <RouteOpenNewIconLink url={`/email/${email.id}/view`} />
    </>
  );
};

export const emailDraftColumns: GridColDef[] = [
  {
    headerName: fieldLabel.opportunity,
    field: 'opportunity_name',
    sortable: true,
    flex: 1,
    renderCell: (param: GridRenderCellParams) => {
      const { opportunity_id } = useParams<ObjectType>();
      const { marketPreference } = useContext(OpportunityContext);

      let url;

      if (marketPreference.enable_inbound_email == 1) {
        url = `/email/thred/${param.row.thread_id}`;
      } else {
        url = `/opportunities/${opportunity_id}/email/draft/${param.row.id}`;
      }

      return <RouteLink url={url} name={param.row.opportunity_name} />;
    }
  },
  {
    headerName: fieldLabel.name,
    field: 'name',
    sortable: true,
    flex: 1
  },
  {
    headerName: fieldLabel.subject,
    field: 'subject',
    sortable: true,
    flex: 1,
    valueGetter: (param: GridValueGetterParams) => {
      return param.row.name;
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
