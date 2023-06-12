import React, { useContext } from 'react';
import { OpportunityContext } from 'pages/opportunity/Context';
import { validation as validationService } from 'services/validation-service';
import OffMarketRecordView from '../record-view/off-market';
import { ObjectType } from 'types';

const OffMarket = ({
  validation,
  setField,
  currentField
}: {
  validation: ObjectType;
  setField: (e: any) => any;
  currentField: string;
}) => {
  const { oppurtunity, oldOppurtunity, handleChange } =
    useContext(OpportunityContext);

  const onChange = (e: any) => {
    handleChange(e);

    if (e?.target?.name) {
      setField(e.target.name);
    }
  };

  const calculate = (field: string) => {
    return validationService[field]?.calculate(oppurtunity, oldOppurtunity);
  };

  return (
    <>
      <OffMarketRecordView
        oppurtunity={oppurtunity}
        oldOppurtunity={oldOppurtunity}
        validation={validation}
        calculate={calculate}
        readOnly={false}
        onChange={onChange}
        changeHandle={handleChange}
        setField={setField}
      />
    </>
  );
};

export default OffMarket;
