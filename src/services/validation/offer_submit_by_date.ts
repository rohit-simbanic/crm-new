export const offer_submit_by_date = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtunity?.offer_submit_by_date &&
      new Date(oppurtunity?.offer_submit_by_date).getTime() <=
        new Date().getTime()
    ) {
      errors.push('Offer Submit By date must be in future.');
    }

    return errors;
  }
};
