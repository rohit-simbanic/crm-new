import fieldLabel from 'assets/constants/fieldLabel';
import opportunityStatus from 'assets/constants/opportunity-status';
import sellerResponse from 'assets/constants/seller-response';
import AddButton from 'components/form/button-add';
import BackButton from 'components/form/button-back';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitEmpty from 'components/form/unit-empty';
import UnitItem from 'components/form/unit-item';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import MessageBox from 'components/message-box-item';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import { TableContext } from 'components/table/table-context';
import eventBus from 'helpers/event-bus-helper';
import { isEmpty } from 'helpers/misc-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import { OpportunityContext } from 'pages/opportunity/Context';
import useRouteName from 'pages/route-outlet-context';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import messageService from 'services/message-service';
import oppurtunityService from 'services/oppurtunity-service';
import { ObjectType } from 'types';

const NegotiatorNotes = ({
  routeTag,
  id
}: {
  routeTag?: string;
  id?: string;
}) => {
  let { additionalInfo } = useContext(TableContext);
  const location = useLocation();
  const { opportunity_id } = useParams<ObjectType>();
  const outletContext = useRouteName();
  let { oppurtunity } = useContext(OpportunityContext);

  const [error, showError] = useState<string[]>([]);
  const [notes, setNotes] = useState([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [data, setData] = useState<any>({
    opportunity_status_c: oppurtunity?.opportunity_status_c,
    seller_offer_response: oppurtunity?.seller_offer_response,
    negotiator_note: ''
  });

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setDisabled(true);
    if (data.negotiator_note.trim().length == 0) {
      setDisabled(false);
      showError(['Please enter Notes']);

      return;
    }

    showError([]);

    const reqBody = {
      opportunity_id,
      seller_offer_response: data.seller_offer_response,
      name: data.negotiator_note
    };

    const result = await messageService.postNegotiatorNote(reqBody);
    if (result.isSuccess) {
      setData((data: any) => ({ ...data, negotiator_note: '' }));
      await loadNegotiatorNotes();
      setDisabled(false);
    }
  };

  const loadNegotiatorNotes = async () => {
    const result = await messageService.getNegotiatorNotes(opportunity_id);

    if (result.isSuccess) {
      setNotes(result.data.data);
    }
  };

  const updateOpportunity = async () => {
    const result = await oppurtunityService.update(opportunity_id, {
      opportunity_id,
      seller_offer_response: data.seller_offer_response
    });

    if (result.isSuccess) {
      eventBus.dispatch('refresh_opportunity', {});
      eventBus.dispatch(`${additionalInfo!.currentTab}_refresh`, {});
    }
  };
  useEffect(() => {
    loadNegotiatorNotes();
  }, []);

  useEffect(() => {
    if (!isEmpty(useContext) && !isEmpty(routeTag))
      outletContext.setRouteName(routeTag !== undefined ? routeTag : '');
  }, []);

  return (
    <>
      <PaperBox>
        <PaperBoxContent sx={{ overflowY: 'auto', p: 2 }}>
          <FormContainer>
            <UnitItem grid={{ sm: 1, xs: 1 }}>
              {location.pathname.includes('notes_chats/negotiator_notes') ? (
                <BackButton />
              ) : (
                <></>
              )}
            </UnitItem>
            <UnitEmpty grid={{ sm: 11, xs: 11 }} />
            {!location.pathname.includes('brokerage-action') &&
              opportunity_id && (
                <>
                  <UnitSelect
                    name="opportunity_status_c"
                    label={fieldLabel.opportunityStatus}
                    records={getObjectEntriesAsArray(opportunityStatus)}
                    value={data.opportunity_status_c ?? ''}
                    onChange={handleChange}
                    disabled={true}
                    grid={{ xs: 12, sm: 5 }}
                  />

                  <UnitSelect
                    name="seller_offer_response"
                    label={fieldLabel.sellerResponse}
                    records={getObjectEntriesAsArray(sellerResponse)}
                    value={data.seller_offer_response ?? ''}
                    onChange={handleChange}
                    grid={{ xs: 12, sm: 5 }}
                  />

                  <UnitItem grid={{ xs: 12, sm: 2 }}>
                    <StackRow isUnitItem>
                      <SaveButton onClick={updateOpportunity} />
                    </StackRow>
                  </UnitItem>
                </>
              )}

            <UnitText
              label="Type a note here..."
              name="negotiator_note"
              value={data.negotiator_note}
              onChange={handleChange}
              error={error}
              multiline
              rows={2}
              grid={{ xs: 12, sm: 10 }}
            />
            <UnitItem grid={{ xs: 12, sm: 2 }}>
              <StackRow isUnitItem>
                <AddButton onClick={handleSubmit} disabled={disabled} />
              </StackRow>
            </UnitItem>
          </FormContainer>
          <FormContainer spacing={0}>
            <UnitItem grid={{ xs: 12, sm: 12 }} sx={{ pl: 0 }}>
              <MessageBox notes={notes} />
            </UnitItem>
          </FormContainer>
        </PaperBoxContent>
      </PaperBox>
    </>
  );
};

export default NegotiatorNotes;
