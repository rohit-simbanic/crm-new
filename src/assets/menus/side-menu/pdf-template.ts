import CreateIcon from '@mui/icons-material/Create';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { v4 as uuid } from 'uuid';

/** @TODO add Types */

const listPdfTemplate = {
  label: 'List',
  url: (id: string) => `/pdf-templates`,
  labelIcon: ListAltIcon,
  model: 'AOS_PDF_Templates',
  permission: 'list',
  nodeId: uuid()
};

const createPdfTemplate = {
  label: 'Create',
  url: (id: string) => `/pdf-templates/create`,
  labelIcon: CreateIcon,
  model: 'AOS_PDF_Templates',
  permission: 'edit',
  nodeId: uuid()
};

const viewPdfTemplate = {
  label: 'View',
  url: (id: string) => `/pdf-templates/${id}/view`,
  labelIcon: VisibilityIcon,
  model: 'AOS_PDF_Templates',
  permission: 'view',
  nodeId: uuid()
};

const editPdfTemplate = {
  label: 'Edit',
  url: (id: string) => `/pdf-templates/${id}/edit`,
  labelIcon: CreateIcon,
  model: 'AOS_PDF_Templates',
  permission: 'edit',
  nodeId: uuid()
};

const viewAsPdf = {
  label: 'View as PDF',
  url: (id: string) => `/pdf-templates/${id}/pdf-view`,
  labelIcon: PictureAsPdfIcon,
  model: 'AOS_PDF_Templates',
  permission: 'view',
  nodeId: uuid(),
  routeTag: 'pdf-templates-pdf-view'
};

const pdfTemplateMenuItems = {
  list: [listPdfTemplate, createPdfTemplate],
  create: [listPdfTemplate, createPdfTemplate],
  edit: [listPdfTemplate, viewPdfTemplate, editPdfTemplate, viewAsPdf],
  view: [listPdfTemplate, viewPdfTemplate, editPdfTemplate, viewAsPdf]
};

export default pdfTemplateMenuItems;
