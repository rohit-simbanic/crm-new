import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, List, ListItem, useTheme } from '@mui/material';
import AddButton from 'components/form/button-add';
import ButtonAttachFile from 'components/form/button-attach-file';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import UnitText from 'components/form/unit-text';
import MessageBoxItem from 'components/message-box-item';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import { isEmpty } from 'helpers/misc-helper';
import useRouteName from 'pages/route-outlet-context';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import messageService from 'services/message-service';
import { tokens } from 'theme';
import { ObjectType } from 'types';

const ClientChat = ({ routeTag }: { routeTag?: string }) => {
  let { opportunity_id } = useParams<ObjectType>();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const outletContext = useRouteName();
  const [messages, setMessages] = useState<ObjectType[]>([]);
  const [description, setDescription] = useState<string>('');
  const [files, setFiles] = useState<any>(null);
  let fileInput = useRef<HTMLInputElement>(null);
  const [error, showError] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const selectFile = (e: any) => {
    const files: any = fileInput.current?.files;

    setFiles(files[0]);
    e.target.value = '';
  };

  const handleSubmit = async () => {
    setDisabled(true);
    if (description.trim().length == 0) {
      setDisabled(false);
      showError(['Please enter Message']);
      return;
    }

    showError([]);

    let reqBody = new FormData();
    reqBody.append('description', description);
    reqBody.append('opportunity_id', opportunity_id);
    if (files !== null) {
      reqBody.append('files', files);
    }

    const result = await messageService.postMessage(reqBody);

    if (result.isSuccess) {
      setFiles(null);
      setDescription('');
      loadMessages();
      setDisabled(false);
    }
  };

  const loadMessages = async () => {
    const result = await messageService.getMessages(opportunity_id);

    if (result.isSuccess) {
      setMessages(result.data.data);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    if (!isEmpty(useContext) && !isEmpty(routeTag))
      outletContext.setRouteName(routeTag !== undefined ? routeTag : '');
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <FormContainer>
          <ButtonAttachFile
            multiple={true}
            fileInput={fileInput}
            onChange={selectFile}
            grid={{ xs: 12, sm: 1 }}
          />

          <UnitText
            label="Type a message here..."
            name="description"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            error={error}
            multiline
            rows={2}
            grid={{ xs: 12, sm: 10 }}
          />

          <UnitItem grid={{ xs: 12, sm: 1 }}>
            <StackRow isUnitItem>
              <AddButton onClick={handleSubmit} disabled={disabled} />
            </StackRow>
          </UnitItem>
        </FormContainer>

        {files !== null && (
          <Box
            sx={{
              minHeight: '0px',
              maxHeight: '200px',
              overflowY: 'auto'
            }}
          >
            <List>
              <ListItem
                className="mb-1"
                sx={{
                  background:
                    theme.palette.mode === 'dark'
                      ? colors.primary[500]
                      : 'white'
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => setFiles(null)}
                    color="inherit"
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                {`${files.name}`}
              </ListItem>
            </List>
          </Box>
        )}
      </PaperBoxContent>
      <PaperBoxContent
        sx={{
          height: 'calc(100vh - 45.5vh)',
          overflowY: 'auto'
        }}
      >
        <FormContainer spacing={0}>
          <UnitItem grid={{ xs: 12, sm: 12 }}>
            <MessageBoxItem
              notes={messages}
              loadMessages={loadMessages}
              deleteItem={true}
            />
          </UnitItem>
        </FormContainer>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default ClientChat;
