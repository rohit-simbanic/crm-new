import AddButton from 'components/form/button-add';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import UnitText from 'components/form/unit-text';
import MessageBox from 'components/message-box-item';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import { isEmpty } from 'helpers/misc-helper';
import useRouteName from 'pages/route-outlet-context';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import messageService from 'services/message-service';
import { ObjectType } from 'types';

const BrokerageNotes = ({ routeTag }: { routeTag?: string }) => {
  let { opportunity_id } = useParams<ObjectType>();

  const outletContext = useRouteName();
  const [error, showError] = useState<string[]>([]);
  const [notes, setNotes] = useState([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [data, setData] = useState<any>({
    brokerage_note: ''
  });

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setDisabled(true);
    if (data.brokerage_note.trim().length == 0) {
      setDisabled(false);
      showError(['Please enter Notes']);
      return;
    }

    showError([]);

    const reqBody = {
      opportunity_id,
      name: data.brokerage_note
    };

    const result = await messageService.postBrokerageNote(reqBody);

    if (result.isSuccess) {
      setData((data: any) => ({ ...data, brokerage_note: '' }));
      await loadBrokerageNotes();
      setDisabled(false);
    }
  };

  const loadBrokerageNotes = async () => {
    const result = await messageService.getBrokerageNotes(opportunity_id);

    if (result.isSuccess) {
      setNotes(result.data.data);
    }
  };

  useEffect(() => {
    loadBrokerageNotes();
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
            <UnitText
              label="Type a note here..."
              name="brokerage_note"
              value={data.brokerage_note}
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

export default BrokerageNotes;
