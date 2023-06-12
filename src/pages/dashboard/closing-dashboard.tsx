import React, { useEffect, useState } from 'react';
import ClearToClose from '../../features/dashboards/clear-to-close';
import DiligencePeriodClosing from '../../features/dashboards/diligence-period-closing';
import SalePendingClosing from '../../features/dashboards/sale-pending-closing';
import { Outlet } from 'react-router-dom';
import Terminations from 'features/dashboards/closing-terminations';
import ClosedPurchased from 'features/dashboards/closing-closed-purchased';
import { recordCountDefault } from 'state/dashboard/closing';
import { ObjectType } from 'types';
import DashboradTabLabel from 'components/form/unit-dashboard-tab';
import fieldLabel from 'assets/constants/fieldLabel';
import HorizontalTabs from 'components/tabs/horizontal-tabs';
import TabArea from 'components/tabs/tab-area';
import useRouteName from '../route-outlet-context';

const ClosingDashboard: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [recordCount, setRecordCount] = useState(recordCountDefault);

  const { routeName, setRouteName } = useRouteName();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue);
  };
  const updateCount = (data: ObjectType) => {
    setRecordCount((prevRecordCount) => ({ ...prevRecordCount, ...data }));
  };

  const tabId = 'closing-tab';

  const tabItems = () => {
    return {
      diligence_period: (
        <DashboradTabLabel
          title={fieldLabel.diligencePeriod}
          count={recordCount.diligencePeriod}
        />
      ),
      sale_pending: (
        <DashboradTabLabel
          title={fieldLabel.salePending}
          count={recordCount.salePending}
        />
      ),
      clear_to_close: (
        <DashboradTabLabel
          title={fieldLabel.clearToClose}
          count={recordCount.clearToClose}
        />
      ),
      termination: (
        <DashboradTabLabel
          title={fieldLabel.termination}
          count={recordCount.termination}
        />
      ),
      closed_purchased: (
        <DashboradTabLabel
          title={fieldLabel.closedPurchased}
          count={recordCount.purchased}
        />
      )
    };
  };

  useEffect(() => {
    setRouteName('closing');
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
        <DiligencePeriodClosing
          currentTab={activeTabIndex}
          updateCount={updateCount}
        />
      </TabArea>
      <TabArea index={1} value={activeTabIndex} border={false} tabId={tabId}>
        <SalePendingClosing
          currentTab={activeTabIndex}
          updateCount={updateCount}
        />
      </TabArea>
      <TabArea index={2} value={activeTabIndex} border={false} tabId={tabId}>
        <ClearToClose currentTab={activeTabIndex} updateCount={updateCount} />
      </TabArea>
      <TabArea index={3} value={activeTabIndex} border={false} tabId={tabId}>
        <Terminations currentTab={activeTabIndex} updateCount={updateCount} />
      </TabArea>
      <TabArea index={4} value={activeTabIndex} border={false} tabId={tabId}>
        <ClosedPurchased
          currentTab={activeTabIndex}
          updateCount={updateCount}
        />
      </TabArea>

      <Outlet />
    </>
  );
};

export default ClosingDashboard;
