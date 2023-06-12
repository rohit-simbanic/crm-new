import {
  associateMpPDFTemplate,
  removeAssociationMpPDFTemplate
} from 'helpers/pdf-template/pdf-template-action-helper';
import { getObjectKeyValue } from 'helpers/object-field-helper';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { MenuItem } from '@mui/material';
import { ObjectType } from 'types';
import { OpportunityContext } from 'pages/opportunity/Context';
import { PdfTemplateEntity } from 'types/pdf-template-type';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import DateUtility from 'helpers/date-helper';
import documentState from 'assets/constants/document-state';
import documentSubType from 'assets/constants/document-sub-type';
import documentType from 'assets/constants/document-type';
import DropdownMenu from 'components/dropdown-menu';
import fieldLabel from 'assets/constants/fieldLabel';
import GenerateContractConfirmationModal from 'features/pdf-template/generate-contract-confirmation';
import RouteEditIconLink from 'components/link/route-edit-icon-link';
import RouteLink from 'components/link/route-link';
import RouteLinkBlack from 'components/link/route-link-black';
import RouteOpenNewIconLink from 'components/link/route-open-new-icon-link';
import state from 'assets/constants/state';
import useRouteName from 'pages/route-outlet-context';

const Action = ({ pdfTemplate }: { pdfTemplate: PdfTemplateEntity }) => {
  const { market_preference_id, opportunity_id } = useParams<ObjectType>();

  const { routeName } = useRouteName();

  const ddMenuItems = [];

  if (market_preference_id) {
    if (routeName === 'market-preferences-contracts') {
      ddMenuItems.push(
        <MenuItem key={uuid()}>
          <RouteLinkBlack
            name={fieldLabel.removePdfTemplate}
            url={`/market-preferences/${market_preference_id}/contracts`}
            handleClick={() =>
              removeAssociationMpPDFTemplate(
                market_preference_id!,
                pdfTemplate.id
              )
            }
          />
        </MenuItem>
      );
    }
    if (routeName === 'market-preferences-contracts-selection') {
      ddMenuItems.push(
        <MenuItem key={uuid()}>
          <RouteLinkBlack
            name={fieldLabel.addPdfTemplate}
            url={`/market-preferences/${market_preference_id}/contracts`}
            handleClick={() =>
              associateMpPDFTemplate(market_preference_id!, pdfTemplate.id)
            }
          />
        </MenuItem>
      );
    }
  }

  if (opportunity_id) {
    const { oppurtunity } = useContext(OpportunityContext);
    return (
      <GenerateContractConfirmationModal
        opportunity={oppurtunity}
        pdfTemplate={pdfTemplate}
      />
    );
  }
  return (
    <>
      {ddMenuItems.length > 0 && <DropdownMenu menuItems={ddMenuItems} />}

      {routeName !== 'market-preferences-contracts-selection' && (
        <RouteEditIconLink
          url={
            market_preference_id
              ? `/market-preferences/${market_preference_id}/contracts/${pdfTemplate.id}/edit`
              : `/pdf-templates/${pdfTemplate.id}/edit`
          }
        />
      )}
      {!market_preference_id && (
        <RouteOpenNewIconLink
          url={
            market_preference_id
              ? `/market-preferences/${market_preference_id}/contracts/${pdfTemplate.id}/view`
              : `/pdf-templates/${pdfTemplate.id}/view`
          }
        />
      )}
    </>
  );
};

const pdfTemplateColumn: GridColDef[] = [
  {
    headerName: '',
    field: 'action',
    sortable: false,
    renderCell: (param: GridRenderCellParams) => (
      <Action pdfTemplate={param.row} />
    ),
    flex: 0.5,
    minWidth: 120
  },
  {
    headerName: fieldLabel.name,
    field: 'name',
    sortable: true,
    flex: 1,
    renderCell: (param: GridRenderCellParams) => (
      <RouteLink
        url={`/pdf-templates/${param.row.id}/view`}
        name={param.row.name}
      />
    )
  },
  {
    headerName: fieldLabel.state,
    field: 'state_c',
    sortable: true,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return getObjectKeyValue(state, row.state_c);
    }
  },
  {
    headerName: fieldLabel.documentType,
    field: 'category_id',
    sortable: true,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return getObjectKeyValue(documentType, row.category_id);
    }
  },
  {
    headerName: fieldLabel.documentSubType,
    field: 'document_subtype',
    sortable: true,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        documentSubType[row.category_id] !== undefined &&
        documentSubType[row.category_id].map((x: any) =>
          x.value === row.document_subtype ? x.label : ''
        )
      );
    }
  },
  {
    headerName: fieldLabel.documentState,
    field: 'document_state',
    sortable: true,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return getObjectKeyValue(documentState, row.document_state);
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

export default pdfTemplateColumn;
