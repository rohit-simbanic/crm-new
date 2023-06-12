import DocumentCreate from 'features/documents/document-create';
import DocumentList from 'features/documents/document-list';
import RevisionView from 'features/documents/document-revision-view';
import DocumentRevisions from 'features/documents/document-revisions';
import DocumentView from 'features/documents/document-view';
import DocumentViewer from 'features/documents/document-viewer';
import Document from 'pages/document/index';

const documentRoutes = {
  path: 'documents',
  element: <Document />,
  children: [
    { path: '', element: <DocumentList routeTag="documents" /> },
    {
      path: ':document_id/view',
      element: <DocumentView routeTag="documents-view" />
    },
    {
      path: ':document_id/edit',
      element: <DocumentCreate routeTag="documents-edit" />
    },
    {
      path: ':document_id/revisions',
      element: <DocumentRevisions routeTag="documents-revisions" />
    },
    {
      path: ':document_revision_id/viewer',
      element: <DocumentViewer />
    },
    {
      path: ':document_id/revisions/:revision_id',
      element: <RevisionView routeTag="documents-revisions-view" />
    },
    { path: 'create', element: <DocumentCreate routeTag="documents-create" /> }
  ]
};

export default documentRoutes;
