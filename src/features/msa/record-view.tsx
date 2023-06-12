import FormContainer from 'components/form/container';
import UnitEmpty from 'components/form/unit-empty';
import UnitSelect from 'components/form/unit-select';
import UnitSwitch from 'components/form/unit-switch';
import UnitText from 'components/form/unit-text';
import { ObjectType } from 'types';
import fieldLabel from 'assets/constants/fieldLabel';
import { MsaEntity } from 'types/msa-types';
import emptyFunction from 'helpers/empty-function-helper';
import stateOptions from 'assets/constants/state';
import getObjectEntriesAsArray from 'helpers/object-field-helper';

interface recordViewType {
  msa: MsaEntity;
  validation?: ObjectType;
  onChange?: (e: any) => any;
  readOnly?: boolean;
}

const RecordView = ({
  msa,
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
        value={msa.name ?? ''}
        onChange={handleChange}
        error={valMessages['name'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.enteraMarketId}
        name="entera_market_id"
        value={msa.entera_market_id ?? ''}
        error={valMessages['entera_market_id'] ?? ''}
        onChange={handleChange}
        required
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.code}
        name="code"
        value={msa.code ?? ''}
        onChange={handleChange}
        error={valMessages['code'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.initialCommission}
        name="initial_commission"
        value={msa.initial_commission ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
      />

      <UnitSelect
        name="state"
        label={fieldLabel.state}
        records={getObjectEntriesAsArray(stateOptions)}
        value={msa.state ?? ''}
        onChange={handleChange}
        error={valMessages['state'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.mlsCode}
        name="mls_code"
        value={msa.mls_code ?? ''}
        onChange={handleChange}
        error={valMessages['mls_code'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitEmpty />

      <UnitSwitch
        value={msa.has_municipal_inspections ?? 0}
        onChange={handleChange}
        name="has_municipal_inspections"
        label={fieldLabel.hasMunicipalInspections}
        disabled={readOnly}
      />
    </FormContainer>
  );
};

export default RecordView;
