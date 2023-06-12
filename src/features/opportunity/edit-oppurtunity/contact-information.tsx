import React, { useContext } from 'react';
import { OpportunityContext } from 'pages/opportunity/Context';
import ContactInformationRecordView from '../record-view/contact-information';
import { ObjectType } from 'types';

const ContactInformation = ({
  validation,
  setField,
  updateValidation
}: {
  validation: ObjectType;
  setField?: (e: any) => any;
  updateValidation?: ObjectType;
}) => {
  const { oppurtunity, handleChange, oldOppurtunity, updateOpportunity } =
    useContext(OpportunityContext);

  return (
    <>
      <ContactInformationRecordView
        oppurtunity={oppurtunity}
        oldOppurtunity={oldOppurtunity}
        updateOpportunity={updateOpportunity}
        validation={validation}
        onChange={handleChange}
        readOnly={false}
        setField={setField}
      />
    </>
  );
};

export default ContactInformation;
