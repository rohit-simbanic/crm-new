import fieldLabel from 'assets/constants/fieldLabel';
import opportunityStatus from 'assets/constants/opportunity-status';
import reasonDescription from 'assets/constants/reason-description';
import AddButton from 'components/form/button-add';
import BackButton from 'components/form/button-back';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitEmpty from 'components/form/unit-empty';
import UnitItem from 'components/form/unit-item';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import MessageBox from 'components/message-box-item';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import { isEmpty } from 'helpers/misc-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import { OpportunityContext } from 'pages/opportunity/Context';
import useRouteName from 'pages/route-outlet-context';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import messageService from 'services/message-service';
import { ObjectType } from 'types';

const TransactionNotes = ({ routeTag }: { routeTag?: string }) => {
  const location = useLocation();
  const outletContext = useRouteName();
  const { opportunity_id } = useParams<ObjectType>();
  let { oppurtunity } = useContext(OpportunityContext);

  const [error, showError] = useState<string[]>([]);
  const [notes, setNotes] = useState([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [data, setData] = useState<any>({
    opportunity_status_c: oppurtunity.opportunity_status_c,
    reason_description: oppurtunity.reason_description,
    close_date_c: oppurtunity.close_date_c,
    forecasted_close_date: oppurtunity?.forecasted_close_date,
    transaction_note: ''
  });

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setDisabled(true);
    if (data.transaction_note.trim().length == 0) {
      setDisabled(false);
      showError(['Please enter Notes']);
      return;
    }

    showError([]);

    const reqBody = {
      opportunity_id,
      reason_description: data.reason_description,
      forecasted_close_date: data.forecasted_close_date,
      name: data.transaction_note
    };

    const result = await messageService.postTransactionNote(reqBody);

    if (result.isSuccess) {
      setData((data: any) => ({ ...data, transaction_note: '' }));
      loadTransactionNotes();
      setDisabled(false);
    }
  };

  const loadTransactionNotes = async () => {
    const result = await messageService.getTransactionNotes(opportunity_id);

    if (result.isSuccess) {
      setNotes(result.data.data);
    }
  };

  useEffect(() => {
    loadTransactionNotes();
  }, []);

  useEffect(() => {
    if (!isEmpty(useContext) && !isEmpty(routeTag))
      outletContext.setRouteName(routeTag !== undefined ? routeTag : '');
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent sx={{ p: 2 }}>
        <FormContainer>
          <UnitItem grid={{ sm: 1, xs: 1 }}>
            {location.pathname.includes('notes_chats/transaction_notes') ? (
              <BackButton />
            ) : (
              <></>
            )}
          </UnitItem>
          <UnitEmpty grid={{ sm: 11, xs: 11 }} />

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
            name="reason_description"
            label={fieldLabel.reasonDescription}
            records={getObjectEntriesAsArray(reasonDescription)}
            value={data.reason_description ?? ''}
            onChange={handleChange}
            grid={{ xs: 12, sm: 5 }}
          />

          <UnitDate
            name="close_date_c"
            label={fieldLabel.closeDate}
            value={data.close_date_c ? data.close_date_c : null}
            onChange={(e) =>
              handleChange({
                target: {
                  name: 'close_date_c',
                  value: e
                }
              })
            }
            disabled={true}
            grid={{ xs: 12, sm: 5 }}
          />

          <UnitDate
            name="forecasted_close_date"
            label={fieldLabel.forecastedCloseDate}
            value={
              data.forecasted_close_date ? data.forecasted_close_date : null
            }
            onChange={(e) =>
              handleChange({
                target: {
                  name: 'forecasted_close_date',
                  value: e
                }
              })
            }
            grid={{ xs: 12, sm: 5 }}
          />

          <UnitText
            label="Type a note here..."
            name="transaction_note"
            value={data.transaction_note}
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
  );
};

export default TransactionNotes;
