import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { isChecked } from 'components/form/unit-switch';
import DateUtility from 'helpers/date-helper';
import { isEmpty, isValueChanged } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const benefitting_negotiator = {
    calculate: (
        opportunity: ObjectType,
        originalOpportunity: ObjectType
    ) => {
        if (
            opportunity.opportunity_status_c === oppurtunityStatusList.offer_accepted &&
            isValueChanged(opportunity, originalOpportunity, 'opportunity_status_c') &&
            !isChecked(opportunity.benefitting_negotiator_is_locked)
        ) {
            return {
                benefitting_negotiator_id: opportunity.active_primary_negotiator_user_id,
                benefitting_negotiator_name:
                    opportunity.active_primary_negotiator_user
            }
        }
        else {
            return {
                benefitting_negotiator_id: originalOpportunity.benefitting_negotiator_id || '',
                benefitting_negotiator_name:
                    originalOpportunity.benefitting_negotiator_name || ''
            }
        }
    },
    handleChange: (
        opportunity: ObjectType,
        originalOpportunity: ObjectType
    ) => {
        let result: ObjectType = {};

        if (
            isValueChanged(opportunity, originalOpportunity, 'benefitting_negotiator_id') &&
            isChecked(opportunity.benefitting_negotiator_is_locked)
        ) {
            result = {
                benefitting_negotiator_changed_at: DateUtility.getTodayDateTimeString()
            };

            const { user } = JSON.parse(localStorage.getItem('user') || '{}');

            result = {
                ...result,
                benefitting_negotiator_changed_by_id: user.id,
                benefitting_negotiator_changed_by_name: `${user.first_name} ${user.last_name}`
            }

        } else {
            result = {
                ...result,
                benefitting_negotiator_changed_by_id: originalOpportunity.benefitting_negotiator_changed_by_id,
                benefitting_negotiator_changed_by: originalOpportunity.benefitting_negotiator_changed_by_name,
                benefitting_negotiator_changed_at: originalOpportunity.benefitting_negotiator_changed_at
            }
        }
        return result

    }
};
