import { missingField } from 'assets/validation-template';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { isEmpty } from 'helpers/misc-helper';

export const internal_termination_feedback = {
  validate: function (oppurtunity: any, status: string) {
    let errors: any = [];

    if (status === 'edit') {
      if (
        [
          oppurtunityStatusList.closing_cancel_contract,
          oppurtunityStatusList.closing_termination_pending
        ].includes(oppurtunity?.opportunity_status_c) &&
        (!oppurtunity?.internal_termination_feedback ||
          oppurtunity?.internal_termination_feedback?.trim().length === 0)
      ) {
        errors.push(missingField('Internal Termination Feedback'));
      }
    }

    if (status === 'action') {
      if (isEmpty(oppurtunity?.internal_termination_feedback)) {
        errors.push(missingField('Internal Termination Feedback'));
      }
    }

    return errors;
  }
};
