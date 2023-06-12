import CreateIcon from '@mui/icons-material/Create';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { v4 as uuid } from 'uuid';

/** @TODO add Types */

const documents = {
  label: 'List',
  url: (id: string) => `/documents`,
  labelIcon: ListAltIcon,
  model: 'Documents',
  permission: 'list',
  nodeId: uuid()
};

const createDocument = {
  label: 'Create Document',
  url: (id: string) => `/documents/create`,
  labelIcon: CreateIcon,
  model: 'Documents',
  permission: 'edit',
  nodeId: uuid()
};

const editDocument = {
  label: 'Edit',
  url: (id: string) => `/documents/${id}/edit`,
  labelIcon: EditIcon,
  model: 'Documents',
  permission: 'edit',
  nodeId: uuid()
};

const viewDocument = {
  label: 'View',
  url: (id: string) => `/documents/${id}/view`,
  labelIcon: VisibilityIcon,
  model: 'Documents',
  permission: 'view',
  nodeId: uuid()
};

const docRevisions = {
  label: 'Revisions',
  url: (id: string) => `/documents/${id}/revisions`,
  labelIcon: ListAltIcon,
  model: 'Documents',
  permission: 'view',
  nodeId: uuid()
};

const documentMenuItems = {
  list: [documents, createDocument],
  edit: [documents, viewDocument],
  create: [documents],
  view: [documents, viewDocument, editDocument, docRevisions]
};

export default documentMenuItems;
