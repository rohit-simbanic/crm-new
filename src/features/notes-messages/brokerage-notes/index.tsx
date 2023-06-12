import { Box, FormControl, Grid } from '@mui/material';
import AddButton from 'components/form/button-add';
import FormContainer from 'components/form/container';
import FieldText from 'components/form/field-text';
import MessageBox from 'components/message-box-item';
import ValidationError from 'components/errors/validation-error';
import ModelTitle from 'features/brokerage-actions/model-title';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import messageService from 'services/message-service';
import { ObjectType } from 'types';

const BrokerageNotes = () => {
  let { opportunity_id } = useParams<ObjectType>();
  const [error, showError] = useState<boolean>(false);
  const [notes, setNotes] = useState([]);

  const [data, setData] = useState<any>({
    brokerage_note: ''
  });

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (data.brokerage_note.trim().length == 0) {
      showError(true);
      return;
    }

    showError(false);

    const reqBody = {
      opportunity_id,
      name: data.brokerage_note
    };

    const loadBrokerageNotes = async () => {
      const result: ObjectType = await messageService.getBrokerageNotes(
        opportunity_id
      );
      setNotes(result.data);
    };

    const result: ObjectType = await messageService.postBrokerageNote(reqBody);
    if (result.isSuccess) {
      setData((data: any) => ({ ...data, brokerage_note: '' }));
      loadBrokerageNotes();
    }

    useEffect(() => {
      loadBrokerageNotes();
    }, []);

    return (
      <>
        {!opportunity_id && <ModelTitle title="Brokerage Notes" />}
        <FormContainer>
          <Grid container>
            <Grid container item sm={12}>
              <Grid sm={10} xs={12}>
                <Box p={1}>
                  <FormControl fullWidth>
                    <FieldText
                      type="text"
                      label="Type a note here..."
                      name="brokerage_note"
                      id="brokerage_note"
                      value={data.brokerage_note}
                      onChange={handleChange}
                      size="small"
                      multiline
                      rows={2}
                      fullWidth
                    />
                    {error && <ValidationError data={['Please enter note']} />}
                  </FormControl>
                </Box>
              </Grid>
              <Grid sm={2} xs={12}>
                <Box p={1}>
                  <AddButton onClick={handleSubmit} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </FormContainer>
        <Grid container spacing={2}>
          <Grid container mr={2} mt={3} ml={1}>
            <Grid sm={12} xs={12}>
              <MessageBox notes={notes} />
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };
};
export default BrokerageNotes;
