import { ObjectType } from 'types';

export const modules = [
  'Opportunities',
  'Accounts',
  'Documents',
  'EmailTemplates',
  'PdfTemplates',
  'Msa',
  'Parties',
  'Services',
  'MarketPreferences',
  'MarketPreferencesBrokerageUsers'
];

export const moduleLabels: ObjectType = {
  Opportunities: { label: 'Opportunities', value: 'opportunities' },
  Accounts: {
    label: 'Accounts',
    value: 'accounts'
  },
  Documents: {
    label: 'Documents',
    value: 'documents'
  },
  EmailTemplates: {
    label: 'EmailTemplates',
    value: 'email-templates'
  },
  PdfTemplates: {
    label: 'PdfTemplates',
    value: 'pdf-templates'
  },
  Msa: {
    label: 'Msa',
    value: 'msa'
  },
  Parties: {
    label: 'Parties',
    value: 'parties'
  },
  Services: {
    label: 'Services',
    value: 'services'
  },
  MarketPreferences: {
    label: 'MarketPreferences',
    value: 'market-preferences'
  },
  MarketPreferencesBrokerageUsers: {
    label: 'MarketPreferencesBrokerageUsers',
    value: 'market-preferences-brokerage-users'
  }
};
