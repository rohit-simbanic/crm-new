import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import useRouteName from 'pages/route-outlet-context';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import opportunityBrokerageUserService from 'services/opportunity-brokerage-user-service';
import initialOpportunityBrokerageUser from 'state/opportunity-brokerage-user/initial-opportunity-brokerage-user';
import { ObjectType } from 'types';
import { OpportunityBrokerageUserEntity } from 'types/opportunity-brokerage-user-types';

import RecordView from '../record-view';

const OpportunityBrokerageUserView = ({ routeTag }: { routeTag: string }) => {
  const { opportunity_brokerage_user_id } = useParams<ObjectType>();

  const [opportunityBrokerageUser, setOpportunityBrokerageUser] =
    useState<OpportunityBrokerageUserEntity>(initialOpportunityBrokerageUser);

  const { routeName, setRouteName } = useRouteName();

  const loadOpportunityBrokerageUser = async (
    opportunity_brokerage_user_id: string
  ) => {
    let opportunityBrokerageUser = await opportunityBrokerageUserService.get(
      opportunity_brokerage_user_id
    );
    setOpportunityBrokerageUser(opportunityBrokerageUser.data);
  };

  useEffect(() => {
    if (opportunity_brokerage_user_id)
      loadOpportunityBrokerageUser(opportunity_brokerage_user_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView
          opportunityBrokerageUser={opportunityBrokerageUser}
          readOnly={true}
          isView={true}
        />
      </PaperBoxContent>
    </PaperBox>
  );
};

export default OpportunityBrokerageUserView;
