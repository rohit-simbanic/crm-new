import { Box } from '@mui/material';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import ModalHeader from 'components/modal/modal-header';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxHeader from 'components/paper-box/paper-box-header';
import HorizontalTabs from 'components/tabs/horizontal-tabs';
import TabArea from 'components/tabs/tab-area';
import UploadDocuments from 'features/document-upload';
import DocumentList from 'features/documents/document-list';
import OpportunityName from 'features/opportunity-name';
import { OpportunityContext } from 'pages/opportunity/Context';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ObjectType } from 'types';
import { isEmpty } from 'helpers/misc-helper';
import useRouteName from 'pages/route-outlet-context';
import RecordView from './record-view';
import ActionName from 'assets/constants/action-name';

const ClearDueDiligence = ({
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
  const tabId = 'clear-due-diligence';
  const outletContext = useRouteName();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabItems = () => {
    return {
      action: 'Actions',
      documents: 'Documents',
      upload_documents: 'Upload Documents'
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
                      ActionName.clear_due_diligence
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
              <TabArea index={2} value={activeTab} border={false} tabId={tabId}>
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
            </UnitItem>
          </FormContainer>
        </PaperBoxContent>
      </PaperBox>
    </React.Fragment>
  );
};

export default ClearDueDiligence;
