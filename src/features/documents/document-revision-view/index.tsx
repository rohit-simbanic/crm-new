import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import useRouteName from 'pages/route-outlet-context';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import documentRevisionService from 'services/document-revision-service';
import initialRevision from 'state/document/intial-revision';
import { ObjectType } from 'types';
import {
  DocumentRevisionEntity,
  DocumentRevisionEntityResponse
} from 'types/documents-types';

import RecordView from './record-view';

const RevisionView = ({ routeTag }: { routeTag: string }) => {
  const { document_id, revision_id } = useParams<ObjectType>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [revision, setRevision] =
    useState<DocumentRevisionEntity>(initialRevision);

  const { routeName, setRouteName } = useRouteName();

  const loadRevision = async (revision_id: string) => {
    setIsLoading(true);
    const result: DocumentRevisionEntityResponse =
      await documentRevisionService.getDocumentsRevision(revision_id);
    setIsLoading(false);

    setRevision(result.data);
  };

  useEffect(() => {
    if (revision_id) loadRevision(revision_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag !== undefined ? routeTag : '');
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView revision={revision} />
      </PaperBoxContent>
    </PaperBox>
  );
};

export default RevisionView;
