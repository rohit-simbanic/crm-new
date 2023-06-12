import React, { useContext } from 'react';
import { OpportunityContext } from 'pages/opportunity/Context';
import CharacterSticsRecordView from '../record-view/characteristics';
import { ObjectType } from 'types';

const Characteristics = ({
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

  return (
    <CharacterSticsRecordView
      oppurtunity={oppurtunity}
      oldOppurtunity={oldOppurtunity}
      readOnly={false}
      changeHandle={handleChange}
      setField={setField}
      validation={validation}
      onChange={onChange}
    />
  );
};

export default Characteristics;
