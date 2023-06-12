import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Typography } from '@mui/material';
import EVENTS from 'assets/constants/events';
import UnitCard from 'components/card';
import DateUtility from 'helpers/date-helper';
import eventBus from 'helpers/event-bus-helper';
import { useState } from 'react';
import messageService from 'services/message-service';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { v4 as uuid } from 'uuid';
import { isEmpty } from 'helpers/misc-helper';

import RouteLink from 'components/link/route-link';

const MessageBoxItem = ({
  notes,
  loadMessages,
  deleteItem
}: {
  notes: any;
  loadMessages?: any;
  deleteItem?: boolean;
}) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const deleteMessage = async (deleteId: string) => {
    setDisabled(true);
    const result = await messageService.deleteMessage(deleteId);

    if (loadMessages) {
      await loadMessages();
      setDisabled(false);
    }

    if (result.isSuccess) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        message: result.data.message,
        isError: false
      });
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: 1,
        pr: '0',
        pl: 1,
        height: 'calc(100vh - 51.5vh)',
        overflow: 'auto'
      }}
    >
      {notes.map((note: any) => (
        <UnitCard
          key={uuid()}
          avatar={
            note.get_created_by?.first_name
              ? note.get_created_by?.first_name.substring(0, 1)
              : note.sent_by_user?.first_name.substring(0, 1)
          }
          sx={{ borderTop: 'none', borderRight: 'none', borderLeft: 'none' }}
          title={`${
            note.get_created_by?.first_name
              ? `${note.get_created_by?.first_name ?? ''} ${
                  note.get_created_by?.last_name ?? ''
                }`
              : `${note.sent_by_user?.first_name ?? ''} ${
                  note.sent_by_user?.last_name ?? ''
                }`
          } at ${DateUtility.getDateTimeString(note.date_entered)}`}
          subheader={
            note && (
              <>
                {note.name && (
                  <>
                    <Typography component={'span'} variant="body1">
                      {note.description ?? note.name}
                      <br />
                      {!isEmpty(note?.document?.document_name) && (
                        <>
                          File Name:
                          <RouteLink
                            url={`/documents/${note.document?.document_revision_id}/viewer`}
                            target
                            name={
                              <>
                                <IconButton>
                                  <InsertDriveFileIcon fontSize='small' />
                                </IconButton>
                                {note?.document?.document_name}
                              </>
                            }
                          />
                          <br />
                          Document Name: {note?.document?.document_name}
                          <br />
                          Publish Date:{' '}
                          {DateUtility.getDateString(note.date_entered)}
                          <br />
                          Created by:{' '}
                          {note.get_created_by?.first_name
                            ? note.get_created_by?.first_name
                            : note.sent_by_user?.first_name}
                        </>
                      )}
                    </Typography>
                  </>
                )}
              </>
            )
          }
          action={
            deleteItem && (
              <>
                <IconButton
                  onClick={() => {
                    deleteMessage(note.id);
                  }}
                  disabled={disabled}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            )
          }
          isLeft={note?.origin === 0 ? 0 : 1}
        />
      ))}
    </Box>
  );
};

export default MessageBoxItem;
