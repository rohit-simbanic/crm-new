import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const forecasted_close_date = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    const close_date = oppurtunity?.close_date_c.trim();
    const forecasted_close_date = oppurtunity?.forecasted_close_date.trim();

    const due_diligence_end_c = oppurtunity?.due_diligence_end_c.trim();
    const forecasted_dd_end_date = oppurtunity?.forecasted_dd_end_date.trim();

    var stateList = [
      oppurtunityStatusList.closing_diligence_period,
      oppurtunityStatusList.closing_clear_to_close,
      oppurtunityStatusList.closed_purchased
    ];

    if (
      oldOppurtunity?.opportunity_status_c ==
        oppurtunityStatusList.closing_sale_pending_amended &&
      stateList.includes(oppurtunity?.opportunity_status_c)
    ) {
      if (
        forecasted_close_date.length > 0 &&
        close_date !== forecasted_close_date
      ) {
        errors.push('Close Date and Forecasted Close Date must be equal');
        return errors;
      }
    }

    stateList = [
      oppurtunityStatusList.closing_diligence_period,
      oppurtunityStatusList.closing_diligence_amended,
      oppurtunityStatusList.closing_sale_pending,
      oppurtunityStatusList.closing_sale_pending_amended,
      oppurtunityStatusList.closing_clear_to_close,
      oppurtunityStatusList.closing_cancel_contract,
      oppurtunityStatusList.closed_purchased,
      oppurtunityStatusList.closing_termination_pending
    ];

    if (stateList.includes(oppurtunity?.opportunity_status_c)) {
      if (
        forecasted_dd_end_date.length > 0 &&
        forecasted_close_date.length > 0
      ) {
        let forecastedCloseDate = new Date(forecasted_close_date);
        let forecastedDDEndDate = new Date(forecasted_dd_end_date);

        if (forecastedCloseDate < forecastedDDEndDate) {
          errors.push(
            'Forecasted Close Date must be greater then or equal Forecasted DD End Date'
          );
          return errors;
        }
      }

      if (
        forecasted_dd_end_date.length === 0 &&
        forecasted_close_date.length > 0
      ) {
        let forecastedCloseDate = new Date(forecasted_close_date);
        let ddEndDateDate = new Date(due_diligence_end_c);

        if (forecastedCloseDate < ddEndDateDate) {
          errors.push(
            'Forecasted Close Date must be greater then or equal to DD End Date'
          );
          // return errors;
        }
      }
    }

    stateList = [
      oppurtunityStatusList.closing_diligence_period,
      oppurtunityStatusList.closing_diligence_amended,
      oppurtunityStatusList.closing_clear_to_close
    ];

    if (
      stateList.includes(oppurtunity?.opportunity_status_c) &&
      oppurtunity?.forecasted_close_date.trim().length === 0
    ) {
      errors.push(missingField('Forecasted Close Date'));
    }
    return errors;
  }
};
