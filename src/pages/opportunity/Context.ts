import React, { createContext } from 'react';
import { ObjectType } from 'types';

export const OpportunityContext = createContext<ObjectType>({
  oppurtunity: {},
  oldOppurtunity: {},
  marketPreference: {},
  handleChange: (val: ObjectType) => {},
  updateOpportunity: (val: ObjectType) => {},
  loading: false
});
