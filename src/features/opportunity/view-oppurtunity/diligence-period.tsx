import React, { useContext, useEffect, useState } from 'react';
import { OpportunityContext } from 'pages/opportunity/Context';
import DiligencePeriodRecordView from '../record-view/diligence-period';

const DiligencePeriod = () => {
  const { oppurtunity, oldOppurtunity, handleChange, updateOpportunity } =
    useContext(OpportunityContext);

  return (
    <>
      <DiligencePeriodRecordView
        oppurtunity={oppurtunity}
        oldOppurtunity={oldOppurtunity}
        readOnly={true}
        changeHandle={handleChange}
        updateOpportunity={updateOpportunity}
      />
    </>
  );
};

export default DiligencePeriod;
