import { missingField } from 'assets/validation-template';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { OpportunityEntity } from 'types/opportunity-entity';
import { due_diligence_end_c } from './due_diligence_end_c';
import { isEmpty } from 'helpers/misc-helper';

export const contract_execution_date_c = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    if (
      oppurtunity?.opportunity_status_c ===
      oppurtunityStatusList.closing_diligence_period
    ) {
      if (isEmpty(oppurtunity?.contract_execution_date_c)) {
        errors.push(missingField('Contract Execution Date'));
      }
    }

    return errors;
  },

  handleChange: (
    opportunity: OpportunityEntity,
    oldOpportunity: OpportunityEntity
  ) => {
    let result = {
      due_diligence_end_c: due_diligence_end_c.calculate(
        opportunity,
        oldOpportunity
      )
    };

    return result;
  }
};
