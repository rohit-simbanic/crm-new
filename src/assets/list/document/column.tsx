import MenuItem from '@mui/material/MenuItem';
import marketPreferenceService from 'services/market-preferences';
import { v4 as uuid } from 'uuid';
import eventBus from 'helpers/event-bus-helper';
import RouteLinkBlack from 'components/link/route-link-black';
import DropdownMenu from 'components/dropdown-menu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Box } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import documentStatus from 'assets/constants/document-status';
import documentSubType from 'assets/constants/document-sub-type';
import documentType from 'assets/constants/document-type';
import fieldLabel from 'assets/constants/fieldLabel';
import RouteEditIconLink from 'components/link/route-edit-icon-link';
import RouteLink from 'components/link/route-link';
import RouteOpenNewIconLink from 'components/link/route-open-new-icon-link';
import DateUtility from 'helpers/date-helper';
import { getObjectKeyValue } from 'helpers/object-field-helper';
import { useParams } from 'react-router-dom';
import { DocumentEntity } from 'types/documents-types';
import documentState from 'assets/constants/document-state';
import opportunityService from 'services/oppurtunity-service';

const Action = ({ document }: { document: DocumentEntity }) => {
  const { market_preference_id, opportunity_id } = useParams();

  const removeAssociatedDocument = async (
    market_preference_id: string,
    document_id: string
  ) => {
    await marketPreferenceService.deleteAssociatedDocument(
      market_preference_id,
      document_id
    );
    eventBus.dispatch(`document_refresh`, {});
  };

  const removeAssociatedOpportunityDocument = async (
    opportunity_id: string,
    document_id: string
  ) => {
    await opportunityService.deleteAssociatedDocument(
      opportunity_id,
      document_id
    );
    eventBus.dispatch(`document_refresh`, {});
  };

  const ddMenuItems = [];

  if (market_preference_id) {
    ddMenuItems.push(
      <MenuItem key={uuid()}>
        <RouteLinkBlack
          name={fieldLabel.removeDocument}
          url={`/market-preferences/${market_preference_id}/documents`}
          handleClick={() =>
            removeAssociatedDocument(market_preference_id!, document.id)
          }
        />
      </MenuItem>
    );
  }

  if (opportunity_id) {
    ddMenuItems.push(
      <MenuItem key={uuid()}>
        <RouteLinkBlack
          name={fieldLabel.removeDocument}
          url={`/opportunities/${opportunity_id}/documents/list`}
          handleClick={() =>
            removeAssociatedOpportunityDocument(opportunity_id!, document.id)
          }
        />
      </MenuItem>
    );
  }
  return (
    <>
      {ddMenuItems.length > 0 && <DropdownMenu menuItems={ddMenuItems} />}
      <RouteEditIconLink
        url={
          market_preference_id
            ? `/market-preferences/${market_preference_id}/documents/${document?.id}/edit`
            : `/documents/${document.id}/edit`
        }
      />
      <RouteOpenNewIconLink
        url={
          market_preference_id
            ? `/market-preferences/${market_preference_id}/documents/${document?.id}/view`
            : `/documents/${document.id}/view`
        }
      />
    </>
  );
};

const documentColumns: GridColDef[] = [
  {
    headerName: '',
    field: 'action',
    renderCell: (param: GridRenderCellParams) => (
      <>
        <Action document={param.row} />
        <RouteLink
          url={`/documents/${param.row.document_revision_id}/viewer`}
          name={
            <IconButton>
              <VisibilityIcon />
            </IconButton>
          }
          target={true}
        />
      </>
    ),
    sortable: false,
    flex: 1,
    minWidth: 160
  },
  {
    headerName: fieldLabel.documentName,
    field: 'document_name',
    sortable: true,
    flex: 3,
    minWidth: 400,
    renderCell: ({ row }: GridRenderCellParams) => (
      <Box style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
        <RouteLink url={`/documents/${row.id}/view`} name={row.document_name} />
      </Box>
    )
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
      let rowDocumentType =
        documentSubType[row.category_id] !== undefined &&
        documentSubType[row.category_id]
          .map((x: any) => (x.value === row.document_subtype ? x.label : ''))
          .filter(function (el: any) {
            return el != '';
          });
      if (rowDocumentType.length > 0) {
        return rowDocumentType;
      } else {
        return row.document_subtype;
      }
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
    headerName: fieldLabel.status,
    field: 'status_id',
    sortable: true,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return getObjectKeyValue(documentStatus, row.status_id);
    }
  },
  {
    headerName: fieldLabel.publishDate,
    field: 'active_date',
    sortable: true,
    flex: 1,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateString(row.active_date);
    }
  },
  {
    headerName: fieldLabel.dateModified,
    field: 'date_modified',
    sortable: true,
    flex: 1,
    valueGetter: ({ row }: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(row.date_modified);
    }
  }
];

export default documentColumns;
