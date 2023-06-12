import fieldLabel from 'assets/constants/fieldLabel';
import messageOrigin from 'assets/constants/message-origin';
import queue from 'assets/constants/queue';
import sqsStatus from 'assets/constants/sqs-status';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitDateTime from 'components/form/unit-date-time';
import UnitEmpty from 'components/form/unit-empty';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import emptyFunction from 'helpers/empty-function-helper';
import { isEmpty } from 'helpers/misc-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import { useParams } from 'react-router-dom';
import { ObjectType } from 'types';
import { SQSEntity } from 'types/sqs-types';

interface recordViewType {
  sqs: SQSEntity;
  validation?: ObjectType;
  onChange?: (e: any) => any;
  readOnly?: boolean;
  theme?: string;
  isCreate?: boolean;
  isView?: boolean;
}

const RecordView = ({
  sqs: sqs,
  validation,
  onChange,
  readOnly = false,
  theme = 'bubble',
  isCreate = false,
  isView = false
}: recordViewType) => {
  const { market_preference_id } = useParams();

  let handleChange = onChange ?? emptyFunction;
  let valMessages = validation ?? {};

  return (
    <FormContainer>
      <UnitText
        label={fieldLabel.event}
        name="name"
        value={sqs.name ?? ''}
        onChange={handleChange}
        error={valMessages['name'] ?? ''}
        required
        readOnly={readOnly}
      />

      {isView && (
        <>
          <UnitEmpty />
          <UnitText
            label={fieldLabel.opportunity}
            name={'opportunity.name'}
            value={sqs.opportunity?.name ?? ''}
            readOnly={true}
            onChange={emptyFunction}
          />

          <UnitText
            label={fieldLabel.marketPreferenceName}
            name={'market_preference.name'}
            value={
              !isEmpty(sqs.market_preference_id)
                ? sqs.market_preference.name
                : ''
            }
            readOnly={true}
            onChange={emptyFunction}
          />
        </>
      )}

      <UnitSelect
        name="queue"
        label={fieldLabel.queue}
        records={getObjectEntriesAsArray(queue)}
        value={sqs.queue ?? ''}
        error={valMessages['queue'] ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
        required
      />

      {isView && (
        <UnitText
          label={fieldLabel.attampts}
          name={'attempts'}
          value={sqs.attempts ?? ''}
          readOnly={true}
          onChange={emptyFunction}
        />
      )}

      <UnitSelect
        name="origin"
        label={fieldLabel.messageOrigin}
        records={getObjectEntriesAsArray(messageOrigin)}
        value={sqs.origin ?? ''}
        error={valMessages['origin'] ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
        required
      />

      <UnitSelect
        name="status"
        label={fieldLabel.status}
        records={getObjectEntriesAsArray(sqsStatus)}
        value={sqs.status ?? ''}
        error={valMessages['status'] ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
        required
      />

      <UnitText
        label={fieldLabel.sqsMessageID}
        name="message_id"
        value={sqs.message_id ?? ''}
        onChange={handleChange}
        error={valMessages['message_id'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.receiptHandle}
        name="receipt_handle"
        value={sqs.receipt_handle ?? ''}
        onChange={handleChange}
        error={valMessages['receipt_handle'] ?? ''}
        required
        readOnly={readOnly}
        multiline
        rows={4}
      />

      {isView && (
        <>
          <UnitDate
            label={fieldLabel.dateEntered}
            value={sqs?.date_entered!}
            name={'date_entered'}
            onChange={emptyFunction}
            readOnly={true}
          />

          <UnitDateTime
            name="date_sent"
            value={sqs?.date_sent!}
            label={fieldLabel.dateSent}
            onChange={emptyFunction}
            readOnly={true}
            disabled={true}
          />
        </>
      )}

      <UnitText
        label={fieldLabel.message}
        name="message"
        value={sqs.message ? JSON.stringify(sqs.message) : ''}
        onChange={handleChange}
        error={valMessages['message'] ?? ''}
        required
        readOnly={readOnly}
        multiline
        rows={4}
      />

      {isView && (
        <UnitText
          name="description"
          value={sqs.description ?? ''}
          label={fieldLabel.description}
          onChange={emptyFunction}
          readOnly={readOnly}
          multiline
          rows={2}
        />
      )}
    </FormContainer>
  );
};

export default RecordView;
