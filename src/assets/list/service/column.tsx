import fieldLabel from 'assets/constants/fieldLabel';
import {
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams
} from '@mui/x-data-grid';
import { getObjectKeyValue } from 'helpers/object-field-helper';
import RouteEditIconLink from 'components/link/route-edit-icon-link';
import RouteLink from 'components/link/route-link';
import { useParams } from 'react-router-dom';
import { ObjectType } from 'types';
import { ServiceEntity } from 'types/service-types';
import { isEmpty } from 'helpers/misc-helper';
import serviceType from 'assets/constants/service-type';
import DateUtility from 'helpers/date-helper';
import RouteOpenNewIconLink from 'components/link/route-open-new-icon-link';
import DropdownMenu from 'components/dropdown-menu';
import { MenuItem } from '@mui/material';
import RouteLinkBlack from 'components/link/route-link-black';
import { v4 as uuid } from 'uuid';
import { removeService } from 'helpers/service/service-action-helper';

const Action = ({ service }: { service: ServiceEntity }) => {
  const { opportunity_id } = useParams<ObjectType>();

  const ddMenuItems = [];

  if (opportunity_id) {
    ddMenuItems.push(
      <MenuItem key={uuid()}>
        <RouteLinkBlack
          name={fieldLabel.removeService}
          url={`#`}
          handleClick={() => removeService(service.id)}
        />
      </MenuItem>
    );
  }

  return (
    <>
      {ddMenuItems.length > 0 && <DropdownMenu menuItems={ddMenuItems} />}
      <RouteEditIconLink
        url={
          opportunity_id
            ? `/opportunities/${opportunity_id}/services/${service.id}/edit`
            : `/services/${service.id}/edit`
        }
      />
      <RouteOpenNewIconLink
        url={
          opportunity_id
            ? `/opportunities/${opportunity_id}/services/${service.id}/view`
            : `/services/${service.id}/view`
        }
      />
    </>
  );
};

const serviceColumn: GridColDef[] = [
  {
    headerName: '',
    field: 'action',
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => <Action service={row} />,
    flex: 0.7,
    minWidth: 100
  },
  {
    headerName: fieldLabel.serviceType,
    field: 'service_type',
    sortable: true,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      const { opportunity_id } = useParams<ObjectType>();

      return (
        <RouteLink
          url={
            opportunity_id
              ? `/opportunities/${opportunity_id}/services/${row.id}/view`
              : `/services/${row.id}/view`
          }
          name={getObjectKeyValue(serviceType, row.inspection_type)}
        />
      );
    }
  },
  {
    headerName: fieldLabel.inspectionDate,
    field: 'inspection_date',
    sortable: true,
    flex: 1,
    valueGetter: ({ row }: GridValueGetterParams) => {
      return DateUtility.getDateTimeString(row.inspection_date);
    }
  },
  {
    headerName: fieldLabel.requestInfo,
    field: 'request_info',
    sortable: true,
    flex: 1
  },
  {
    headerName: fieldLabel.requestedBy,
    field: 'requested_by',
    sortable: true,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return !isEmpty(row?.requested_user_first_name) ||
        !isEmpty(row?.requested_user_last_name)
        ? row?.requested_user_first_name + ' ' + row?.requested_user_last_name
        : ' ';
    }
  },
  {
    headerName: fieldLabel.requestedDate,
    field: 'request_date',
    flex: 1,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateString(row.requested_date);
    }
  },
  {
    headerName: fieldLabel.inspectionConfirmationBy,
    field: 'inspection_confirmation_by',
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return !isEmpty(row?.confirmation_user_first_name) ||
        !isEmpty(row?.confirmation_user_last_name)
        ? row?.confirmation_user_first_name +
            ' ' +
            row?.confirmation_user_last_name
        : ' ';
    }
  },
  {
    headerName: fieldLabel.inspectionConfirmationDate,
    field: 'confirmation_date',
    flex: 1,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateString(row.confirmation_date);
    }
  },
  {
    headerName: fieldLabel.dateEntered,
    field: 'date_entered',
    flex: 1,
    sortable: true,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.date_entered);
    }
  },
  {
    headerName: fieldLabel.dateModified,
    field: 'date_modified',
    flex: 1,
    sortable: true,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.date_modified);
    }
  }
];

export default serviceColumn;
