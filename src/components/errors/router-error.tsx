import { Alert, AlertTitle } from '@mui/material';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ReactRouter = () => {
  let error = useRouteError();
  let message = 'Something went wrong';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = "This page doesn't exist!";
    }

    if (error.status === 401) {
      message = "You aren't authorized to see this";
    }

    if (error.status === 503) {
      message = 'Looks like our API is down';
    }

    if (error.status === 418) {
      message = '🫖';
    }
  }

  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};

export default ReactRouter;
