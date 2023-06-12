import documentSubType from 'assets/constants/document-sub-type';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import useRouteName from 'pages/route-outlet-context';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import documentService from 'services/document-service';
import initialDocument from 'state/document/initital-document';
import { ObjectType } from 'types';
import { DocumentEntity, DocumentEntityResponse } from 'types/documents-types';
import { OptionType } from 'types/option-type';

import RecordView from '../record-view';
import { moduleLabels } from 'assets/list/tracker/constant';
import trackerService from 'services/tracker-service';
import { isEmpty } from 'helpers/misc-helper';
import ErrorComponent from 'components/errors/error-component';
import CircularLoader from 'components/dog-loader/dog-lodar';

const DocumentView = ({ routeTag }: { routeTag: string }) => {
  const { market_preference_id, document_id } = useParams<ObjectType>();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [document, setDocument] = useState<DocumentEntity>(initialDocument);
  const [subTypetOptions, setSubtypeOption] = useState<OptionType[]>([]);
  const { routeName, setRouteName } = useRouteName();
  const loadAccount = async (document_id: string) => {
    let result: DocumentEntityResponse = await documentService.getDocument(
      document_id
    );

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setErrorMessage('');
    setDocument(result.data);

    trackerService.createRecentlyViewed({
      module_name: moduleLabels.Documents.label,
      item_id: document_id,
      item_summary: result.data.document_name,
      action: 'detailview'
    });
  };

  useEffect(() => {
    if (document_id) loadAccount(document_id);
  }, []);

  useEffect(() => {
    setSubtypeOption(documentSubType[document?.category_id] || []);
  }, [document?.category_id]);

  useEffect(() => {
    setRouteName(routeTag !== undefined ? routeTag : '');
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        {!isEmpty(errorMessage) ? (
          <ErrorComponent message={errorMessage} />
        ) : (
          <RecordView
            document={document}
            readOnly={true}
            document_id={document_id}
            setDocument={setDocument}
            subTypetOptions={subTypetOptions}
          />
        )}
      </PaperBoxContent>
    </PaperBox>
  );
};

export default DocumentView;
