import accountCustomerType from 'assets/constants/account-customer-type';
import accountStatusType from 'assets/constants/account-status-type';
import fieldLabel from 'assets/constants/fieldLabel';
import FormContainer from 'components/form/container';
import UnitEmpty from 'components/form/unit-empty';
import UnitSelect from 'components/form/unit-select';
import UnitSwitch from 'components/form/unit-switch';
import UnitText from 'components/form/unit-text';
import emptyFunction from 'helpers/empty-function-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import { ObjectType } from 'types';
import { AccountEntity } from 'types/account-types';
import UnitPriceFormatter from 'components/form/unit-price-formatter';

interface recordViewType {
  account: AccountEntity;
  validation?: ObjectType;
  onChange?: (e: any) => any;
  readOnly?: boolean;
}

const RecordView = ({
  account,
  validation,
  onChange,
  readOnly = false
}: recordViewType) => {
  let handleChange = onChange ?? emptyFunction;
  let valMessages = validation ?? {};

  return (
    <FormContainer>
      <UnitText
        label={fieldLabel.accountName}
        name="name"
        value={account.name ?? ''}
        onChange={handleChange}
        error={valMessages['name'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.enteraCustomerId}
        name="entera_customer_id"
        value={account.entera_customer_id ?? ''}
        error={valMessages['entera_customer_id'] ?? ''}
        onChange={handleChange}
        required
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.companyName}
        name="company_name"
        value={account.company_name ?? ''}
        onChange={handleChange}
        error={valMessages['company_name'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.contactFirstName}
        name="contact_first_name"
        value={account.contact_first_name ?? ''}
        onChange={handleChange}
        error={valMessages['contact_first_name'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.contactLastName}
        name="contact_last_name"
        value={account.contact_last_name ?? ''}
        onChange={handleChange}
        error={valMessages['contact_last_name'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.website}
        name="website"
        value={account.website ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.companyPhone}
        name="phone_office"
        value={account.phone_office ?? ''}
        error={valMessages['phone_office'] ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
        required
      />

      <UnitText
        label={fieldLabel.fax}
        name="phone_fax"
        value={account.phone_fax ?? ''}
        error={valMessages['phone_fax'] ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
      />

      <UnitSelect
        name="account_type"
        label={fieldLabel.customerType}
        records={getObjectEntriesAsArray(accountCustomerType)}
        value={account.account_type ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
      />

      <UnitSelect
        name="account_status"
        label={fieldLabel.accountStatus}
        records={getObjectEntriesAsArray(accountStatusType)}
        value={account.account_status ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.whitelistEmailDomainsSeperatedByCommna}
        name="whitelist_email_domains"
        value={account.whitelist_email_domains ?? ''}
        onChange={handleChange}
        multiline
        rows={4}
        readOnly={readOnly}
      />

      <UnitEmpty />

      <UnitSwitch
        value={account.enable_to_update_escrow_party ?? 0}
        onChange={handleChange}
        name="enable_to_update_escrow_party"
        label={fieldLabel.enableToUpdateEscrowParty}
        disabled={readOnly}
      />

      <UnitSwitch
        value={account.use_jacksonville_nefar_contract ?? 0}
        onChange={handleChange}
        name="use_jacksonville_nefar_contract"
        label={fieldLabel.useJacksonvilleNefarContract}
        disabled={readOnly}
      />
    </FormContainer>
  );
};

export default RecordView;
