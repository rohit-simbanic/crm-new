import { OpportunityContext } from 'pages/opportunity/Context';
import React, { useContext } from 'react';
import FinancialInformationRecordView from '../record-view/financial-information';
import { ObjectType } from 'types';

const FinancialInformation = ({
  validation,
  setField,
  updateValidation
}: {
  validation: ObjectType;
  setField: (e: any) => any;
  updateValidation?: ObjectType;
}) => {
  const { oppurtunity, oldOppurtunity, handleChange } =
    useContext(OpportunityContext);

  const onChange = (e: any) => {
    handleChange(e);
    setField(e.target.name);
  };

  return (
    <FinancialInformationRecordView
      oppurtunity={oppurtunity}
      oldOppurtunity={oldOppurtunity}
      readOnly={false}
      changeHandle={handleChange}
      setField={setField}
      validation={validation}
      effectHandle={onChange}
    />
  );
};

export default FinancialInformation;
