import React, { useContext } from 'react';
import { OpportunityContext } from 'pages/opportunity/Context';
import ContactInformationRecordView from '../record-view/contact-information';

const ContactInformation = () => {
  const { oppurtunity, oldOppurtunity, updateOpportunity } =
    useContext(OpportunityContext);

  return (
    <>
      <ContactInformationRecordView
        oppurtunity={oppurtunity}
        oldOppurtunity={oldOppurtunity}
        updateOpportunity={updateOpportunity}
        readOnly={true}
      />
    </>
  );
};

export default ContactInformation;
