import fieldLabel from 'assets/constants/fieldLabel';
import offerGrade from 'assets/constants/offer-grade';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitEmpty from 'components/form/unit-empty';
import UnitItem from 'components/form/unit-item';
import UnitPriceFormatter from 'components/form/unit-price-formatter';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import StackRow from 'components/stack/stack-row';
import eventBus from 'helpers/event-bus-helper';
import { isEmpty } from 'helpers/misc-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import upperCaseString from 'helpers/upper-case-string-helper';
import React from 'react';
import CTSCallService from 'services/cts-call-service';
import oppurtunityService from 'services/oppurtunity-service';
import { ObjectType } from 'types';

const OpporutnityUpdate = (props: ObjectType) => {
  const { opportunityCall, handleChange, opportunity, callId } = props;

  const handleSubmit = async () => {
    let opportunityReqbody = {
      offer_grade: opportunityCall.offer_grade || opportunity.offer_grade,
      lowest_acceptable_price:
        opportunityCall.lowest_acceptable_price ||
        opportunity.lowest_acceptable_price,
      offer_response_details:
        opportunityCall.offer_response_details ||
        opportunity.offer_response_details
    };

    const opportunityResult = await oppurtunityService.update(
      opportunity.id,
      opportunityReqbody
    );

    if (opportunityResult.isError) {
      eventBus.dispatch('SHOW_TOAST', {
        message: opportunityResult.errorMessage,
        isError: true
      });
      return;
    }

    let reqBody = {
      note: createCallNote(opportunityReqbody),
      identifier: 'create-call-note',
      contextId: opportunity?.id
    };

    let requestBodyCtsCall = isEmpty(callId) ? reqBody : { ...reqBody, callId };

    const ctsresult = await CTSCallService.ctsCall(requestBodyCtsCall);

    if (ctsresult.isError) {
      eventBus.dispatch('SHOW_TOAST', {
        message: ctsresult.errorMessage,
        isError: true
      });
      return;
    }

    eventBus.dispatch('cts_note_list_refresh', {});
    eventBus.dispatch('refresh_opportunity', {
      isConditionLoading: true
    });
  };

  const createCallNote = (opportunityCall: any) => {
    return `Offer Grade: <b>${upperCaseString(
      opportunityCall?.offer_grade
    )}</b>&nbsp;&nbsp;&nbsp;Lowest Acceptable Sales Price: <b>$${
      opportunityCall?.lowest_acceptable_price
    }</b> <br/><br/>Offer Grade Details: <br/>${
      opportunityCall?.offer_response_details
    }
    `;
  };

  return (
    <>
      <FormContainer spacing={2}>
        <UnitSelect
          name="offer_grade"
          value={opportunityCall.offer_grade || opportunity.offer_grade}
          label={fieldLabel.offerGrade}
          onChange={handleChange}
          records={getObjectEntriesAsArray(offerGrade)}
          grid={{ sm: 3, xs: 12 }}
        />

        <UnitPriceFormatter
          label={fieldLabel.lowestAcceptablePrice}
          name="lowest_acceptable_price"
          value={
            opportunityCall.lowest_acceptable_price ||
            opportunity.lowest_acceptable_price
          }
          onChange={handleChange}
          grid={{ sm: 3, xs: 12 }}
        />

        <UnitText
          label={fieldLabel.offerResponseDetails}
          name="offer_response_details"
          value={
            opportunityCall.offer_response_details ||
            opportunity.offer_response_details
          }
          onChange={handleChange}
          size="small"
          multiline={true}
          rows={2}
          grid={{ sm: 3, xs: 12 }}
        />

        <UnitItem grid={{ sm: 2, xs: 12 }} sx={{ p: 0 }}>
          <StackRow isUnitItem>
            <SaveButton onClick={handleSubmit} />
          </StackRow>
        </UnitItem>

        <UnitEmpty />
      </FormContainer>
    </>
  );
};

export default OpporutnityUpdate;
