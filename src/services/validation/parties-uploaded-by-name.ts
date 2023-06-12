import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const parties_uploaded_by_name = {
  validate: function (oppurtyunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtyunity?.opportunity_status_c ===
      oppurtunityStatusList.offer_sent_to_seller &&
      oppurtyunity?.data_source === 'off_market' &&
      (!oppurtyunity?.parties_uploaded_by_name ||
        oppurtyunity?.parties_uploaded_by_name.trim().length === 0)
    ) {
      errors.push(missingField('Uploaded By Name'));
    }

    return errors;
  }
};
