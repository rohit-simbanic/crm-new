import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams
} from '@mui/x-data-grid';
import fieldLabel from 'assets/constants/fieldLabel';
import UnitSwitch from 'components/form/unit-switch';
import RouteOpenNewIconLink from 'components/link/route-open-new-icon-link';
import RouteEditIconLink from 'components/link/route-edit-icon-link';
import RouteLink from 'components/link/route-link';
import { MarketPreferenceEntity } from 'types/market-preferences';
import crmStatusType from 'assets/constants/crm-status-type';
import { getObjectKeyValue } from 'helpers/object-field-helper';
import DateUtility from 'helpers/date-helper';
import { useParams } from 'react-router-dom';
import { ObjectType } from 'types';
import marketPreferenceService from 'services/market-preferences';
import { v4 as uuid } from 'uuid';
import { MenuItem } from '@mui/material';
import RouteLinkBlack from 'components/link/route-link-black';
import DropdownMenu from 'components/dropdown-menu';
import eventBus from 'helpers/event-bus-helper';
import { isEmpty } from 'helpers/misc-helper';
import { removeAssociatedMarketPreference } from 'helpers/market-preference/market-preference-action-helper';

const Action = ({
  marketPreference
}: {
  marketPreference: MarketPreferenceEntity;
}) => {
  const { email_template_id } = useParams<ObjectType>();

  const ddMenuItems = [];

  if (email_template_id) {
    ddMenuItems.push(
      <MenuItem key={uuid()}>
        <RouteLinkBlack
          name={fieldLabel.removeMarketPreference}
          url={`#`}
          handleClick={() =>
            removeAssociatedMarketPreference(
              marketPreference.id!,
              email_template_id
            )
          }
        />
      </MenuItem>
    );
  }

  return (
    <>
      {ddMenuItems.length > 0 && <DropdownMenu menuItems={ddMenuItems} />}
      {isEmpty(email_template_id) ? (
        <RouteEditIconLink
          url={`/market-preferences/${marketPreference.id}/edit`}
        />
      ) : (
        <></>
      )}
      <RouteOpenNewIconLink
        url={`/market-preferences/${marketPreference.id}/view`}
      />
    </>
  );
};

const marketPreferenceColumn: GridColDef[] = [
  {
    headerName: '',
    field: 'action',
    sortable: false,
    renderCell: (param: GridRenderCellParams) => (
      <Action marketPreference={param.row} />
    ),
    flex: 0.8
  },
  {
    headerName: fieldLabel.name,
    field: 'name',
    sortable: true,
    flex: 1,
    renderCell: (param: GridRenderCellParams) => (
      <RouteLink
        url={`/market-preferences/${param.row.id}/view`}
        name={param.row.name}
      />
    )
  },
  {
    headerName: fieldLabel.accountName,
    field: 'account_name',
    sortable: true,
    flex: 1
  },
  {
    headerName: fieldLabel.msaName,
    field: 'msa_name',
    sortable: true,
    flex: 1
  },
  {
    headerName: fieldLabel.crmStatus,
    field: 'crm_status',
    sortable: true,
    flex: 1,
    valueGetter: ({ row }: GridValueGetterParams) => {
      return getObjectKeyValue(crmStatusType, row.crm_status);
    }
  },
  {
    headerName: fieldLabel.enableMpWiseContract,
    field: 'enable_mp_wise_contract',
    sortable: false,
    flex: 1,
    renderCell: (param: GridRenderCellParams) => (
      <UnitSwitch
        value={param.row.enable_mp_wise_contract ?? 0}
        onChange={() => {
          return '';
        }}
        name="enable_mp_wise_contract"
        label=""
      />
    )
  },
  {
    headerName: fieldLabel.dateModified,
    field: 'date_modified',
    sortable: true,
    flex: 0.5,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.date_entered);
    }
  }
];

export default marketPreferenceColumn;
