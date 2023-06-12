import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sqsService from 'services/sqs-service';
import initialSqs from 'state/sqs/initial-sqs';
import { ObjectType } from 'types';
import { SQSEntity } from 'types/sqs-types';

import RecordView from '../record-view';

const SQSCreate = ({ routeTag }: { routeTag: string }) => {
  const { sqs_id, opportunity_id } = useParams();

  const [sqs, setSqs] = useState<SQSEntity>(initialSqs);

  const { routeName, setRouteName } = useRouteName();

  const [validation, setValidation] = useState<{ [key: string]: any }>({});

  const handleChange = (e: any) => {
    setSqs(Object.assign({}, sqs, { [e.target.name]: e.target.value }));
  };

  const loadSqs = async (sqs_id: string) => {
    let sqs = await sqsService.get(sqs_id);

    setSqs(sqs.data);
  };

  const handleSubmit = async () => {
    let response;

    setValidation({});

    let reqBody: ObjectType = {
      name: sqs.name,
      queue: sqs.queue,
      origin: sqs.origin,
      status: sqs.status,
      message_id: sqs.message_id,
      receipt_handle: sqs.receipt_handle,
      message: sqs.message
    };

    if (sqs_id) {
      response = await sqsService.update(sqs_id, reqBody);
    } else {
      response = await sqsService.create(reqBody);
    }

    if (response.isValidationError) {
      setValidation(response.errorMessage);
    }

    if (response.isSuccess) {
      window.history.back();
    }
  };

  useEffect(() => {
    if (sqs_id !== undefined) loadSqs(sqs_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView
          sqs={sqs}
          validation={validation}
          onChange={handleChange}
          theme="snow"
          isCreate={true}
        />

        <StackRowWithDivider>
          <SaveButton onClick={handleSubmit} />
          <CancelButton />
        </StackRowWithDivider>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default SQSCreate;
