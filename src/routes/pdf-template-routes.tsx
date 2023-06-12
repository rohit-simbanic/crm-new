import PdfTemplatePage from 'pages/pdf-template';
import PdfTemplateList from 'features/pdf-template/pdf-template-list';
import PdfTemplateCreate from 'features/pdf-template/pdf-template-create';
import PdfTemplateView from 'features/pdf-template/pdf-template-view';
import PdfTemplateViewAsPDF from 'features/pdf-template/pdf-template-view-as-pdf';

const pdfTemplateRoutes = {
  path: 'pdf-templates',
  element: <PdfTemplatePage />,
  children: [
    { path: '', element: <PdfTemplateList routeTag="pdf-templates" /> },
    {
      path: 'create',
      element: <PdfTemplateCreate routeTag="pdf-templates-create" />
    },
    {
      path: ':pdf_template_id/view',
      element: <PdfTemplateView routeTag="pdf-templates-view" />
    },
    {
      path: ':pdf_template_id/edit',
      element: <PdfTemplateCreate routeTag="pdf-templates-edit" />
    },
    {
      path: ':pdf_template_id/pdf-view',
      element: <PdfTemplateViewAsPDF routeTag="pdf-templates-pdf-view" />
    },
    {
      path: ':market_preference_id/selection-list',
      element: <PdfTemplateList routeTag="pdf-templates-selection-list" />
    }
  ]
};

export default pdfTemplateRoutes;
