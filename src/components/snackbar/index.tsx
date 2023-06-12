import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Slide, { SlideProps } from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import EVENTS from 'assets/constants/events';
import eventBus from 'helpers/event-bus-helper';
import React, { useEffect, useState } from 'react';
import { ObjectType } from 'types';

interface ToastType {
  open: boolean;
  message: string;
  severity: AlertColor;
}

const initialToast: ToastType = {
  open: false,
  message: '',
  severity: 'success'
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MuiSnackBar = () => {
  const [toast, setToast] = useState<ToastType>(initialToast);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setToast(initialToast);
  };

  const showEventHandler = (data: ObjectType) => {
    setToast({
      open: true,
      message: data.message,
      severity: data.isError ? 'error' : 'success'
    });
  };

  const hideEventHandler = (data: ObjectType) => {
    setToast({
      open: false,
      message: '',
      severity: 'success'
    });
  };

  useEffect(() => {
    eventBus.on(EVENTS.SHOW_TOAST, showEventHandler);
    eventBus.on(EVENTS.HIDE_TOAST, hideEventHandler);

    return () => {
      eventBus.remove(EVENTS.SHOW_TOAST, showEventHandler);
      eventBus.remove(EVENTS.HIDE_TOAST, hideEventHandler);
    };
  }, []);

  return (
    <React.Fragment>
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={(props: SlideProps) => {
          return <Slide {...props} direction="left" />;
        }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
        sx={{ top: '70px !important', zIndex: toast.open ? 1 : 0 }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity}
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default MuiSnackBar;
