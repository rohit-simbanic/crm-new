import CloseIcon from '@mui/icons-material/Close';
import { ButtonGroup, Grid, IconButton } from '@mui/material';
import React, { ReactNode, useState } from 'react';

import ModalTitle from './modal-title';

interface HeaderPropType {
  title: ReactNode;
  onClose: any;
  actionTitle?: string;
}
const ModalHeader = (props: HeaderPropType) => {
  const { title, onClose } = props;

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        paddingTop={1}
        paddingBottom={1} 
      >
        <Grid item sm={11} xs={11}>
          <ModalTitle value={title} />
        </Grid>
        <Grid item sm={1} xs={1}>
          <ButtonGroup
            disableElevation
            aria-label="Disabled elevation buttons"
            sx={{ position: 'absolute', right: 0, top: 0 }}
            variant="text"
          >
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </ButtonGroup>
        </Grid>
      </Grid>
    </>
  );
};

export default ModalHeader;
