import UnitItem from 'components/form/unit-item';
import ModalHeader from 'components/modal/modal-header';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxHeader from 'components/paper-box/paper-box-header';
import { isEmpty } from 'helpers/misc-helper';
import { OpportunityContext } from 'pages/opportunity/Context';
import useRouteName from 'pages/route-outlet-context';
import React, { useContext, useEffect } from 'react';
import UploadDocumentsNormal from './normal';
import UploadDocumentsRevision from './revision';

const UploadDocuments = ({
  routeTag,
  opportunity_id,
  action,
  onClose,
  setActiveTab
}: {
  routeTag?: string;
  opportunity_id?: string;
  action?: string;
  onClose?: any;
  setActiveTab?: any;
}) => {
  const { marketPreference } = useContext(OpportunityContext);
  const outletContext = useRouteName();

  useEffect(() => {
    if (!isEmpty(useContext) && !isEmpty(routeTag))
      outletContext.setRouteName(routeTag !== undefined ? routeTag : '');
  }, []);

  return (
    <PaperBox>
      {action ? (
        <PaperBoxHeader
          sx={{ pb: 3 }}
          value={
            <>
              <UnitItem grid={{ xs: 12, sm: 12 }} p={0}>
                <ModalHeader title="" onClose={onClose} />
              </UnitItem>
            </>
          }
        />
      ) : (
        <></>
      )}

      <PaperBoxContent>
        {marketPreference.enable_to_upload_document_revision == 1 ? (
          <UploadDocumentsRevision
            routeTag={routeTag || ''}
            opportunityId={opportunity_id || ''}
            action={action || ''}
            onClose={onClose}
            setActiveTab={setActiveTab}
          />
        ) : (
          <UploadDocumentsNormal
            routeTag={routeTag || ''}
            action={action || ''}
            onClose={onClose}
            setActiveTab={setActiveTab}
          />
        )}
      </PaperBoxContent>
    </PaperBox>
  );
};

export default UploadDocuments;
