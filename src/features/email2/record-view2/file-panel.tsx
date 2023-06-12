import { Box, IconButton, List, ListItem } from '@mui/material';
import { v4 as uuid } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import FormContainer from 'components/form/container';
import React from 'react';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import UnitItem from 'components/form/unit-item';
import useColorToken from 'hooks/useColorToken';
import ModalTitle from 'components/modal/modal-title';

interface FilePanelProps {
  readOnly: boolean;
  savedFiles?: any[];
  unSavedFiles?: any[];
  notesFiles: any;
  removeFile?: any;
  title?: string;
}

const FilePanel = ({
  readOnly = false,
  savedFiles = [],
  unSavedFiles = [],
  notesFiles,
  removeFile,
  title = 'CRM Documents'
}: FilePanelProps) => {
  const colors = useColorToken();

  return (
    <>
      <FormContainer>
        <UnitItem grid={{ xs: 12, sm: 12 }} p={0}>
          {(savedFiles.length > 0 || notesFiles.length > 0) && (
            <>
              <ModalTitle value={title} />
              <Box
                sx={{
                  // p: 1,
                  // mt: 2.5,
                  minHeight: '0px',
                  maxHeight: '50vh',
                  overflowY: 'auto',
                  border: '1px solid  #ccc'
                }}
              >
                <List>
                  {notesFiles.map((file: any, index: number) => (
                    <ListItem
                      key={uuid()}
                      className="mb-1"
                      sx={{
                        wordWrap: 'break-word'
                      }}
                      secondaryAction={
                        !readOnly && (
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => removeFile(2, index)}
                            color="inherit"
                          >
                            <DeleteIcon />
                          </IconButton>
                        )
                      }
                    >
                      <UnitItem grid={{ xs: 12, sm: 12 }} p={0}>
                        {`${file.name}`}
                        <StackRowWithDivider />
                      </UnitItem>
                    </ListItem>
                  ))}
                  {savedFiles.map((file: any, index: number) => (
                    <>
                      <ListItem
                        key={uuid()}
                        sx={{
                          wordWrap: 'break-word'
                        }}
                        secondaryAction={
                          !readOnly && (
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => removeFile(1, index)}
                              color="inherit"
                            >
                              <DeleteIcon />
                            </IconButton>
                          )
                        }
                      >
                        <UnitItem grid={{ xs: 12, sm: 12 }} p={0}>
                          {`${file.name}`}
                        </UnitItem>
                      </ListItem>
                      <StackRowWithDivider />
                    </>
                  ))}
                </List>
              </Box>
            </>
          )}
        </UnitItem>
        <UnitItem
          grid={{ xs: 12, sm: 12 }}
          p={0}
          sx={{
            paddingTop:
              savedFiles.length === 0 ? '0px !important' : '16px !important'
          }}
        >
          {unSavedFiles.length > 0 && (
            <>
              <ModalTitle value="Local Documents" />
              <Box
                sx={{
                  // p: 1,
                  // mt: 1,
                  minHeight: '0px',
                  maxHeight: '50vh',
                  overflowY: 'auto',
                  border: '1px solid  #ccc'
                }}
              >
                <List>
                  {unSavedFiles.map((file: any, index: number) => (
                    <>
                      <ListItem
                        key={uuid()}
                        sx={{
                          wordWrap: 'break-word'
                        }}
                        secondaryAction={
                          !readOnly && (
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => removeFile(0, index)}
                              color="inherit"
                            >
                              <DeleteIcon />
                            </IconButton>
                          )
                        }
                      >
                        <UnitItem grid={{ xs: 12, sm: 12 }} p={0}>
                          {`${file.name}`}
                        </UnitItem>
                      </ListItem>
                      <StackRowWithDivider />
                    </>
                  ))}
                </List>
              </Box>
            </>
          )}{' '}
        </UnitItem>
      </FormContainer>
    </>
  );
};

export default FilePanel;
