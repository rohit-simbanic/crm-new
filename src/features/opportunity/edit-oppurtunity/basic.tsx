import React, { useContext } from 'react';
import { OpportunityContext } from 'pages/opportunity/Context';
import BasicRecordView from '../record-view/basic';
import { ObjectType } from 'types';

const Basic = ({
  validation,
  setField,
  updateValidation
}: {
  validation: ObjectType;
  setField: (e: any) => any;
  updateValidation?: ObjectType;
}) => {
  const { oppurtunity, oldOppurtunity, handleChange } =
    useContext(OpportunityContext);

  const onChange = (e: any) => {
    handleChange(e);
    setField(e.target.name);
  };

  var date = new Date();

  date.setDate(date.getDate() + 1);

  return (
    <>
      <BasicRecordView
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

export default Basic;
