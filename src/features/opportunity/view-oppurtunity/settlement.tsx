import { OpportunityContext } from 'pages/opportunity/Context';
import React, { useContext } from 'react';
import SettlementRecordView from '../record-view/settlement';
import { validation as validationService } from 'services/validation-service';

const Settlement = () => {
  const { oldOppurtunity, oppurtunity, handleChange, updateOpportunity } =
    useContext(OpportunityContext);

  const calculate = (field: string) => {
    return validationService[field]?.calculate(oppurtunity, oldOppurtunity);
  };

  return (
    <>
      <SettlementRecordView
        oppurtunity={oppurtunity}
        oldOppurtunity={oldOppurtunity}
        updateOpportunity={updateOpportunity}
        readOnly={true}
        changeHandle={handleChange}
        calculate={calculate}
        field={''}
      />
    </>
  );
};

export default Settlement;
