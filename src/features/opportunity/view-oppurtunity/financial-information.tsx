import { OpportunityContext } from 'pages/opportunity/Context';
import React, { useContext } from 'react';
import FinancialInformationRecordView from '../record-view/financial-information';

const FinancialInformation = () => {
  const { oppurtunity, oldOppurtunity } = useContext(OpportunityContext);

  return (
    <>
      <FinancialInformationRecordView
        oppurtunity={oppurtunity}
        oldOppurtunity={oldOppurtunity}
        readOnly={true}
      />
    </>
  );
};

export default FinancialInformation;
