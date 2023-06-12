import { missingField } from 'assets/validation-template';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { initial_due_diligence_end } from './initial_due_diligence_end';
import { isEmpty, isValueChanged } from 'helpers/misc-helper';
import DateUtility from 'helpers/date-helper';
import variableConfig from 'config/variable';

export const due_diligence_end_c = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    const statuses = [
      oppurtunityStatusList.closing_diligence_period,
      oppurtunityStatusList.closing_diligence_amended,
      oppurtunityStatusList.closing_sale_pending,
      oppurtunityStatusList.closing_sale_pending_amended,
      oppurtunityStatusList.closing_clear_to_close,
      oppurtunityStatusList.closing_cancel_contract,
      oppurtunityStatusList.closed_purchased,
      oppurtunityStatusList.closing_termination_pending
    ];

    if (status === 'edit')
      if (
        statuses.includes(oppurtunity?.opportunity_status_c) &&
        isEmpty(oppurtunity?.due_diligence_end_c)
      ) {
        errors.push(missingField('Due Diligence End Date'));
      }

    if (status === 'action') {
      if (
        oppurtunity?.opportunity_status_c ===
          oppurtunityStatusList.closing_diligence_period &&
        isEmpty(oppurtunity?.due_diligence_end_c)
      ) {
        errors.push(missingField('Due Diligence End Date'));
      }
      if (
        oppurtunity.opportunity_status_c ===
          oppurtunityStatusList.closing_diligence_amended &&
        !isEmpty(oppurtunity.forecasted_dd_end_date) &&
        DateUtility.getDateString(oppurtunity.due_diligence_end_c) !==
          DateUtility.getDateString(oppurtunity.forecasted_dd_end_date)
      ) {
        errors.push('DD End Date must be equal to Forecasted DD End Date');
      }
    }

    return errors;
  },

  handleChange: (opportunity: any) => {
    let result = {
      initial_due_diligence_end:
        initial_due_diligence_end.calculate(opportunity)
    };

    return result;
  },

  calculate: (opportunity: any, oldOpportunity: any) => {
    if (
      !isEmpty(opportunity?.contract_execution_date_c) &&
      !isEmpty(opportunity?.option_days_type_c)
    ) {
      // if (
      //   isValueChanged(
      //     opportunity,
      //     oldOpportunity,
      //     'contract_execution_date_c'
      //   ) ||
      //   isValueChanged(opportunity, oldOpportunity, 'option_days_type_c')
      // ) {
      let days = opportunity?.option_period_days_c || 0;

      const timeString = DateUtility.addHourInDate(
        opportunity?.contract_execution_date_c,
        variableConfig.DUE_DILIGENCE_END_START_TIME
      );

      if (opportunity?.option_days_type_c === 'calendar') {
        let calendarWorkingDay = DateUtility.getCalendarWorkingDay(
          timeString,
          days
        );
        return DateUtility.addHourInDate(
          DateUtility.getDateTimeString(calendarWorkingDay),
          variableConfig.DUE_DILIGENCE_END_START_TIME
        );
      }

      if (
        opportunity?.option_days_type_c === 'calendar_days_no_weekend_closings'
      ) {
        let calendarWorkingDay = DateUtility.getCalendarWorkingDay(
          timeString,
          days
        );
        return DateUtility.addHourInDate(
          DateUtility.rolloverWeekendDateTimeToWeekdayDateTime(
            calendarWorkingDay
          ),
          variableConfig.DUE_DILIGENCE_END_START_TIME
        );
      }

      if (opportunity?.option_days_type_c === 'business') {
        return DateUtility.addHourInDate(
          DateUtility.getBusinessWorkingDay(timeString, days),
          variableConfig.DUE_DILIGENCE_END_START_TIME
        );
      }
      // }
    }
  }
};
