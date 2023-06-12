import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { isEmpty } from 'helpers/misc-helper';
import { tokens } from 'theme';
import { ObjectType } from 'types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  tabId?: string;
  border?: boolean;
  sx?: ObjectType;
  value?: number;
}

const TabArea = ({
  children,
  index,
  tabId = 'simple-tab',
  border = true,
  sx,
  value
}: TabPanelProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const style = {
    backgroundColor: colors.white[900],
    boxShadow: `${colors.white.shadow} 0px 2px 4px`,
    border: `1px solid ${colors.white[800]}`,
    p: 2,
    borderRadius: 0.5,
    zIndex: '99',
    mt: 1,
    ...sx
  };

  return (
    <Box
      display={isEmpty(value) ? 'block' : index != value ? 'none' : 'block'}
      role="tabpanel"
      id={`${tabId}panel-${index}`}
      sx={border ? style : { mt: 1 }}
    >
      {children}
    </Box>
  );
};

export default TabArea;
