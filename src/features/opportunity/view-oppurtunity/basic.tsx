import { OpportunityContext } from 'pages/opportunity/Context';
import React, { useContext } from 'react';
import BasicRecordView from '../record-view/basic';

const Basic = () => {
  const { oldOppurtunity, oppurtunity } = useContext(OpportunityContext);

  return (
    <>
      <BasicRecordView
        oppurtunity={oppurtunity}
        oldOppurtunity={oldOppurtunity}
        readOnly={true}
      />
    </>
  );
};

export default Basic;
