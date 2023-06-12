import EVENTS from 'assets/constants/events';
import fieldLabel from 'assets/constants/fieldLabel';
import DraftButton from 'components/form/button-draft';
import SendButton from 'components/form/button-send';
import FormContainer from 'components/form/container';
import UnitComposer from 'components/form/unit-composer';
import UnitItem from 'components/form/unit-item';
import UnitText from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import HorizontalTabs from 'components/tabs/horizontal-tabs';
import TabArea from 'components/tabs/tab-area';
import ValidationError from 'components/errors/validation-error';
import emptyFunction from 'helpers/empty-function-helper';
import eventBus from 'helpers/event-bus-helper';
import { isEmpty } from 'helpers/misc-helper';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import emailService from 'services/mail-service';
import { ObjectType } from 'types';
import useMediaQuery from '@mui/material/useMediaQuery';

import FileAttachment from './file-attachment';
import FilePanel from './file-panel';

const tabId = 'editor-tab';

const ComposeForm = ({
  mail,
  handleChange,
  valMessages,
  readOnly,
  draftMail,
  send,
  content,
  savedAttachments,
  unSavedAttachments,
  loading,
  dispatch,
  dispatch2,
  setContent
}: any) => {
  const { thread_id, opportunity_id } = useParams<ObjectType>();

  const [activeTabIndex, setActiveTabIndex] = React.useState<number>(0);

  const mobileView = useMediaQuery('(max-width:599px)');
  const foldMobileView = useMediaQuery('(max-width:280px)');

  const handleActiveTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setActiveTabIndex(newValue);
  };

  const isEmptyContent = () => {
    let valid = false;

    if (isEmpty(mail.opportunity_id)) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        isError: true,
        message: 'Opportunity Required'
      });
      valid = true;
    }

    if (isEmpty(content.text)) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        isError: true,
        message: 'HTML body require'
      });
      valid = true;
    }

    return valid;
  };

  const loadPreview = async () => {
    const result = await emailService.getEmailPreview({
      opportunity_id: mail.opportunity_id,
      body_html: content.html
    });

    if (result.isError) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        isError: true,
        message: result.errorMessage
      });
      return;
    }

    if (setContent) {
      setContent({
        html: content.html,
        text: content.text,
        preview: result.data.preview
      });
    }
  };

  useEffect(() => {
    if (activeTabIndex == 1) {
      loadPreview();
    }
  }, [activeTabIndex]);

  return (
    <PaperBox>
      <PaperBoxContent>
        <FormContainer>
          <UnitText
            label={fieldLabel.from}
            name="from"
            value={mail.from ?? ''}
            onChange={handleChange}
            error={valMessages['from'] ?? ''}
            required
            // readOnly={true}
            disabled={true}
            variant="standard"
          />

          <UnitText
            label={fieldLabel.replyTo}
            name="reply_to"
            value={mail.reply_to ?? ''}
            onChange={handleChange}
            error={valMessages['reply_to'] ?? ''}
            required
            // readOnly={true}
            disabled={true}
            variant="standard"
          />

          <UnitText
            label={fieldLabel.to}
            name="to"
            value={mail.to ?? ''}
            onChange={handleChange}
            error={valMessages['to'] ?? ''}
            required
            readOnly={readOnly}
            grid={{ xs: 12, sm: 12 }}
            variant="standard"
          />

          <UnitText
            label={fieldLabel.cc}
            name="cc"
            value={mail.cc ?? ''}
            onChange={handleChange}
            error={valMessages['cc'] ?? ''}
            readOnly={readOnly}
            variant="standard"
          />

          <UnitText
            label={fieldLabel.bcc}
            name="bcc"
            value={mail.bcc ?? ''}
            onChange={handleChange}
            error={valMessages['bcc'] ?? ''}
            readOnly={readOnly}
            variant="standard"
          />

          {!thread_id && (
            <UnitText
              label={fieldLabel.subject}
              name="subject"
              value={mail.subject ?? ''}
              onChange={handleChange}
              error={valMessages['subject'] ?? ''}
              required
              readOnly={readOnly}
              grid={{ xs: 12, sm: 12 }}
              variant="standard"
            />
          )}

          {!readOnly && (
            <>
              <UnitItem
                grid={{
                  xs: 12,
                  sm: 12,
                  md: 6
                }}
                p={0}
              >
                <HorizontalTabs
                  value={activeTabIndex}
                  handleChange={(e: any, newValue: number) => {
                    if (newValue == 1) {
                      if (!isEmptyContent()) handleActiveTabChange(e, newValue);
                    } else {
                      handleActiveTabChange(e, newValue);
                    }
                  }}
                  tabItems={{
                    write: 'Write',
                    preview: 'Preview'
                  }}
                  tabId={tabId}
                />
              </UnitItem>

              <UnitItem grid={{ xs: 12, sm: 12, md: 6 }} sx={{ mt: 0 }} p={0}>
                <SendButton
                  onClick={send ? send : emptyFunction}
                  disabled={loading}
                />
                {'  '}&nbsp;
                <DraftButton
                  onClick={draftMail ? draftMail : emptyFunction}
                  disabled={loading}
                />
                <FileAttachment
                  addUnSavedFile={(file: any) => {
                    if (dispatch2 !== undefined) {
                      dispatch2({ type: 'ADD', payload: { file } });
                    }
                  }}
                />
              </UnitItem>
            </>
          )}

          <UnitItem
            grid={{
              xs: 12,
              sm:
                savedAttachments.length > 0 ||
                unSavedAttachments.length > 0 ||
                mail.notes.length > 0
                  ? 8
                  : 12
            }}
            p={0}
            sx={{
              paddingTop: '0px !important'
            }}
          >
            {readOnly ? (
              <>
                <UnitComposer
                  grid={{ xs: 12, sm: 12 }}
                  value={readOnly ? content.html : content.preview}
                  theme={'bubble'}
                  onChange={emptyFunction}
                  readOnly={true}
                  label=""
                  pt={0}
                  pb={0}
                />
              </>
            ) : (
              <>
                <TabArea index={activeTabIndex} border={false} tabId={tabId}>
                  {activeTabIndex === 0 && (
                    <UnitComposer
                      grid={{ xs: 12, sm: 12 }}
                      value={readOnly ? mail.body_html : content.html}
                      theme={'snow'}
                      onChange={(mail: ObjectType) => {
                        if (setContent !== undefined) setContent(mail);
                      }}
                      height="100vh"
                      readOnly={false}
                      label=""
                      pt={0}
                      pb={
                        (savedAttachments.length > 0 ||
                          unSavedAttachments.length > 0 ||
                          mail.notes.length > 0) &&
                        !mobileView
                          ? 10
                          : 8
                      }
                    />
                  )}

                  {activeTabIndex == 1 && (
                    <UnitComposer
                      grid={{ xs: 12, sm: 12 }}
                      value={readOnly ? mail.body_html : content.preview}
                      theme={'bubble'}
                      onChange={emptyFunction}
                      readOnly={true}
                      label=""
                      height="100vh"
                      pt={0}
                      pb={1}
                    />
                  )}
                </TabArea>
              </>
            )}
          </UnitItem>

          <UnitItem grid={{ xs: 12, sm: 4 }}>
            <UnitItem
              grid={{ xs: 12, sm: 12 }}
              sx={{ paddingTop: mobileView ? (foldMobileView ? 8 : 3) : 0 }}
            >
              {(savedAttachments.length > 0 ||
                unSavedAttachments.length > 0 ||
                mail.notes.length > 0) && (
                <>
                  <FilePanel
                    readOnly={readOnly}
                    savedFiles={savedAttachments}
                    unSavedFiles={unSavedAttachments}
                    notesFiles={mail.notes}
                    removeFile={(flag: number, index: number) => {
                      if (flag == 1) {
                        if (dispatch !== undefined) {
                          dispatch({
                            type: 'REMOVE',
                            payload: { index }
                          });
                        }
                      } else if (flag == 0) {
                        if (dispatch2 !== undefined) {
                          dispatch2({
                            type: 'REMOVE',
                            payload: { index }
                          });
                        }
                      } else {
                        handleChange({
                          notes: [...mail.notes].filter((x, i) => i != index)
                        });
                      }
                    }}
                  />
                </>
              )}
            </UnitItem>
          </UnitItem>

          {valMessages['body_html'] != undefined && (
            <UnitItem grid={{ xs: 12, sm: 12 }}>
              <ValidationError data={valMessages['body_html']} />
            </UnitItem>
          )}
          {valMessages['body_plain'] != undefined && (
            <UnitItem grid={{ xs: 12, sm: 12 }}>
              <ValidationError data={valMessages['body_plain']} />
            </UnitItem>
          )}
        </FormContainer>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default ComposeForm;
