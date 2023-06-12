import { Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import UploadDocuments from 'features/document-upload';
import DocumentList from 'features/documents/document-list';
import ClientChat from '../client-chat';
import NegotiatorNotes from '../negotiator-notes';
import { useParams } from 'react-router-dom';
import { OpportunityContext } from 'pages/opportunity/Context';
import { ObjectType } from 'types';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxHeader from 'components/paper-box/paper-box-header';
import ModalHeader from 'components/modal/modal-header';
import HorizontalTabs from 'components/tabs/horizontal-tabs';
import TabArea from 'components/tabs/tab-area';
import OpportunityName from 'features/opportunity-name';
import useRouteName from 'pages/route-outlet-context';
import { isEmpty } from 'helpers/misc-helper';
import RecordView from './record-view';
import ActionName from 'assets/constants/action-name';

const ExtensionRequest = ({
  routeTag,
  onClose,
  currentTab,
  id
}: {
  routeTag: string;
  onClose?: any;
  currentTab?: string;
  id?: string;
}) => {
  let { opportunity_id } = useParams<ObjectType>();
  let { oppurtunity } = useContext(OpportunityContext);
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const outletContext = useRouteName();
  const tabId = 'extenstion-request';

  const tabItems = () => {
    return {
      action: 'Actions',
      negotiator_notes: 'Negotiator Notes',
      documents: 'Documents',
      upload_documents: 'Upload Documents',
      client_chat: 'Client Chat'
    };
  };

  useEffect(() => {
    if (!isEmpty(outletContext) && !isEmpty(routeTag))
      outletContext.setRouteName(routeTag !== undefined ? routeTag : '');
  }, []);

  return (
    <React.Fragment>
      <PaperBox evelationValue={0} sx={{ bgcolor: '#eff1f6' }}>
        {id ? (
          <PaperBoxHeader
            value={
              <>
                <UnitItem grid={{ xs: 12, sm: 12 }} p={0}>
                  <ModalHeader
                    title={OpportunityName(
                      oppurtunity,
                      ActionName.extension_request
                    )}
                    onClose={onClose}
                  />
                </UnitItem>
              </>
            }
          />
        ) : (
          <Box sx={{ mt: -1 }}></Box>
        )}
        <PaperBoxContent sx={{ p: 0 }}>
          <FormContainer spacing={0}>
            <UnitItem grid={{ xs: 12, sm: 12 }}>
              <HorizontalTabs
                value={activeTab}
                handleChange={handleTabChange}
                tabItems={tabItems()}
                sx={{ ml: -1 }}
                tabId={tabId}
              />
            </UnitItem>

            <UnitItem grid={{ xs: 12, sm: 12 }} p={0}>
              <TabArea index={0} value={activeTab} border={false} tabId={tabId}>
                <RecordView
                  onClose={onClose}
                  currentTab={currentTab}
                  oppurtunity={oppurtunity}
                />
              </TabArea>
              <TabArea index={1} value={activeTab} border={false} tabId={tabId}>
                <NegotiatorNotes id={opportunity_id} />
              </TabArea>
              <TabArea index={2} value={activeTab} border={false} tabId={tabId}>
                <PaperBoxContent
                  sx={{
                    height: 'calc(100vh - 35vh)',
                    overflowY: 'auto',
                    p: 0
                  }}
                >
                  <DocumentList />
                </PaperBoxContent>
              </TabArea>
              <TabArea index={3} value={activeTab} border={false} tabId={tabId}>
                <PaperBoxContent
                  sx={{
                    height: 'calc(100vh - 35vh)',
                    overflowY: 'auto',
                    p: 0
                  }}
                >
                  <UploadDocuments opportunity_id={opportunity_id} />
                </PaperBoxContent>
              </TabArea>
              <TabArea index={4} value={activeTab} border={false} tabId={tabId}>
                <ClientChat />
              </TabArea>
            </UnitItem>
          </FormContainer>
        </PaperBoxContent>
      </PaperBox>
    </React.Fragment>
  );
};

export default ExtensionRequest;
