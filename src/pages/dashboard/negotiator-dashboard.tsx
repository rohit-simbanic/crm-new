import React, { useEffect, useState } from 'react';
import AcceptedOffers from '../../features/dashboards/accepted-offers';
import CounterOffers from '../../features/dashboards/counters';
import DDEndingOffers from '../../features/dashboards/dd-ending';
import MakeOffer from '../../features/dashboards/offer-make-offer';
import SalePending from '../../features/dashboards/sale-pending';
import SellerSentReceived from '../../features/dashboards/seller-sent-received';
import TerminationOffers from '../../features/dashboards/termination';
import { Outlet } from 'react-router-dom';
import { ObjectType } from 'types';
import { recordCountDefault } from 'state/dashboard/negotiator';
import DashboradTabLabel from 'components/form/unit-dashboard-tab';
import fieldLabel from 'assets/constants/fieldLabel';
import HorizontalTabs from 'components/tabs/horizontal-tabs';
import TabArea from 'components/tabs/tab-area';
import useRouteName from '../route-outlet-context';

const NegotiatorDashboard: React.FC = () => {
  const { routeName, setRouteName } = useRouteName();
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [recordCount, setRecordCount] = useState(recordCountDefault);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue);
  };
  const updateCount = (data: ObjectType) => {
    setRecordCount((prevRecordCount) => ({ ...prevRecordCount, ...data }));
  };

  const tabId = 'negotiator-tab';

  const tabItems = () => {
    return {
      offer_make_offer: (
        <DashboradTabLabel
          title={fieldLabel.makeOffer}
          count={recordCount.makeOffer}
        />
      ),
      seller_sent_received: (
        <DashboradTabLabel
          title={fieldLabel.sellerSentReceived}
          count={recordCount.sellerReceived}
        />
      ),
      counter_offer: (
        <DashboradTabLabel
          title={fieldLabel.counterOffer}
          count={recordCount.counterdOffer}
        />
      ),
      accepted_offer: (
        <DashboradTabLabel
          title={fieldLabel.acceptedOffer}
          count={recordCount.acceptedOffer}
        />
      ),
      dd_ending: (
        <DashboradTabLabel
          title={fieldLabel.ddEnding}
          count={recordCount.ddEnding}
        />
      ),
      sale_pending: (
        <DashboradTabLabel
          title={fieldLabel.salePending}
          count={recordCount.salePending}
        />
      ),
      termination: (
        <DashboradTabLabel
          title={fieldLabel.termination}
          count={recordCount.termination}
        />
      )
    };
  };

  useEffect(() => {
    setRouteName('negotiator');
  }, []);

  return (
    <>
      <HorizontalTabs
        value={activeTabIndex}
        handleChange={handleChange}
        tabItems={tabItems()}
        tabId={tabId}
      />

      <TabArea index={0} value={activeTabIndex} border={false} tabId={tabId}>
        <MakeOffer currentTab={activeTabIndex} updateCount={updateCount} />
      </TabArea>
      <TabArea index={1} value={activeTabIndex} border={false} tabId={tabId}>
        <SellerSentReceived
          currentTab={activeTabIndex}
          updateCount={updateCount}
        />
      </TabArea>
      <TabArea index={2} value={activeTabIndex} border={false} tabId={tabId}>
        <CounterOffers currentTab={activeTabIndex} updateCount={updateCount} />
      </TabArea>
      <TabArea index={3} value={activeTabIndex} border={false} tabId={tabId}>
        <AcceptedOffers currentTab={activeTabIndex} updateCount={updateCount} />
      </TabArea>
      <TabArea index={4} value={activeTabIndex} border={false} tabId={tabId}>
        <DDEndingOffers currentTab={activeTabIndex} updateCount={updateCount} />
      </TabArea>
      <TabArea index={5} value={activeTabIndex} border={false} tabId={tabId}>
        <SalePending currentTab={activeTabIndex} updateCount={updateCount} />
      </TabArea>
      <TabArea index={6} value={activeTabIndex} border={false} tabId={tabId}>
        <TerminationOffers
          currentTab={activeTabIndex}
          updateCount={updateCount}
        />
      </TabArea>
      <Outlet />
    </>
  );
};

export default NegotiatorDashboard;
