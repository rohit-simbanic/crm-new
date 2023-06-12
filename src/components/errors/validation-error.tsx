import React, { useId } from 'react';
import { ObjectType } from 'types';
import { v4 as uuid4 } from 'uuid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem/ListItem';
import { Typography } from '@mui/material';

const ValidationError = ({ data }: { data: any }) => {
  const ErrorItem = (err: ObjectType) => {
    return (
      <ListItem style={{ color: 'red' }} component="div" disablePadding>
        <Typography
          component={'span'}
          variant="caption"
          display="block"
          sx={{ pl: 1 }}
        >
          {err.message}
        </Typography>
      </ListItem>
    );
  };

  return (
    <React.Fragment>
      {data.length > 0 ? (
        <List sx={{ pb: 0 }}>
          {data.map((x: ObjectType, index: number) => (
            <ErrorItem key={uuid4()} message={x} />
          ))}
        </List>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default ValidationError;
