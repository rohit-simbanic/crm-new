import { ObjectType } from 'types';
import { get, list, put } from './client-service';
import envConfig from 'config/env';
import userTypes from 'assets/constants/user-types';
import { isEmpty } from 'helpers/misc-helper';

const userService = {
  getCurrentUser: async () => {
    const result = await get(`/${envConfig.REACT_APP_API_VERSION_1}/me`);
    return result;
  },
  update: async (id: string, payload: any) => {
    const result = await put(
      `${envConfig.REACT_APP_API_VERSION_1}/users/${id}`,
      payload
    );
    return result;
  },
  getUsersByName: async (search: string) => {
    const result = await list(
      `/${envConfig.REACT_APP_API_VERSION_1}/users?sort[field]=is_admin&sort[direction]=asc&filter[first_name]=${search}`
    );
    return result;
  },
  getUsers: (data: ObjectType[]) => {
    let result = {};

    let users: ObjectType = {};

    for (const type of userTypes) {
      let user = data.filter(
        (x: ObjectType) => x.brokerge_user_role_for_opportunity === type
      );
      users = { ...users, [type]: user[0] };
    }

    if (
      users?.benefitting_negotiator_id &&
      users?.benefitting_negotiator_id !== null
    ) {
      let benefittingNegotiator = {
        benefitting_negotiator_name: `${users?.benefitting_negotiator_id.first_name} ${users?.benefitting_negotiator_id.last_name}`
      };
      result = { ...result, ...benefittingNegotiator };
    }

    if (
      users?.benefitting_negotiator_changed_by_id &&
      users?.benefitting_negotiator_changed_by_id !== null
    ) {
      let benefittingNegotiatorBy = {
        benefitting_negotiator_changed_by_name: `${users?.benefitting_negotiator_changed_by_id.first_name} ${users?.benefitting_negotiator_changed_by_id.last_name}`
      };
      result = { ...result, ...benefittingNegotiatorBy };
    }

    if (users?.offer_submitted_by && users?.offer_submitted_by !== null) {
      let offer_submitted_by = {
        offer_submitted_user_name: `${users?.offer_submitted_by.first_name} ${users?.offer_submitted_by.last_name}`
      };
      result = { ...result, ...offer_submitted_by };
    }

    if (
      users?.save_for_singnature_by &&
      users?.save_for_singnature_by !== null
    ) {
      let save_for_singnature_by = {
        save_for_singnature_user_name: `${users?.save_for_singnature_by.first_name} ${users?.save_for_singnature_by.last_name}`
      };
      result = { ...result, ...save_for_singnature_by };
    }

    if (
      users?.congrats_letter_sent_by &&
      users?.congrats_letter_sent_by !== null
    ) {
      let congrats_letter_sent_by = {
        congrats_letter_sent_name: `${users?.congrats_letter_sent_by.first_name} ${users?.congrats_letter_sent_by.last_name}`
      };
      result = { ...result, ...congrats_letter_sent_by };
    }

    if (users?.access_requested_by && users?.access_requested_by !== null) {
      let access_requested_by = {
        access_requested_name: `${users?.access_requested_by.first_name} ${users?.access_requested_by.last_name}`
      };
      result = { ...result, ...access_requested_by };
    }

    if (
      users?.active_primary_negotiator_user_id &&
      users?.active_primary_negotiator_user_id !== null
    ) {
      let active_primary_negotiator_user = {
        active_primary_negotiator_user: `${users?.active_primary_negotiator_user_id.first_name} ${users?.active_primary_negotiator_user_id.last_name}`
      };
      result = { ...result, ...active_primary_negotiator_user };
    }

    if (users?.leaseback_3_sent_by && users?.leaseback_3_sent_by !== null) {
      let leaseback_3_sent_by = {
        leaseback_3_sent_by_name: `${users?.leaseback_3_sent_by.first_name} ${users?.leaseback_3_sent_by.last_name}`
      };
      result = { ...result, ...leaseback_3_sent_by };
    }

    if (users?.leaseback_1_sent_by && users?.leaseback_1_sent_by !== null) {
      let leaseback_1_sent_by = {
        leaseback_1_sent_by_name: `${users?.leaseback_1_sent_by.first_name} ${users?.leaseback_1_sent_by.last_name}`
      };
      result = { ...result, ...leaseback_1_sent_by };
    }

    if (users?.submitting_user_code && users?.submitting_user_code !== null) {
      let submitting_user_code = {
        submitting_user_name: `${users?.submitting_user_code.first_name} ${users?.submitting_user_code.last_name}`
      };
      result = { ...result, ...submitting_user_code };
    }

    if (!isEmpty(users?.nego_at_offer_sent)) {
      let nego_at_offer_sent = {
        nego_at_offer_sent_name: `${users?.nego_at_offer_sent.first_name} ${users?.nego_at_offer_sent.last_name}`
      }

      result = { ...result, ...nego_at_offer_sent }
    }

    if (!isEmpty(users?.nego_at_offer_accept)) {
      let nego_at_offer_accept = {
        nego_at_offer_accept_name: `${users?.nego_at_offer_accept.first_name} ${users?.nego_at_offer_accept.last_name}`
      }

      result = { ...result, ...nego_at_offer_accept }
    }

    if (!isEmpty(users?.nego_at_closing)) {
      let nego_at_closing = {
        nego_at_closing_name: `${users?.nego_at_closing.first_name} ${users?.nego_at_closing.last_name}`
      }

      result = { ...result, ...nego_at_closing }
    }

    if (!isEmpty(users?.primary_tc)) {
      let primary_tc = {
        primary_tc_name: `${users?.primary_tc.first_name} ${users?.primary_tc.last_name}`
      }

      result = { ...result, ...primary_tc }
    }

    if (!isEmpty(users?.primary_tc_at_diligence)) {
      let primary_tc_at_diligence = {
        primary_tc_at_diligence_name: `${users?.primary_tc_at_diligence.first_name} ${users?.primary_tc_at_diligence.last_name}`
      }

      result = { ...result, ...primary_tc_at_diligence }
    }

    if (!isEmpty(users?.primary_tc_at_sale_pending)) {
      let primary_tc_at_sale_pending = {
        primary_tc_at_sale_pending_name: `${users?.primary_tc_at_sale_pending.first_name} ${users?.primary_tc_at_sale_pending.last_name}`
      }

      result = { ...result, ...primary_tc_at_sale_pending }
    }

    if (!isEmpty(users?.primary_tc_at_closing)) {
      let primary_tc_at_closing = {
        primary_tc_at_closing_name: `${users?.primary_tc_at_closing.first_name} ${users?.primary_tc_at_closing.last_name}`
      }
      result = { ...result, ...primary_tc_at_closing }
    }

    if (!isEmpty(users?.primary_logistics)) {
      let primary_logistics = {
        primary_logistics_name: `${users?.primary_logistics.first_name} ${users?.primary_logistics.last_name}`
      }

      result = { ...result, ...primary_logistics }
    }

    if (!isEmpty(users?.primary_logistics_at_diligence)) {
      let primary_logistics_at_diligence = {
        primary_logistics_at_diligence_name: `${users?.primary_logistics_at_diligence.first_name} ${users?.primary_logistics_at_diligence.last_name}`
      }
      result = { ...result, ...primary_logistics_at_diligence }
    }

    if (!isEmpty(users?.primary_logistics_at_sale_pending)) {
      let primary_logistics_at_sale_pending = {
        primary_logistics_at_sale_pending_name: `${users?.primary_logistics_at_sale_pending.first_name} ${users?.primary_logistics_at_sale_pending.last_name}`
      }
      result = { ...result, ...primary_logistics_at_sale_pending }
    }

    if (!isEmpty(users?.primary_logistics_at_closing)) {
      let primary_logistics_at_closing = {
        primary_logistics_at_closing_name: `${users?.primary_logistics_at_closing.first_name} ${users?.primary_logistics_at_closing.last_name}`
      }
      result = { ...result, ...primary_logistics_at_closing }
    }


    return result;
  },
};

export default userService;
