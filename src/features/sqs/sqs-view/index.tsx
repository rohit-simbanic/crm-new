import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import useRouteName from 'pages/route-outlet-context';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sqsService from 'services/sqs-service';
import initialSQS from 'state/sqs/initial-sqs';
import { ObjectType } from 'types';
import { SQSEntity } from 'types/sqs-types';

import RecordView from '../record-view';

const SQSView = ({ routeTag }: { routeTag: string }) => {
  const { routeName, setRouteName } = useRouteName();

  const { sqs_id } = useParams<ObjectType>();

  const [sQS, setSQS] = useState<SQSEntity>(initialSQS);

  const loadSQS = async (sqs_id: string) => {
    let sQS = await sqsService.get(sqs_id);
    setSQS(sQS.data);
  };

  useEffect(() => {
    if (sqs_id) loadSQS(sqs_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView sqs={sQS} readOnly={true} isView={true} />
      </PaperBoxContent>
    </PaperBox>
  );
};

export default SQSView;
