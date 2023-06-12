import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import fieldLabel from 'assets/constants/fieldLabel';
import RouteLink from 'components/link/route-link';
import { getObjectKeyValue } from 'helpers/object-field-helper';
import documentStatus from 'assets/constants/document-status';
import { useParams } from 'react-router-dom';
import { ObjectType } from 'types';
import documentState from 'assets/constants/document-state';

const documentRevisionColumns: GridColDef[] = [
  {
    headerName: fieldLabel.fileName,
    field: 'filename',
    sortable: true,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      const { document_id } = useParams<ObjectType>();

      return (
        <RouteLink
          url={`/documents/${document_id}/revisions/${row.id}`}
          name={row.filename}
        />
      );
    }
  },
  {
    headerName: fieldLabel.revision,
    field: 'revision',
    sortable: false,
    flex: 1
  },
  {
    headerName: fieldLabel.documentState,
    field: 'state',
    sortable: false,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return getObjectKeyValue(documentState, row.state);
    }
  },
  {
    headerName: fieldLabel.documentStatus,
    field: 'status',
    sortable: false,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return getObjectKeyValue(documentStatus, row.status);
    }
  }
];

export default documentRevisionColumns;
