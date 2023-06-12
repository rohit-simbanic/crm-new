import employeeStatus from 'assets/constants/employee-status';
import fieldLabel from 'assets/constants/fieldLabel';
import userStatus from 'assets/constants/user-status';
import userTimeZone from 'assets/constants/user-time-zone';
import userType from 'assets/constants/user-type';
import FormContainer from 'components/form/container';
import UnitEmpty from 'components/form/unit-empty';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import emptyFunction from 'helpers/empty-function-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import { ObjectType } from 'types';

interface recordViewType {
  profile: ObjectType;
  validation?: ObjectType;
  onChange?: (e: any) => any;
  readOnly?: boolean;
}

const RecordView = ({
  profile,
  validation,
  onChange,
  readOnly = false
}: recordViewType) => {
  let handleChange = onChange ?? emptyFunction;
  let valMessages = validation ?? {};

  return (
    <FormContainer>
      <UnitText
        label={fieldLabel.userName}
        name="user_name"
        value={profile?.user_name ?? ''}
        onChange={handleChange}
        error={valMessages['user_name'] ?? ''}
        required
        readOnly={readOnly}
        disabled={readOnly ? false : true}
      />

      <UnitText
        label={fieldLabel.firstName}
        name="first_name"
        value={profile?.first_name ?? ''}
        onChange={handleChange}
        error={valMessages['first_name'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.email}
        name="email"
        value={profile?.email ?? ''}
        onChange={handleChange}
        error={valMessages['email'] ?? ''}
        required
        readOnly={readOnly}
        disabled={true}
      />

      <UnitText
        label={fieldLabel.lastName}
        name="last_name"
        value={profile?.last_name ?? ''}
        onChange={handleChange}
        error={valMessages['last_name'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitSelect
        name="status"
        label={fieldLabel.status}
        records={getObjectEntriesAsArray(userStatus)}
        value={profile?.status ?? ''}
        onChange={handleChange}
        required
        readOnly={readOnly}
        error={valMessages['user_status'] ?? ''}
      />

      <UnitSelect
        name="crm_user_type"
        label={fieldLabel.userType}
        records={getObjectEntriesAsArray(userType)}
        value={profile?.crm_user_type ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
      />

      <UnitSelect
        name="employee_status"
        label={fieldLabel.employeeStatus}
        records={getObjectEntriesAsArray(employeeStatus)}
        value={profile?.employee_status ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
        error={valMessages['employee_status'] ?? ''}
      />

      <UnitEmpty />

      <UnitText
        label={fieldLabel.workPhone}
        name="phone_work"
        value={profile?.phone_work ?? ''}
        onChange={handleChange}
        error={valMessages['phone_work'] ?? ''}
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.mobile}
        name="phone_mobile"
        value={profile?.phone_mobile ?? ''}
        onChange={handleChange}
        error={valMessages['phone_mobile'] ?? ''}
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.addressStreet}
        name="address_street"
        value={profile?.address_street ?? ''}
        onChange={handleChange}
        error={valMessages['address_street'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitText
        name="address_city"
        label={fieldLabel.AddressCity}
        value={profile?.address_city ?? ''}
        onChange={handleChange}
        error={valMessages['address_city'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.addressStateRegion}
        name="address_state"
        value={profile?.address_state ?? ''}
        onChange={handleChange}
        error={valMessages['address_state'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.addressPostalCode}
        name="address_postalcode"
        value={profile?.address_postalcode ?? ''}
        onChange={handleChange}
        error={valMessages['address_postalcode'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.addressCountry}
        name="address_country"
        value={profile?.address_country ?? ''}
        onChange={handleChange}
        error={valMessages['address_country'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitEmpty />

      <UnitText
        label={fieldLabel.description}
        name="description"
        value={profile?.description ?? ''}
        onChange={handleChange}
        error={valMessages['description'] ?? ''}
        multiline={true}
        rows={4}
        readOnly={readOnly}
        grid={{ sm: 12, xs: 12 }}
      />

      <UnitSelect
        name="timezone"
        label={fieldLabel.timezone}
        records={getObjectEntriesAsArray(userTimeZone)}
        value={profile?.timezone ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
        error={valMessages['timezone'] ?? ''}
      />
    </FormContainer>
  );
};

export default RecordView;
