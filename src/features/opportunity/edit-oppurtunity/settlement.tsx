import { OpportunityContext } from 'pages/opportunity/Context';
import React, { useContext } from 'react';
import SettlementRecordView from '../record-view/settlement';
import { ObjectType } from 'types';
import { validation as validationService } from 'services/validation-service';

const Settlement = ({
  validation,
  setField,
  updateValidation,
  field
}: {
  validation: ObjectType;
  setField: (e: any) => any;
  updateValidation?: ObjectType;
  field: string;
}) => {
  let { oppurtunity, handleChange, updateOpportunity, oldOppurtunity } =
    useContext(OpportunityContext);

  const onChange = (e: any) => {
    handleChange(e);
    setField(e.target.name);
  };

  const calculate = (field: string) => {
    return validationService[field]?.calculate(oppurtunity, oldOppurtunity);
  };

  return (
    <>
      <SettlementRecordView
        oppurtunity={oppurtunity}
        oldOppurtunity={oldOppurtunity}
        updateOpportunity={updateOpportunity}
        readOnly={false}
        changeHandle={handleChange}
        setField={setField}
        validation={validation}
        onChange={onChange}
        calculate={calculate}
        field={field}
      />
    </>
  );
};

export default Settlement;
