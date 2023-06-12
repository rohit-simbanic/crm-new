import eventBus from 'helpers/event-bus-helper';
import { isEmpty } from 'helpers/misc-helper';
import userFullName from 'helpers/user-name-helper';
import OpportunityViewService from 'services/opportunity-view-service';
import { ObjectType } from 'types';
import { ServiceEntity } from 'types/service-types';

const removeService = async (service_id: string) => {
  await OpportunityViewService.delete(service_id);

  eventBus.dispatch(`service_refresh`, {});
};

const serviceFields: ObjectType = {
  requested_by: (service: ServiceEntity) => {
    if (isEmpty(service.requested_date)) {
      return {
        requested_by: '',
        requested_by_name: ''
      };
    } else {
      let user = JSON.parse(localStorage.getItem('user') || 'false');
      if (user) {
        return {
          requested_by: user?.user?.id,
          requested_by_name: `${userFullName(user?.user)}`
        };
      }
    }
  },
  confirmation_by: (service: ServiceEntity) => {
    if (isEmpty(service.confirmation_date)) {
      return {
        confirmation_by: '',
        confirmation_by_name: ''
      };
    } else {
      let user = JSON.parse(localStorage.getItem('user') || 'false');
      if (user) {
        return {
          confirmation_by: user?.user?.id,
          confirmation_by_name: `${userFullName(user?.user)}`
        };
      }
    }
  }
};

export { removeService, serviceFields };
