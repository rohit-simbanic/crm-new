import { ObjectType } from 'types';

const DASHBOARDS: ObjectType = {

  NEGOTIATOR_DASHBOARD: 'NEGOTIATOR_DASHBOARD',
  CLOSING_DASHBOARD: 'CLOSING_DASHBOARD',
  TRANSACTION_DASHBOARD: 'TRANSACTION_DASHBOARD',
  PROPERTIES: 'PROPERTIES',

  NEGOTIATOR_DASHBOARD_OFFER_MAKE_OFFER:
    'NEGOTIATOR_DASHBOARD_OFFER_MAKE_OFFER',
  NEGOTIATOR_DASHBOARD_SELLER_SENT_RECEIVED:
    'NEGOTIATOR_DASHBOARD_SELLER_SENT_RECEIVED',
  NEGOTIATOR_DASHBOARD_ACCEPTED_OFFER: 'NEGOTIATOR_DASHBOARD_ACCEPTED_OFFER',
  NEGOTIATOR_DASHBOARD_COUNTERED_OFFER: 'NEGOTIATOR_DASHBOARD_COUNTERED_OFFER',
  NEGOTIATOR_DASHBOARD_DD_ENDING: 'NEGOTIATOR_DASHBOARD_DD_ENDING',
  NEGOTIATOR_DASHBOARD_SALE_PENDING: 'NEGOTIATOR_DASHBOARD_SALE_PENDING',
  NEGOTIATOR_DASHBOARD_TERMINATION: 'NEGOTIATOR_DASHBOARD_TERMINATION',

  CLOSING_DASHBOARD_DILIGENCE_PERIOD: 'CLOSING_DASHBOARD_DILIGENCE_PERIOD',
  CLOSING_DASHBOARD_SALE_PENDING: 'CLOSING_DASHBOARD_SALE_PENDING',
  CLOSING_DASHBOARD_CLEAR_TO_CLOSE: 'CLOSING_DASHBOARD_CLEAR_TO_CLOSE',
  CLOSING_DASHBOARD_TERMINATIONS: 'CLOSING_DASHBOARD_TERMINATIONS',
  CLOSING_DASHBOARD_CLOSED_PURCHASED: 'CLOSING_DASHBOARD_CLOSED_PURCHASED',

  TRANSACTION_DASHBOARD_EARNEST_MONEY: 'TRANSACTION_DASHBOARD_EARNEST_MONEY',
  TRANSACTION_DASHBOARD_OPTION_FEE: 'TRANSACTION_DASHBOARD_OPTION_FEE',
  TRANSACTION_DASHBOARD_DD_ENDING: 'TRANSACTION_DASHBOARD_DD_ENDING',
  TRANSACTION_DASHBOARD_REVIEW_CONTRACT:
    'TRANSACTION_DASHBOARD_REVIEW_CONTRACT',
  TRANSACTION_DASHBOARD_FORCSTED_COE: 'TRANSACTION_DASHBOARD_FORCSTED_COE',
  TRANSACTION_DASHBOARD_CLOSING_TODAY: 'TRANSACTION_DASHBOARD_CLOSING_TODAY',
  TRANSACTION_DASHBOARD_TERMINATION_PENDING:
    'TRANSACTION_DASHBOARD_TERMINATION_PENDING',

  PROPERTIES_QUERY_RESULT: 'PROPERTIES_QUERY_RESULT',
  PROPERTIES_CLOSING: 'PROPERTIES_CLOSING',
  PROPERTIES_OFFERS: 'PROPERTIES_OFFERS',
  PROPERTIES_PRE_OFFERS: 'PROPERTIES_PRE_OFFERS',
  PROPERTIES_NEW: 'PROPERTIES_NEW',

  FILTER: 'FILTER',
  SELECTED_COLUMNS: 'SELECTED_COLUMNS'
};

export default DASHBOARDS;