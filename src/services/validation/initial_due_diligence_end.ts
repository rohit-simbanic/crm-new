export const initial_due_diligence_end = {
  calculate: (opportunity: any) => {
    if (
      (opportunity.initial_due_diligence_end === '' ||
        opportunity.initial_due_diligence_end === null) &&
      opportunity.due_diligence_end_c !== ''
    ) {
      return opportunity.due_diligence_end_c;
    }
    return opportunity.initial_due_diligence_end;
  }
};
