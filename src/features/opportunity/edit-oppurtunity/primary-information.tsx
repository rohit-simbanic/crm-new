import { OpportunityContext } from 'pages/opportunity/Context';
import React, { useContext } from 'react';
import PrimaryInformationRecordView from '../record-view/primary-information';
import { EditContainer } from '../record-view/container';
import { ObjectType } from 'types';

const PrimaryInformation = ({
  validation,
  setField,
  updateValidation
}: {
  validation: ObjectType;
  setField: (e: any) => any;
  updateValidation?: ObjectType;
}) => {
  const { oppurtunity, handleChange, oldOppurtunity } =
    useContext(OpportunityContext);

  const onChange = (e: any) => {
    handleChange(e);
    setField(() => e.target.name);
  };

  return (
    <>
      <PrimaryInformationRecordView
        oppurtunity={oppurtunity}
        oldOppurtunity={oldOppurtunity}
        validation={validation}
        setField={setField}
        readOnly={false}
        changeHandle={handleChange}
        onChange={onChange}
      />
    </>
  );
};

export default PrimaryInformation;
