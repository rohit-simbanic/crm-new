import * as React from 'react';
import Box from '@mui/material/Box';
import CenterBox from 'components/box/center-box';
import useColorToken from 'hooks/useColorToken';
import EnteraLoaderLogo from 'assets/images/entera-loader-logo.gif';

export default function CircularLoader() {
  const colors = useColorToken();
  return (
    <Box
      component="img"
      style={{
        width: '5%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        backgroundColor: 'transparent',
        textAlign: 'center'
      }}
      alt="Entera"
      src={EnteraLoaderLogo}
    />
  );
}
