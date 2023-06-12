import React, { useContext } from 'react';
import { OpportunityContext } from 'pages/opportunity/Context';
import CharacterSticsRecordView from '../record-view/characteristics';

const Characteristics = () => {
  const { oldOppurtunity, oppurtunity } = useContext(OpportunityContext);

  return (
    <>
      <CharacterSticsRecordView
        oppurtunity={oppurtunity}
        oldOppurtunity={oldOppurtunity}
        readOnly={true}
      />
    </>
  );
};

export default Characteristics;
