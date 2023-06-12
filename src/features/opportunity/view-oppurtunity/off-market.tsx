import { OpportunityContext } from 'pages/opportunity/Context';
import React, { useContext } from 'react';
import OffMarketRecordView from '../record-view/off-market';
import { validation as validationService } from 'services/validation-service';

const OffMarket = () => {
  const { oppurtunity, oldOppurtunity } = useContext(OpportunityContext);

  const calculate = (field: any) => {
    return validationService[field]?.calculate(oppurtunity, oldOppurtunity);
  };

  return (
    <>
      <OffMarketRecordView
        oppurtunity={oppurtunity}
        oldOppurtunity={oldOppurtunity}
        readOnly={true}
        calculate={calculate}
      />
    </>
  );
};

export default OffMarket;
