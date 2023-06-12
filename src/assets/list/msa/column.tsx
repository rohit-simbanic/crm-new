import { GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import RouteOpenNewIconLink from 'components/link/route-open-new-icon-link';
import RouteEditIconLink from 'components/link/route-edit-icon-link';
import { MsaEntity } from 'types/msa-types';
import RouteLink from 'components/link/route-link';
import fieldLabel from 'assets/constants/fieldLabel';
import useRouteName from 'pages/route-outlet-context';
import { MenuItem } from '@mui/material';
import accountService from 'services/accounts-service';
import eventBus from 'helpers/event-bus-helper';
import { useParams } from 'react-router-dom';
import { ObjectType } from 'types';
import DropdownMenu from 'components/dropdown-menu';
import { v4 as uuid } from 'uuid';
import RouteLinkBlack from 'components/link/route-link-black';
import { getObjectKeyValue } from 'helpers/object-field-helper';
import stateOptions from 'assets/constants/state';

const Action = ({ msa }: { msa: MsaEntity }) => {
  const { account_id } = useParams<ObjectType>();
  const { routeName, setRouteName } = useRouteName();

  const associateMSA = async (account_id: string, msa_id: string) => {
    await accountService.associateMSA(account_id, {
      msa_id: [msa_id]
    });

    eventBus.dispatch('msa_refresh', {});
  };

  const removeAssociatedMSA = async (account_id: string, msa_id: string) => {
    await accountService.deleteAssociatedMSA(account_id, msa_id);
    eventBus.dispatch(`msa_refresh`, {});
  };

  const ddMenuItems = [];

  if (routeName === 'accounts-msa') {
    ddMenuItems.push(
      <MenuItem key={uuid()}>
        <RouteLinkBlack
          name={fieldLabel.removeMsa}
          url={`/accounts/${account_id}/msa/list`}
          handleClick={() => removeAssociatedMSA(account_id, msa.id)}
        />
      </MenuItem>
    );
  }

  if (routeName === 'accounts-msa-selection') {
    ddMenuItems.push(
      <MenuItem key={uuid()}>
        <RouteLinkBlack
          name={fieldLabel.assoicateMsa}
          url={`/accounts/${account_id}/msa/list`}
          handleClick={() => associateMSA(account_id, msa.id)}
        />
      </MenuItem>
    );
  }

  return (
    <>
      {ddMenuItems.length > 0 && <DropdownMenu menuItems={ddMenuItems} />}

      <RouteEditIconLink url={`/msa/${msa.id}/edit`} />
      <RouteOpenNewIconLink url={`/msa/${msa.id}/view`} />
    </>
  );
};

const msaColumn = [
  {
    headerName: 'Action',
    field: 'action',
    sortable: false,
    renderCell: (param: GridRenderCellParams) => <Action msa={param.row} />,
    flex: 0.8
  },
  {
    headerName: fieldLabel.name,
    field: 'name',
    sortable: true,
    flex: 1,
    renderCell: (param: GridRenderCellParams) => (
      <RouteLink url={`/msa/${param.row.id}/view`} name={param.row.name} />
    )
  },
  {
    headerName: fieldLabel.code,
    field: 'code',
    flex: 1,
    sortable: true
  },
  {
    headerName: fieldLabel.state,
    field: 'state',
    flex: 1,
    sortable: true,
    valueGetter: ({ row }: GridValueGetterParams) => {
      return getObjectKeyValue(stateOptions, row.state);
    }
  },
  {
    headerName: fieldLabel.mlsCode,
    field: 'mls_code',
    flex: 1,
    sortable: true
  },
  {
    headerName: fieldLabel.enteraMarketId,
    field: 'entera_market_id',
    flex: 1,
    sortable: true
  },
  {
    headerName: fieldLabel.initialCommission,
    field: 'initial_commission',
    flex: 1,
    sortable: true
  }
];

export default msaColumn;
