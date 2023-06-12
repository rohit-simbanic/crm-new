import fieldLabel from 'assets/constants/fieldLabel';
import FormContainer from 'components/form/container';
import UnitText from 'components/form/unit-text';
import React from 'react';
import { ObjectType } from 'types';
import UnitEmpty from 'components/form/unit-empty';
import UnitSwitch from 'components/form/unit-switch';
import emptyFunction from 'helpers/empty-function-helper';
import UnitSelect from 'components/form/unit-select';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import pool from 'assets/constants/pool';
import UnitItem from 'components/form/unit-item';

interface recordViewType {
  oppurtunity: ObjectType;
  oldOppurtunity: ObjectType;
  validation?: ObjectType;
  changeHandle?: (e: any) => any;
  onChange?: (e: any) => any;
  setField?: (e: any) => any;
  readOnly?: boolean;
}

const CharacterSticsRecordView = ({
  oppurtunity,
  oldOppurtunity,
  changeHandle,
  readOnly = false,
  setField,
  onChange,
  validation
}: recordViewType) => {
  let handleChange = changeHandle ?? emptyFunction;
  let valMessage = validation ?? {};

  const data: ObjectType = readOnly ? oldOppurtunity : oppurtunity;

  return (
    <>
      <FormContainer>
        <UnitText
          label={fieldLabel.legalDescription}
          name="legal_description_c"
          value={data.legal_description_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitItem grid={{ xs: 12, sm: 6 }}>
          <FormContainer>
            <UnitText
              label={fieldLabel.taxID}
              name="tax_id_c"
              value={data.tax_id_c ?? ''}
              onChange={handleChange}
              readOnly={readOnly}
              error={valMessage['tax_id_c']}
              grid={{ xs: 6, sm: 6 }}
            />

            <UnitSwitch
              value={data.new_construction_no_tax_id ?? 0}
              onChange={handleChange}
              name="new_construction_no_tax_id"
              label={fieldLabel.newConstructionNoTaxId}
              disabled={readOnly}
              grid={{ xs: 6, sm: 6 }}
            />
          </FormContainer>
        </UnitItem>

        <UnitText
          label={fieldLabel.subDivision}
          name="subdivision_c"
          value={data.subdivision_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.subdivisionSectionC}
          name="subdivision_section_c"
          value={data.subdivision_section_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.landLotsC}
          name="land_lots_c"
          value={data.land_lots_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.unitNumber}
          name="unit_number_c"
          value={data.unit_number_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.propertyLotNumber}
          name="property_lot_number_c"
          value={data.property_lot_number_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.block}
          name="property_block_number_c"
          value={data.property_block_number_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.phaseNumber}
          name="phase_number_c"
          value={data.phase_number_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.districtNumber}
          name="district_number_c"
          value={data.district_number_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.deedBookNumber}
          name="deed_book_number_c"
          value={data.deed_book_number_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.platBookNumber}
          name="plat_book_number_c"
          value={data.plat_book_number_c ?? ''}
          onChange={handleChange}
          required
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.deedBookPage}
          name="deed_book_page_c"
          value={data.deed_book_page_c ?? ''}
          onChange={handleChange}
          required
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.platPageNumber}
          name="plat_page_number_c"
          value={data.plat_page_number_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.floodZone}
          name="flood_zone_c"
          value={data.flood_zone_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitText
          label={fieldLabel.yearBuilt}
          name="year_built_c"
          value={data.year_built_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitSelect
          name="pool_c"
          label={fieldLabel.pool}
          records={getObjectEntriesAsArray(pool)}
          value={data.pool_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          required
        />

        <UnitText
          label={fieldLabel.sqFt}
          name="sq_ft_c"
          value={data.sq_ft_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.waterAndSewer}
          name="water_and_sewer"
          value={data.water_and_sewer ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.bath}
          name="bath_c"
          value={data.bath_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.foundationType}
          name="foundation_type"
          value={data.foundation_type ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.bed}
          name="bed_c"
          value={data.bed_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.garage}
          name="garage_c"
          value={data.garage_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.lotSize}
          name="lot_size_c"
          value={data.lot_size_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.basement}
          name="basement_c"
          value={data.basement_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.equipment}
          name="equipment_c"
          value={data.equipment_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.roofType}
          name="roof_type"
          value={data.roof_type ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.heatingSystem}
          name="heating_system"
          value={data.heating_system ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.coolingSystem}
          name="cooling_system"
          value={data.cooling_system ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
      </FormContainer>
    </>
  );
};

export default CharacterSticsRecordView;
