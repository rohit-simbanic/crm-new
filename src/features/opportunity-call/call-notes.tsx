import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import fieldLabel from 'assets/constants/fieldLabel';
import AddButton from 'components/form/button-add';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import UnitText from 'components/form/unit-text';
import StackRow from 'components/stack/stack-row';
import { isEmptyObject } from 'helpers/misc-helper';
import React from 'react';
import { ObjectType } from 'types';

const CallNotes = (props: ObjectType) => {
  const {
    opportunityCall,
    notes,
    handleChange,
    createCallNote,
    loginUser,
    opportunity
  } = props;

  if (!isEmptyObject(notes)) {
    notes.sort((a: any, b: any) =>
      new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
    );
  }

  return (
    <>
      <FormContainer spacing={2}>
        <UnitText
          label={fieldLabel.notes}
          name="notes"
          value={opportunityCall.notes}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          grid={{ xs: 12, sm: 9 }}
        />

        <UnitItem grid={{ xs: 12, sm: 2 }} sx={{ p: 0 }}>
          <StackRow isUnitItem>
            <AddButton onClick={createCallNote} />
          </StackRow>
        </UnitItem>

        <UnitItem grid={{ xs: 12, sm: 12 }}>
          <Box
            sx={{
              width: '100%',
              maxHeight: 350,
              overflowY: 'scroll',
              border: `${notes && notes.length > 0 && '1px solid #eee'}`,
              pr: '0',
              borderRadius: 1
            }}
          >
            <List>
              {notes.map((note: any) => (
                <>
                  <ListItem
                    sx={{ padding: '10px', p: 1 }}
                    component="div"
                    disablePadding
                    key={note.id}
                  >
                    <UnitItem
                      grid={{ sm: 12, xs: 12 }}
                      p={1}
                      sx={{ backgroundColor: '#DDD' }}
                    >
                      <Box>
                        {loginUser
                          ? `${loginUser.first_name} ${loginUser.last_name}`
                          : ''}{' '}
                        at {note.createdAt}
                        <Box sx={{ float: 'right' }}>
                          {opportunity?.parties_listing_agent_name || ''}
                        </Box>
                      </Box>
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: note.note
                        }}
                      ></Box>
                      <Box sx={{ float: 'right' }}>Call ID: {note.callId}</Box>
                    </UnitItem>
                  </ListItem>
                </>
              ))}
            </List>
          </Box>
        </UnitItem>
      </FormContainer>
    </>
  );
};

export default CallNotes;
