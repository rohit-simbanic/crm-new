import { ObjectType } from 'types';
import React from 'react';
import Chip from '@mui/material/Chip';

const DashboradTabLabel = ({ title, count }: ObjectType) => {
  return (
    <span style={{ display: 'inline' }}>
      {title} {count ? <Chip label={count} /> : ''}
    </span>
  );
};

export default DashboradTabLabel;
