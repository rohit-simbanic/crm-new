import React, { useContext, useEffect } from 'react';
import { opportunityDetailViewTabs } from 'assets/tabs/opportunity-view';
import { OpportunityContext } from 'pages/opportunity/Context';
import OffMarket from './off-market';
import Basic from './basic';
import Characteristics from './characteristics';
import ContactInformation from './contact-information';
import DiligencePeriod from './diligence-period';
import FinancialInformation from './financial-information';
import NotesTermsProvision from './notes-terms-provisions';
import PrimaryInformation from './primary-information';
import Settlement from './settlement';
import HorizontalTabs from 'components/tabs/horizontal-tabs';
import TabArea from 'components/tabs/tab-area';
import useRouteName from 'pages/route-outlet-context';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';

const OppurtunityDetailView = ({ routeTag }: { routeTag: string }) => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const { oppurtunity, oldOppurtunity } = useContext(OpportunityContext);

  const { routeName, setRouteName } = useRouteName();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue);
  };
  const tabId = 'opportunity-view';
  const tabItems = () => {
    if (
      oldOppurtunity?.data_source &&
      oldOppurtunity?.data_source === 'off_market'
    ) {
      return {
        ...opportunityDetailViewTabs,
        ...{ off_market: 'Off Market' }
      };
    }

    return opportunityDetailViewTabs;
  };

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <>
      <HorizontalTabs
        value={activeTabIndex}
        handleChange={handleChange}
        tabItems={tabItems()}
        tabId={tabId}
      />

      <PaperBox sx={{ pb: 2, mt: 1 }}>
        <PaperBoxContent>
          <TabArea
            index={0}
            value={activeTabIndex}
            border={false}
            tabId={tabId}
          >
            <Basic />
          </TabArea>
          <TabArea
            index={1}
            value={activeTabIndex}
            border={false}
            tabId={tabId}
          >
            <PrimaryInformation />
          </TabArea>
          <TabArea
            index={2}
            value={activeTabIndex}
            border={false}
            tabId={tabId}
          >
            <NotesTermsProvision />
          </TabArea>
          <TabArea
            index={3}
            value={activeTabIndex}
            border={false}
            tabId={tabId}
          >
            <Characteristics />
          </TabArea>
          <TabArea
            index={4}
            value={activeTabIndex}
            border={false}
            tabId={tabId}
          >
            <ContactInformation />
          </TabArea>
          <TabArea
            index={5}
            value={activeTabIndex}
            border={false}
            tabId={tabId}
          >
            <FinancialInformation />
          </TabArea>
          <TabArea
            index={6}
            value={activeTabIndex}
            border={false}
            tabId={tabId}
          >
            <DiligencePeriod />
          </TabArea>
          <TabArea
            index={7}
            value={activeTabIndex}
            border={false}
            tabId={tabId}
          >
            <Settlement />
          </TabArea>
          <TabArea
            index={8}
            value={activeTabIndex}
            border={false}
            tabId={tabId}
          >
            <OffMarket />
          </TabArea>
        </PaperBoxContent>
      </PaperBox>
    </>
  );
};

export default OppurtunityDetailView;
