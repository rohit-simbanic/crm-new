import fieldLabel from 'assets/constants/fieldLabel';
import partyType from 'assets/constants/party-type';
import FormContainer from 'components/form/container';
import UnitBrokerageUser from 'components/form/unit-brokerage-user';
import UnitEmpty from 'components/form/unit-empty';
import UnitRead from 'components/form/unit-read';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import emptyFunction from 'helpers/empty-function-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import { ObjectType } from 'types';
import { PartyEntity } from 'types/party-types';

interface recordViewType {
  party: PartyEntity;
  validation?: ObjectType;
  onChange?: (e: any) => any;
  readOnly?: boolean;
  subTypeOption?: any;
  isEdit?: boolean;
}

const RecordView = ({
  party,
  validation,
  onChange,
  readOnly = false,
  subTypeOption,
  isEdit
}: recordViewType) => {
  let handleChange = onChange ?? emptyFunction;
  let valMessages = validation ?? {};
  let user = JSON.parse(localStorage.getItem('user') || 'false');
  let assignedUserId;
  let assignedUserName;
  if (user && isEdit === false) {
    assignedUserName = `${user?.user?.first_name} ${user?.user?.last_name}`;
    assignedUserId = `${user?.user?.id}`;
  }

  return (
    <FormContainer>
      <UnitText
        label={fieldLabel.email}
        name="email"
        value={party.email ?? ''}
        onChange={handleChange}
        error={valMessages['email'] ?? ''}
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.name}
        name="name"
        value={party.name ?? ''}
        onChange={handleChange}
        error={valMessages['name'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitSelect
        name="type"
        label={fieldLabel.type}
        records={getObjectEntriesAsArray(partyType)}
        value={party.type ?? ''}
        onChange={handleChange}
        required
        error={valMessages['type'] ?? ''}
        readOnly={readOnly}
        disabled={isEdit ? true : false}
      />

      <UnitText
        label={fieldLabel.name2}
        name="name_2"
        value={party.name_2 ?? ''}
        onChange={handleChange}
        error={valMessages['name_2'] ?? ''}
        readOnly={readOnly}
      />

      <UnitSelect
        name="sub_type"
        label={fieldLabel.subType}
        records={subTypeOption}
        value={party.sub_type ?? ''}
        onChange={handleChange}
        error={valMessages['sub_type'] ?? ''}
        readOnly={readOnly}
        disabled={isEdit && !party.is_empty_subtype ? true : false}
      />

      <UnitEmpty />

      <UnitText
        label={fieldLabel.company}
        name="company"
        value={party.company ?? ''}
        onChange={handleChange}
        error={valMessages['company'] ?? ''}
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.mobile}
        name="mobile"
        value={party.mobile ?? ''}
        onChange={handleChange}
        error={valMessages['mobile'] ?? ''}
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.address}
        name="address"
        value={party.address ?? ''}
        onChange={handleChange}
        error={valMessages['address'] ?? ''}
        readOnly={readOnly}
        multiline={true}
        rows={4}
      />

      <UnitEmpty />

      <UnitText
        label={fieldLabel.license}
        name="license"
        value={party.license ?? ''}
        onChange={handleChange}
        error={valMessages['license'] ?? ''}
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.brokerageLicense}
        name="brokerage_license"
        value={party.brokerage_license ?? ''}
        onChange={handleChange}
        error={valMessages['brokerage_license'] ?? ''}
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.description}
        name="description"
        value={party.description ?? ''}
        onChange={handleChange}
        error={valMessages['description'] ?? ''}
        readOnly={readOnly}
        multiline={true}
        rows={4}
      />

      {readOnly === true ? (
        <UnitRead
          label={fieldLabel.assignedTo}
          value={party?.assigned_user_name || assignedUserName}
        />
      ) : (
        <UnitBrokerageUser
          label={fieldLabel.assignedTo}
          value={{
            value: party?.assigned_user_id || assignedUserId,
            label: party?.assigned_user_name || assignedUserName
          }}
          onChange={(val: any) => {
            handleChange({
              assigned_user_name: val?.label || '',
              assigned_user_id: val?.value || ''
            });
          }}
          readOnly={readOnly}
        />
      )}
    </FormContainer>
  );
};

export default RecordView;
