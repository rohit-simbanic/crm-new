import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import useColorToken from 'hooks/useColorToken';

interface PropsType {
  Icon: any;
  onClick: () => void;
  active?: boolean;
  title?: string;
}

const UnitButtonIcon = ({
  Icon,
  onClick,
  active = false,
  title = ''
}: PropsType) => {
  const colors = useColorToken();

  return (
    <Tooltip title={title}>
      <IconButton
        aria-label="toggle-opportunity"
        onClick={onClick}
        style={{
          color: colors.grey[900],
          backgroundColor: active ? colors.white[500] : 'inherit'
        }}
        size="large"
      >
        <Icon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
};

export default UnitButtonIcon;
