import React, { useContext } from 'react';
import { OpportunityContext } from 'pages/opportunity/Context';
import DiligencePeriodRecordView from '../record-view/diligence-period';
import { ObjectType } from 'types';

const DiligencePeriod = ({
  validation,
  setField
}: {
  validation: ObjectType;
  setField: (e: any) => any;
}) => {
  const { oppurtunity, handleChange, oldOppurtunity, updateOpportunity } =
    useContext(OpportunityContext);

  const onChange = (e: any) => {
    handleChange(e);
    setField(e.target.name);
  };

  return (
    <DiligencePeriodRecordView
      oppurtunity={oppurtunity}
      oldOppurtunity={oldOppurtunity}
      readOnly={false}
      changeHandle={handleChange}
      setField={setField}
      validation={validation}
      effectHandle={onChange}
      updateOpportunity={updateOpportunity}
    />
  );
};

export default DiligencePeriod;
