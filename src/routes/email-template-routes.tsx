import EmailTemplatePage from 'pages/email-template/index';
import EmailTemplateList from 'features/email-template/email-template-list';
import EmailTemplateCreate from 'features/email-template/email-template-create';
import EmailTemplateView from 'features/email-template/email-template-view';
import MarketPreferencesList from 'features/market-preferences/market-preferences-list';

const emailTemplateRoutes = {
  path: 'email-templates',
  element: <EmailTemplatePage />,
  children: [
    { path: '', element: <EmailTemplateList routeTag="email-templates" /> },
    {
      path: 'create',
      element: (
        <EmailTemplateCreate
          routeTag="email-templates-create"
          key="email-templates-create"
        />
      )
    },
    {
      path: ':email_template_id/view',
      element: (
        <EmailTemplateView
          routeTag="email-templates-view"
          key="email-templates-view"
        />
      )
    },
    {
      path: ':email_template_id/edit',
      element: (
        <EmailTemplateCreate
          routeTag="email-templates-edit"
          key="email-templates-edit"
        />
      )
    },
    {
      path: ':email_template_id/duplicate',
      element: (
        <EmailTemplateCreate
          routeTag="email-templates-duplicate"
          key="email-templates-duplicate"
        />
      )
    },
    {
      path: ':email_template_id/market-preferences',
      element: (
        <MarketPreferencesList routeTag="email-templates-market-preferences" />
      )
    }
  ]
};

export default emailTemplateRoutes;
