import { Box, Modal, Paper } from '@mui/material';
import CircularLoader from 'components/dog-loader/dog-lodar';
import eventBus from 'helpers/event-bus-helper';
import React, { useEffect, useState } from 'react';
import { ObjectType } from 'types';

const ModalComponent = (props: any) => {
  let {
    Component,
    data,
    onClose,
    size,
    loading,
    isConfirmationBox,
    isServiceCreateBox
  } = props;
  const [maximize, setMaximize] = useState(false);

  const toggleMaximizeHanlder = (data: ObjectType) => {
    setMaximize(!data.maximize);
  };

  useEffect(() => {
    eventBus.on('TOGGLE_MAXIMIZE', (data: ObjectType) => {
      toggleMaximizeHanlder(data);
    });
  }, []);

  let style: ObjectType = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'max-width 0.3s',
    bgcolor: '#eff1f6'
  };

  if (!isConfirmationBox) {
    style = { ...style, width: '75%' };
  }

  if (isServiceCreateBox) {
    style = { ...style, width: '40%' };
  }

  return (
    <React.Fragment>
      <Modal
        open={true}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Paper elevation={3} sx={style}>
            {loading ? (
              <CircularLoader />
            ) : (
              <Component {...data} onClose={onClose} />
            )}
          </Paper>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ModalComponent;
