import fieldLabel from 'assets/constants/fieldLabel';
import serviceType from 'assets/constants/service-type';
import FormContainer from 'components/form/container';
import UnitBrokerageUser from 'components/form/unit-brokerage-user';
import UnitDate from 'components/form/unit-date';
import UnitDateTime from 'components/form/unit-date-time';
import UnitEmpty from 'components/form/unit-empty';
import UnitRead from 'components/form/unit-read';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import RouteLink from 'components/link/route-link';
import emptyFunction from 'helpers/empty-function-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import { OpportunityContext } from 'pages/opportunity/Context';
import React, { useContext } from 'react';
import { ObjectType } from 'types';
import { ServiceEntity } from 'types/service-types';

interface recordViewType {
  service: ServiceEntity;
  readOnly?: boolean;
  isView?: boolean;
  onChange?: (e: any) => any;
  setField?: (e: string) => any;
  validation?: ObjectType;
}

const RecordView = ({
  service,
  onChange,
  readOnly = false,
  isView = false,
  setField = emptyFunction,
  validation
}: recordViewType) => {
  let handleChange = onChange ?? emptyFunction;
  let valMessages = validation ?? {};
  const { oppurtunity, oldOppurtunity } = useContext(OpportunityContext);
  const data: ObjectType = readOnly ? oldOppurtunity : oppurtunity;

  return (
    <>
      <FormContainer>
        <UnitText
          label={fieldLabel.opportunityName}
          name="request_info"
          value={service?.id ? service?.opportunity?.name : data?.name}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitSelect
          name="inspection_type"
          label={fieldLabel.serviceType}
          records={getObjectEntriesAsArray(serviceType)}
          value={service?.inspection_type ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          error={valMessages['inspection_type'] ?? ''}
        />

        <UnitDateTime
          label={fieldLabel.inspectionDate}
          name="inspection_date"
          value={service?.inspection_date ? service?.inspection_date : null}
          onChange={(e: any) =>
            handleChange({
              target: { name: 'inspection_date', value: e }
            })
          }
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.requestInfo}
          name="request_info"
          value={service?.request_info ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline={true}
          rows={4}
        />

        <UnitDate
          label={fieldLabel.inspectionScheduled}
          name="inspection_scheduled"
          value={service?.inspection_scheduled || null}
          onChange={(e: any) =>
            handleChange({
              target: { name: 'inspection_scheduled', value: e }
            })
          }
          readOnly={readOnly}
        />

        <UnitDate
          label={fieldLabel.requestDate}
          name="requested_date"
          value={service?.requested_date || null}
          onChange={(e: any) => {
            handleChange({
              target: { name: 'requested_date', value: e }
            });
            setField('requested_by');
          }}
          readOnly={readOnly}
        />

        {readOnly === true ? (
          <UnitRead
            label={fieldLabel.requestBy}
            value={service?.requested_by_name}
          />
        ) : (
          <UnitBrokerageUser
            label={fieldLabel.requestBy}
            value={{
              value: service?.requested_by,
              label: service?.requested_by_name
            }}
            onChange={(val: any) => {
              handleChange({
                requested_by_name: val?.label || '',
                requested_by: val?.value || ''
              });
            }}
            readOnly={readOnly}
          />
        )}

        <UnitDate
          label={fieldLabel.inspectionConfirmationDate}
          name="confirmation_date"
          value={service?.confirmation_date || null}
          onChange={(e: any) => {
            handleChange({
              target: { name: 'confirmation_date', value: e }
            });
            setField('confirmation_by');
          }}
          readOnly={readOnly}
        />

        {readOnly === true ? (
          <UnitRead
            label={fieldLabel.inspectionConfirmationBy}
            value={service?.confirmation_by_name}
          />
        ) : (
          <UnitBrokerageUser
            label={fieldLabel.inspectionConfirmationBy}
            value={{
              value: service?.confirmation_by,
              label: service?.confirmation_by_name
            }}
            onChange={(val: any) => {
              handleChange({
                confirmation_by_name: val?.label || '',
                confirmation_by: val?.value || ''
              });
            }}
            readOnly={readOnly}
          />
        )}

        <UnitText
          label={fieldLabel.closingNotes}
          name="closing_notes"
          value={service?.closing_notes ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline={true}
          rows={4}
        />

        <UnitText
          label={fieldLabel.inspectionNotes}
          name="inspection_notes"
          value={service?.inspection_notes ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline={true}
          rows={4}
        />
      </FormContainer>
    </>
  );
};

export default RecordView;
