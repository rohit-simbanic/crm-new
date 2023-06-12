import { ObjectType } from 'types';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { offer_expiration_date_c } from './offer-expiration-date-c';
import { isEmpty } from 'helpers/misc-helper';
import DateUtility from 'helpers/date-helper';

export const close_date_c = {
  validate: function (
    oppurtunity: ObjectType,
    status: string,
    oldOppurtunity: ObjectType
  ) {
    let errors: any = [];

    const close_date = oppurtunity?.close_date_c?.trim();
    const forecasted_close_date = oppurtunity?.forecasted_close_date?.trim();
    const due_diligence_end_c = DateUtility.getDateTimeString(
      oppurtunity?.due_diligence_end_c
    );
    const forecasted_dd_end_date = oppurtunity?.forecasted_dd_end_date?.trim();

    let stateList = [
      oppurtunityStatusList.closing_diligence_period,
      oppurtunityStatusList.closing_diligence_amended,
      oppurtunityStatusList.closing_sale_pending,
      oppurtunityStatusList.closing_sale_pending_amended,
      oppurtunityStatusList.closing_clear_to_close,
      oppurtunityStatusList.closing_cancel_contrac,
      oppurtunityStatusList.closed_purchased,
      oppurtunityStatusList.closing_termination_pending
    ];

    if (stateList.includes(oppurtunity?.opportunity_status_c)) {
      if (isEmpty(forecasted_dd_end_date) && isEmpty(forecasted_close_date)) {
        let closeDate = new Date(close_date);
        let ddEndDate = new Date(due_diligence_end_c);

        if (closeDate < ddEndDate) {
          errors.push('Close Date must be greater then or equal DD End Date');
          return true;
        }
      }

      if (!isEmpty(forecasted_dd_end_date) && isEmpty(forecasted_close_date)) {
        let closeDate = new Date(close_date);
        let forecastedDDEndDate = new Date(forecasted_dd_end_date);

        if (closeDate < forecastedDDEndDate) {
          errors.push(
            'Close Date must be greater then or equal Forecasted DD End Date'
          );
          return true;
        }
      }
    }

    if (status === 'action') {
      if (
        oppurtunity?.opportunity_status_c ===
          oppurtunityStatusList.closing_diligence_period &&
        (!oppurtunity?.close_date_c ||
          oppurtunity?.close_date_c?.trim().length === 0)
      ) {
        errors.push('Missing req uired field: Close Date');
      }

      if (
        oppurtunity?.opportunity_status_c ==
          oppurtunityStatusList.closing_diligence_amended &&
        oppurtunity.forecasted_close_date.trim().length !== 0 &&
        DateUtility.getDateString(oppurtunity.close_date_c) !==
          DateUtility.getDateString(oppurtunity.forecasted_close_date)
      ) {
        errors.push('Close Date must be equal to Forecasted Close Date');
      }
    }

    return errors;
  },
  handleChange: (opportunity: ObjectType, originalOpportutniy: ObjectType) => {
    let result = {
      offer_expiration_date_c: offer_expiration_date_c.calculate(
        opportunity,
        originalOpportutniy
      )
    };

    return result;
  },
  calculate: (opportunity: any) => {
    if (!isEmpty(opportunity.close_date_c)) {
      return DateUtility.rolloverWeekendDateTimeToWeekdayDateTime(
        opportunity.close_date_c
      );
    }

    return opportunity.close_date_c;
  }
};
