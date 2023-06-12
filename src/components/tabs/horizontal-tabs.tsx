import MuiTabs from '@mui/material/Tabs';
import { styled, Tab } from '@mui/material';
import { ObjectType } from 'types';

export const StyledTabs = styled(MuiTabs)(({ theme }: any) => ({
  '& .MuiTab-root.Mui-selected': {
    color: '#444'
  },
  '.MuiTabs-indicator': {
    backgroundColor: '#FFF'
  },
  '& button.Mui-selected': {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 4px',
    borderRadius: '4px',
    fontWeight: 700
  }
}));

interface HorizontalTabsType {
  value?: any;
  handleChange?:
    | ((event: React.SyntheticEvent<Element, Event>, value: any) => void)
    | undefined;
  tabItems: ObjectType;
  tabId?: string;
  sx?: ObjectType;
}

const tabProps = (index: number, tabId: string) => {
  return {
    id: `${tabId}-${index}`,
    'aria-controls': `${tabId}panel-${index}`
  };
};

const HorizontalTabs = ({
  value,
  handleChange,
  tabItems,
  tabId = 'simple-tab',
  sx
}: HorizontalTabsType) => {
  return (
    <StyledTabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      TabIndicatorProps={{
        style: {
          backgroundColor: 'unset'
        }
      }}
      sx={{ ...sx }}
    >
      {Object.keys(tabItems).map((tab, index) => (
        <Tab key={tab} label={tabItems[tab]} {...tabProps(index, tabId)} />
      ))}
    </StyledTabs>
  );
};

export default HorizontalTabs;
