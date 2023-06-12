import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import documentStatus from 'assets/constants/document-status';
import documentType from 'assets/constants/document-type';
import fieldLabel from 'assets/constants/fieldLabel';
import UnitItem from 'components/form/unit-item';
import RouteLink from 'components/link/route-link';
import eventBus from 'helpers/event-bus-helper';
import { getObjectKeyValue } from 'helpers/object-field-helper';

const emailAttachmentColumns: GridColDef[] = [
  {
    headerName: '',
    field: 'action',
    sortable: false,
    flex: 0.6,
    minWidth: 50,
    maxWidth: 50,
    renderCell: ({ row }: GridRenderCellParams) => (
      <>
        <IconButton
          color="primary"
          onClick={() => {
            eventBus.dispatch('ATTACH_DOCS', {
              id: row.id,
              name: row.document_name
            });
          }}
        >
          <AddIcon />
        </IconButton>
      </>
    )
  },
  {
    headerName: fieldLabel.documentName,
    field: 'document_name',
    sortable: true,
    flex: 1,
    minWidth: 350,
    renderCell: ({ row }: GridRenderCellParams) => (
      <Box
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowWrap: 'break-word'
        }}
      >
        {row.document_name}
      </Box>
    )
  },

  {
    headerName: fieldLabel.documentType,
    field: 'category_id',
    sortable: false,
    flex: 1,
    minWidth: 150,
    renderCell: ({ row }: GridRenderCellParams) => {
      return getObjectKeyValue(documentType, row.category_id);
    }
  },
  {
    headerName: 'status',
    field: 'status_id',
    sortable: true,
    flex: 0.6,
    minWidth: 120,
    renderCell: ({ row }: GridRenderCellParams) => {
      return getObjectKeyValue(documentStatus, row.status_id);
    }
  }
];

export default emailAttachmentColumns;
