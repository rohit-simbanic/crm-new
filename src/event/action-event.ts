import eventBus from 'helpers/event-bus-helper';
import DASHBOARDS from 'assets/constants/dashboards';

const getDashboard = () => {
  const paths = window.location.pathname.split('/');
  const dashboard = paths[paths.indexOf('dashboard') + 1];
  return dashboard;
}

export const actionPerform = {
  cancel_offer: () => {
    if (getDashboard() == "negotiator") {
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_OFFER_MAKE_OFFER}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_SELLER_SENT_RECEIVED}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_COUNTERED_OFFER}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_ACCEPTED_OFFER}_refresh`, {});
    }
  },
  reject_offer: () => {
    if (getDashboard() == "negotiator") {
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_SELLER_SENT_RECEIVED}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_COUNTERED_OFFER}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_ACCEPTED_OFFER}_refresh`, {});
    }
  },
  accept_offer: () => {
    if (getDashboard() == "negotiator") {
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_SELLER_SENT_RECEIVED}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_COUNTERED_OFFER}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_ACCEPTED_OFFER}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_DD_ENDING}_refresh`, {});
    }
  },
  counter_offer: () => {
    if (getDashboard() == "negotiator") {
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_SELLER_SENT_RECEIVED}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_COUNTERED_OFFER}_refresh`, {});
    }
  },
  buyer_counter_offer: () => {
    if (getDashboard() == "negotiator") {
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_COUNTERED_OFFER}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_ACCEPTED_OFFER}_refresh`, {});
    }
  },
  due_diligence_opportunity: () => {

    if (getDashboard() == "negotiator") {
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_ACCEPTED_OFFER}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_DD_ENDING}_refresh`, {});
    }
  },
  due_diligence_fees: () => {
    if (getDashboard() == "negotiator") {
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_DD_ENDING}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_SALE_PENDING}_refresh`, {});
    }

    if (getDashboard() == "closing") {
      eventBus.dispatch(`${DASHBOARDS.CLOSING_DASHBOARD_DILIGENCE_PERIOD}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.CLOSING_DASHBOARD_SALE_PENDING}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.CLOSING_DASHBOARD_CLEAR_TO_CLOSE}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.CLOSING_DASHBOARD_TERMINATIONS}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.CLOSING_DASHBOARD_CLOSED_PURCHASED}_refresh`, {});

    }

  },
  clear_due_diligence: () => {
    if (getDashboard() == "negotiator") {
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_DD_ENDING}_refresh`, {});
    }

    if (getDashboard() == "closing") {
      eventBus.dispatch(`${DASHBOARDS.CLOSING_DASHBOARD_DILIGENCE_PERIOD}_refresh`, {});

    }
  },
  extension_request: () => {
    if (getDashboard() == "negotiator") {
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_DD_ENDING}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_SALE_PENDING}_refresh`, {});
    }

    if (getDashboard() == "closing") {
      eventBus.dispatch(`${DASHBOARDS.CLOSING_DASHBOARD_DILIGENCE_PERIOD}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.CLOSING_DASHBOARD_SALE_PENDING}_refresh`, {});
    }

  },
  extension_confirmation: () => {

    if (getDashboard() == "negotiator") {
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_DD_ENDING}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_SALE_PENDING}_refresh`, {});
    }

    if (getDashboard() == "closing") {
      eventBus.dispatch(`${DASHBOARDS.CLOSING_DASHBOARD_DILIGENCE_PERIOD}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.CLOSING_DASHBOARD_SALE_PENDING}_refresh`, {});
    }

  },
  approve_extension_request: () => {
    if (getDashboard() == "negotiator") {
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_DD_ENDING}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.NEGOTIATOR_DASHBOARD_SALE_PENDING}_refresh`, {});
    }

    if (getDashboard() == "closing") {
      eventBus.dispatch(`${DASHBOARDS.CLOSING_DASHBOARD_DILIGENCE_PERIOD}_refresh`, {});
      eventBus.dispatch(`${DASHBOARDS.CLOSING_DASHBOARD_SALE_PENDING}_refresh`, {});
    }
  },
  option_earnest_fee_status: () => {
    if (getDashboard() == 'negotiator') {
      eventBus.dispatch(
        `${DASHBOARDS.NEGOTIATOR_DASHBOARD_DD_ENDING}_refresh`,
        {}
      );
      eventBus.dispatch(
        `${DASHBOARDS.NEGOTIATOR_DASHBOARD_SALE_PENDING}_refresh`,
        {}
      );
    } else if (getDashboard() == 'closing') {
      eventBus.dispatch(
        `${DASHBOARDS.CLOSING_DASHBOARD_DILIGENCE_PERIOD}_refresh`,
        {}
      );
      eventBus.dispatch(
        `${DASHBOARDS.CLOSING_DASHBOARD_SALE_PENDING}_refresh`,
        {}
      );
    }
  },
  request_price_adjustment: () => {
    if (getDashboard() == 'negotiator') {
      eventBus.dispatch(
        `${DASHBOARDS.NEGOTIATOR_DASHBOARD_DD_ENDING}_refresh`,
        {}
      );
      eventBus.dispatch(
        `${DASHBOARDS.NEGOTIATOR_DASHBOARD_SALE_PENDING}_refresh`,
        {}
      );
    } else if (getDashboard() == 'closing') {
      eventBus.dispatch(
        `${DASHBOARDS.CLOSING_DASHBOARD_DILIGENCE_PERIOD}_refresh`,
        {}
      );
      eventBus.dispatch(
        `${DASHBOARDS.CLOSING_DASHBOARD_SALE_PENDING}_refresh`,
        {}
      );
    }
  },
  retrade_approval: () => {
    if (getDashboard() == 'negotiator') {
      eventBus.dispatch(
        `${DASHBOARDS.NEGOTIATOR_DASHBOARD_DD_ENDING}_refresh`,
        {}
      );
      eventBus.dispatch(
        `${DASHBOARDS.NEGOTIATOR_DASHBOARD_SALE_PENDING}_refresh`,
        {}
      );
    } else if (getDashboard() == 'closing') {
      eventBus.dispatch(
        `${DASHBOARDS.CLOSING_DASHBOARD_DILIGENCE_PERIOD}_refresh`,
        {}
      );
      eventBus.dispatch(
        `${DASHBOARDS.CLOSING_DASHBOARD_SALE_PENDING}_refresh`,
        {}
      );
    }
  },
  termination_request: () => {
    if (getDashboard() == 'negotiator') {
      eventBus.dispatch(
        `${DASHBOARDS.NEGOTIATOR_DASHBOARD_DD_ENDING}_refresh`,
        {}
      );
      eventBus.dispatch(
        `${DASHBOARDS.NEGOTIATOR_DASHBOARD_SALE_PENDING}_refresh`,
        {}
      );
      eventBus.dispatch(
        `${DASHBOARDS.NEGOTIATOR_DASHBOARD_TERMINATION}_refresh`,
        {}
      );
    } else if (getDashboard() == 'closing') {
      eventBus.dispatch(
        `${DASHBOARDS.CLOSING_DASHBOARD_DILIGENCE_PERIOD}_refresh`,
        {}
      );
      eventBus.dispatch(
        `${DASHBOARDS.CLOSING_DASHBOARD_SALE_PENDING}_refresh`,
        {}
      );
      eventBus.dispatch(
        `${DASHBOARDS.CLOSING_DASHBOARD_CLEAR_TO_CLOSE}_refresh`,
        {}
      );
      eventBus.dispatch(
        `${DASHBOARDS.CLOSING_DASHBOARD_TERMINATIONS}_refresh`,
        {}
      );
    }
  },
  termination_approval: () => {
    if (getDashboard() == 'negotiator') {
      eventBus.dispatch(
        `${DASHBOARDS.NEGOTIATOR_DASHBOARD_TERMINATION}_refresh`,
        {}
      );
    } else if (getDashboard() == 'closing') {

      eventBus.dispatch(
        `${DASHBOARDS.CLOSING_DASHBOARD_DILIGENCE_PERIOD}_refresh`,
        {}
      );

      eventBus.dispatch(
        `${DASHBOARDS.CLOSING_DASHBOARD_CLEAR_TO_CLOSE}_refresh`,
        {}
      );
      eventBus.dispatch(
        `${DASHBOARDS.CLOSING_DASHBOARD_TERMINATIONS}_refresh`,
        {}
      );
    }
  }
};
