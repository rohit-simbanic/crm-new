import fieldLabel from 'assets/constants/fieldLabel';
import DashboradTabLabel from 'components/form/unit-dashboard-tab';
import HorizontalTabs from 'components/tabs/horizontal-tabs';
import TabArea from 'components/tabs/tab-area';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { recordCountDefault } from 'state/dashboard/transaction';
import { ObjectType } from 'types';
import ClosingToday from '../../features/dashboards/closing-today';
import DDEnding from '../../features/dashboards/dd-ending-transaction';
import EarnestMoney from '../../features/dashboards/earnest-money';
import ForecastedCOE from '../../features/dashboards/forecasted-coe';
import OptionFee from '../../features/dashboards/option-fee';
import ReviewContract from '../../features/dashboards/review-contract';
import TerminationPending from '../../features/dashboards/termination-pending';
import useRouteName from '../route-outlet-context';

const TransactionDashboard: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [recordCount, setRecordCount] = useState(recordCountDefault);

  const { routeName, setRouteName } = useRouteName();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue);
  };
  const updateCount = (data: ObjectType) => {
    setRecordCount((prevRecordCount) => ({ ...prevRecordCount, ...data }));
  };

  const tabId = 'transaction-tab';

  const tabItems = () => {
    return {
      earnest_money: (
        <DashboradTabLabel
          title={fieldLabel.earnestMoney}
          count={recordCount.earnestMoney}
        />
      ),
      option_fee: (
        <DashboradTabLabel
          title={fieldLabel.optionFee}
          count={recordCount.optionFee}
        />
      ),
      dd_ending: (
        <DashboradTabLabel
          title={fieldLabel.ddEnding}
          count={recordCount.ddEnding}
        />
      ),
      review_contract: (
        <DashboradTabLabel
          title={fieldLabel.reviewContract}
          count={recordCount.reviewContract}
        />
      ),
      forecasted_coe: (
        <DashboradTabLabel
          title={fieldLabel.forecastedCOE}
          count={recordCount.forcastedCoe}
        />
      ),
      closing_today: (
        <DashboradTabLabel
          title={fieldLabel.closingToday}
          count={recordCount.closingToday}
        />
      ),
      termination_pending: (
        <DashboradTabLabel
          title={fieldLabel.terminationPending}
          count={recordCount.terminationPending}
        />
      )
    };
  };

  useEffect(() => {
    setRouteName('transaction');
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
        <EarnestMoney currentTab={activeTabIndex} updateCount={updateCount} />
      </TabArea>
      <TabArea index={1} value={activeTabIndex} border={false} tabId={tabId}>
        <OptionFee currentTab={activeTabIndex} updateCount={updateCount} />
      </TabArea>
      <TabArea index={2} value={activeTabIndex} border={false} tabId={tabId}>
        <DDEnding currentTab={activeTabIndex} updateCount={updateCount} />
      </TabArea>
      <TabArea index={3} value={activeTabIndex} border={false} tabId={tabId}>
        <ReviewContract currentTab={activeTabIndex} updateCount={updateCount} />
      </TabArea>
      <TabArea index={4} value={activeTabIndex} border={false} tabId={tabId}>
        <ForecastedCOE currentTab={activeTabIndex} updateCount={updateCount} />
      </TabArea>
      <TabArea index={5} value={activeTabIndex} border={false} tabId={tabId}>
        <ClosingToday currentTab={activeTabIndex} updateCount={updateCount} />
      </TabArea>
      <TabArea index={6} value={activeTabIndex} border={false} tabId={tabId}>
        <TerminationPending
          currentTab={activeTabIndex}
          updateCount={updateCount}
        />
      </TabArea>
      <Outlet />
    </>
  );
};

export default TransactionDashboard;
