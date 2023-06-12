import {
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams
} from '@mui/x-data-grid';
import fieldLabel from 'assets/constants/fieldLabel';
import { PartyEntity } from 'types/party-types';
import RouteEditIconLink from 'components/link/route-edit-icon-link';
import RouteOpenNewIconLink from 'components/link/route-open-new-icon-link';
import RouteLink from 'components/link/route-link';
import DateUtility from 'helpers/date-helper';
import partyType from 'assets/constants/party-type';
import partySubtype from 'assets/constants/party-subtype';
import { useParams } from 'react-router-dom';
import { Link, Tooltip } from '@mui/material';
import eventBus from 'helpers/event-bus-helper';
import EVENTS from 'assets/constants/events';

const handleCopy = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  const email = event.currentTarget.innerText;
  navigator.clipboard.writeText(email);
  eventBus.dispatch(EVENTS.SHOW_TOAST, {
    isError: false,
    message: 'Email Copied'
  });
};

const Action = ({ party }: { party: PartyEntity }) => {
  const { opportunity_id } = useParams();

  return (
    <>
      <RouteEditIconLink
        url={
          opportunity_id
            ? `/opportunities/${opportunity_id}/parties/${party.id}/edit`
            : `/parties/${party.id}/edit`
        }
      />
      <RouteOpenNewIconLink
        url={
          opportunity_id
            ? `/opportunities/${opportunity_id}/parties/${party.id}/view`
            : `/parties/${party.id}/view`
        }
      />
    </>
  );
};

const partyColumns: GridColDef[] = [
  {
    headerName: '',
    field: 'action',
    sortable: false,
    renderCell: (param: GridRenderCellParams) => <Action party={param.row} />,
    flex: 0.6
  },
  {
    headerName: fieldLabel.name,
    field: 'name',
    sortable: true,
    flex: 1,
    renderCell: (param: GridRenderCellParams) => (
      <RouteLink url={`/parties/${param.row.id}/view`} name={param.row.name} />
    )
  },
  {
    headerName: fieldLabel.type,
    field: 'type',
    sortable: true,
    flex: 1,
    valueGetter: (params) => partyType[params.row.type] ?? params.row.type
  },
  {
    headerName: fieldLabel.subType,
    field: 'sub_type',
    sortable: true,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => {
      let subType =
        partySubtype[params.row.type] !== undefined &&
        partySubtype[params.row.type]
          .map((x: any) => {
            return x.value === params.row.sub_type ? x.label : '';
          })
          .filter(function (el: any) {
            return el != '';
          });
      if (subType) {
        return subType;
      } else {
        return params.row.sub_type;
      }
    }
  },
  {
    headerName: fieldLabel.emailAddress,
    field: 'email',
    sortable: true,
    flex: 1,
    renderCell: (param: GridRenderCellParams) => (
      <Tooltip title={param.row.email}>
        <Link underline="none" onClick={handleCopy}>
          {param.row.email}
        </Link>
      </Tooltip>
    )
  },
  {
    headerName: fieldLabel.company,
    field: 'company',
    sortable: true,
    flex: 1
  },
  {
    headerName: fieldLabel.mobile,
    field: 'mobile',
    sortable: true,
    flex: 1
  },
  {
    headerName: fieldLabel.address,
    field: 'address',
    sortable: true,
    flex: 1
  },
  {
    headerName: fieldLabel.license,
    field: 'license',
    sortable: true,
    flex: 1
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

export default partyColumns;
