import FormContainer from 'components/form/container';
import UnitText from 'components/form/unit-text';
import { ObjectType } from 'types';
import { TransactionHistoryEntity } from 'types/transaction-history-types';
import fieldLabel from 'assets/constants/fieldLabel';
import UnitDate from 'components/form/unit-date';
import emptyFunction from 'helpers/empty-function-helper';

interface recordViewType {
  transactionHistory: TransactionHistoryEntity;
  validation?: ObjectType;
  onChange?: (e: any) => any;
  readOnly?: boolean;
}

const RecordView = ({
  transactionHistory,
  validation,
  onChange,
  readOnly = false
}: recordViewType) => {
  let handleChange = onChange ?? emptyFunction;
  let valMessages = validation ?? {};

  return (
    <FormContainer>
      <UnitText
        label={fieldLabel.name}
        name="name"
        value={transactionHistory.name ?? ''}
        onChange={handleChange}
        error={valMessages['name'] ?? ''}
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.assignedTo}
        name="assigned_user_id"
        value={transactionHistory.assigned_user_id ?? ''}
        onChange={handleChange}
        error={valMessages['assigned_user_id'] ?? ''}
        readOnly={readOnly}
      />

      <UnitDate
        label={fieldLabel.dateEntered}
        name="date_entered"
        value={transactionHistory.date_entered ?? ''}
        onChange={(e: any) =>
          handleChange({
            target: { name: 'date_entered', value: e }
          })
        }
        error={valMessages['date_entered'] ?? ''}
        readOnly={readOnly}
      />

      <UnitDate
        label={fieldLabel.dateModified}
        name="date_modified"
        value={transactionHistory.date_modified ?? ''}
        onChange={(e: any) =>
          handleChange({
            target: { name: 'date_modified', value: e }
          })
        }
        error={valMessages['date_modified'] ?? ''}
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.description}
        name="description"
        value={transactionHistory.description ?? ''}
        onChange={handleChange}
        error={valMessages['description'] ?? ''}
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.closings}
        name="closings"
        value={transactionHistory?.opportunity?.name ?? ''}
        onChange={handleChange}
        error={valMessages['closings'] ?? ''}
        readOnly={readOnly}
      />
    </FormContainer>
  );
};

export default RecordView;
