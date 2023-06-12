import DocumentCreate from 'features/documents/document-create';
import DocumentList from 'features/documents/document-list';
import DocumentView from 'features/documents/document-view';
import EmailTemplateCreate from 'features/email-template/email-template-create';
import EmailTemplateList from 'features/email-template/email-template-list';
import EmailTemplateView from 'features/email-template/email-template-view';
import MarketPreferencesBrokerageUserCreate from 'features/market-preference-brokerage-users/market-preference-brokerage-user-create';
import MarketPreferencesBrokerageUsersList from 'features/market-preference-brokerage-users/market-preference-brokerage-users-list';
import MarketPreferencesBrokerageUsersView from 'features/market-preference-brokerage-users/market-preference-brokerage-user-view';
import CreateMarketPreference from 'features/market-preferences/market-preference-create';
import MarketPreferenceView from 'features/market-preferences/market-preference-view';
import MarketPreferencesList from 'features/market-preferences/market-preferences-list';
import PdfTemplateCreate from 'features/pdf-template/pdf-template-create';
import PDFTemplatesList from 'features/pdf-template/pdf-template-list';
import MarketPreferencesPage from 'pages/market-preferences/page';
import PdfTemplateView from 'features/pdf-template/pdf-template-view';
import MarketPreferenceViewChangelog from 'features/market-preferences/market-preferences-change-log';
import ViewMarketOfferDefaults from 'features/view-market-offer-defaults';

const marketPreferenceRoutes = {
  path: 'market-preferences',
  element: <MarketPreferencesPage />,
  children: [
    {
      path: '',
      element: <MarketPreferencesList routeTag="market-preferences" />
    },
    {
      path: ':market_preference_id/view',
      element: <MarketPreferenceView routeTag="market-preferences-view" />
    },
    {
      path: 'create',
      element: <CreateMarketPreference routeTag="market-preferences-create" />
    },
    {
      path: ':market_preference_id/edit',
      element: <CreateMarketPreference routeTag="market-preferences-edit" />
    },
    {
      path: ':market_preference_id/view_changelog',
      element: (
        <MarketPreferenceViewChangelog routeTag="market-preferences-change-log" />
      )
    },
    {
      path: ':market_preference_id/market-preferences-brokerage-users',
      element: (
        <MarketPreferencesBrokerageUsersList routeTag="market-preferences-2-brokerage-users" />
      )
    },
    {
      path: ':market_preference_id/market-preferences-brokerage-users/create',
      element: (
        <MarketPreferencesBrokerageUserCreate routeTag="market-preferences-2-brokerage-users-create" />
      )
    },
    {
      path: ':market_preference_id/market-preferences-brokerage-users/:market_preference_brokerage_user_id/edit',
      element: (
        <MarketPreferencesBrokerageUserCreate routeTag="market-preferences-2-brokerage-users-edit" />
      )
    },
    {
      path: ':market_preference_id/market-preferences-brokerage-users/:market_preference_brokerage_user_id/edit/terminate',
      element: (
        <MarketPreferencesBrokerageUserCreate routeTag="market-preferences-2-brokerage-users-terminate" />
      )
    },
    {
      path: ':market_preference_id/market-preferences-brokerage-users/:market_preference_brokerage_user_id/edit/replace',
      element: (
        <MarketPreferencesBrokerageUserCreate routeTag="market-preferences-2-brokerage-users-replace" />
      )
    },
    {
      path: ':market_preference_id/market-preferences-brokerage-users/:market_preference_brokerage_user_id/view',
      element: (
        <MarketPreferencesBrokerageUsersView routeTag="market-preferences-2-brokerage-users-view" />
      )
    },
    {
      path: ':market_preference_id/contracts',
      element: (
        <PDFTemplatesList
          key={'market-preferences-contracts'}
          routeTag="market-preferences-contracts"
        />
      )
    },
    {
      path: ':market_preference_id/contracts/selection-list',
      element: (
        <PDFTemplatesList
          key={'market-preferences-contracts-selection'}
          routeTag="market-preferences-contracts-selection"
        />
      )
    },
    {
      path: ':market_preference_id/contracts/:pdf_template_id/edit',
      element: (
        <PdfTemplateCreate routeTag="market-preferences-contracts-edit" />
      )
    },
    {
      path: ':market_preference_id/contracts/:pdf_template_id/view',
      element: <PdfTemplateView routeTag="market-preferences-contracts-view" />
    },
    {
      path: ':market_preference_id/email-templates',
      element: (
        <EmailTemplateList routeTag="market-preferences-email-templates" />
      )
    },
    {
      path: ':market_preference_id/email-templates/selection-list',
      element: (
        <EmailTemplateList
          key="selection-list"
          routeTag="market-preferences-email-templates-selection"
        />
      )
    },
    {
      path: ':market_preference_id/email-templates/create',
      element: (
        <EmailTemplateCreate routeTag="market-preferences-email-templates-create" />
      )
    },
    {
      path: ':market_preference_id/email-templates/:email_template_id/edit',
      element: (
        <EmailTemplateCreate routeTag="market-preferences-email-templates-edit" />
      )
    },
    {
      path: ':market_preference_id/email-templates/:email_template_id/view',
      element: (
        <EmailTemplateView routeTag="market-preferences-email-templates-view" />
      )
    },
    {
      path: ':market_preference_id/documents',
      element: <DocumentList routeTag="market-preferences-documents" />
    },
    {
      path: ':market_preference_id/documents/create',
      element: <DocumentCreate routeTag="market-preferences-documents-create" />
    },
    {
      path: ':market_preference_id/documents/:document_id/edit',
      element: <DocumentCreate routeTag="market-preferences-documents-edit" />
    },
    {
      path: ':market_preference_id/documents/:document_id/view',
      element: <DocumentView routeTag="market-preferences-documents-view" />
    },
    {
      path: ':market_preference_id/view-market-offer-defaults',
      element: (
        <ViewMarketOfferDefaults routeTag="market-preferences-view-market-offer-defaults" />
      )
    }
  ]
};

export default marketPreferenceRoutes;
