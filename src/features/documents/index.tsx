import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Document = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default Document;
