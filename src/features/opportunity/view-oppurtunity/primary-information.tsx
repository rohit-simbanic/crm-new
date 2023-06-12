import { OpportunityContext } from 'pages/opportunity/Context';
import React, { useContext } from 'react';
import PrimaryInformationRecordView from '../record-view/primary-information';

const PrimaryInformation = () => {
  const { oppurtunity, oldOppurtunity } = useContext(OpportunityContext);

  return (
    <>
      <PrimaryInformationRecordView
        oppurtunity={oppurtunity}
        oldOppurtunity={oldOppurtunity}
        readOnly={true}
      />
    </>
  );
};

export default PrimaryInformation;
