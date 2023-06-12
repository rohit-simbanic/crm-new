import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import useRouteName from 'pages/route-outlet-context';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import marketPreferenceBrokerageUsersService from 'services/market-preference-brokerage-users-service';
import initialMarketPreferenceBrokerageUser from 'state/market-preference-brokerage-user/initial-market-preference-brokerage-user';
import { ObjectType } from 'types';
import { MarketPreferenceBrokerageUserEntity } from 'types/market-preference-brokerage-user-types';

import RecordView from '../record-view';
import { moduleLabels } from 'assets/list/tracker/constant';
import trackerService from 'services/tracker-service';

const MarketPreferenceBrokerageUsersView = ({
  routeTag
}: {
  routeTag: string;
}) => {
  const { market_preference_brokerage_user_id } = useParams<ObjectType>();

  const [marketPreferenceBrokerageUser, setMarketPreferenceBrokerageUser] =
    useState<MarketPreferenceBrokerageUserEntity>(
      initialMarketPreferenceBrokerageUser
    );

  const { routeName, setRouteName } = useRouteName();

  const loadMarketPreferenceBrokerageUser = async (
    market_preference_brokerage_user_id: string
  ) => {
    let marketPreferenceBrokerageUser =
      await marketPreferenceBrokerageUsersService.get(
        market_preference_brokerage_user_id
      );
    setMarketPreferenceBrokerageUser(marketPreferenceBrokerageUser.data);

    trackerService.createRecentlyViewed({
      module_name: moduleLabels.MarketPreferencesBrokerageUsers.label,
      item_id: market_preference_brokerage_user_id,
      item_summary: marketPreferenceBrokerageUser.data.name,
      action: 'detailview'
    });
  };

  useEffect(() => {
    if (market_preference_brokerage_user_id)
      loadMarketPreferenceBrokerageUser(market_preference_brokerage_user_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView
          marketPreferenceBrokerageUser={marketPreferenceBrokerageUser}
          readOnly={true}
          market_preference_brokerage_user_id={
            market_preference_brokerage_user_id
          }
        />
      </PaperBoxContent>
    </PaperBox>
  );
};

export default MarketPreferenceBrokerageUsersView;
