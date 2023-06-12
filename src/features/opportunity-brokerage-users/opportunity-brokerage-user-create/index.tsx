import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import { OpportunityContext } from 'pages/opportunity/Context';
import useRouteName from 'pages/route-outlet-context';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import opportunityBrokerageUsersService from 'services/opportunity-brokerage-user-service';
import initialOpportunityBrokerageUser from 'state/opportunity-brokerage-user/initial-opportunity-brokerage-user';
import { OpportunityBrokerageUserEntity } from 'types/opportunity-brokerage-user-types';
import RecordView from '../record-view';
import { validateOpportunityBrokerageUser } from 'helpers/validation/opportunity-brokerage-user-helper';

const OpportunityBrokerageUserCreate = ({ routeTag }: { routeTag: string }) => {
  const { opportunity_brokerage_user_id, opportunity_id } = useParams();

  const { oppurtunity, marketPreference } = useContext(OpportunityContext);

  const [opportunityBrokerageUser, setOpportunityBrokerageUser] =
    useState<OpportunityBrokerageUserEntity>({...initialOpportunityBrokerageUser, market_preference: {
      id: marketPreference.id,
      name: marketPreference.name
    }});

  const { routeName, setRouteName } = useRouteName();

  const [validation, setValidation] = useState<{ [key: string]: any }>({});

  const handleChange = (e: any) => {
    if (e.target) {
      setOpportunityBrokerageUser(
        Object.assign({}, opportunityBrokerageUser, {
          [e.target.name]: e.target.value
        })
      );
    } else {
      setOpportunityBrokerageUser(
        Object.assign({}, opportunityBrokerageUser, e)
      );
    }
  };

  const loadOpportunityBrokerageUser = async (
    opportunity_brokerage_user_id: string
  ) => {
    let opportunityBrokerageUser = await opportunityBrokerageUsersService.get(
      opportunity_brokerage_user_id
    );

    let response = opportunityBrokerageUser.data;

    response = {
      ...response,
      brokerage_transaction_role_name:
        opportunityBrokerageUser.data.brokerage_transaction_role?.name,
      brokerage_user_name: `${opportunityBrokerageUser.data.brokerage_user?.first_name} ${opportunityBrokerageUser.data.brokerage_user?.last_name}`,
      opportunity_name: opportunityBrokerageUser.data?.opportunity?.name
    };

    setOpportunityBrokerageUser(response);
  };

  const handleSubmit = async () => {
     const { status, ...errors } = validateOpportunityBrokerageUser(
       opportunityBrokerageUser
    );
    
    setValidation(errors);  

    if (!status) return;

    let response;

    setValidation({});

    let reqBody: any = {
      opportunity_id: opportunity_id || opportunityBrokerageUser.opportunity_id,
      brokerage_transaction_role_id:
        opportunityBrokerageUser.brokerage_transaction_role_id,
      brokerage_user_id: opportunityBrokerageUser.brokerage_user_id,
      market_preference_id:
        oppurtunity.market_preference_id ||
        opportunityBrokerageUser.market_preference_id,
      
      status: opportunityBrokerageUser.status
    };

    if (opportunity_brokerage_user_id) {
      if (
        opportunityBrokerageUser.brokerage_transaction_role.name ===
        'negotiator'
      ) {
        reqBody = {
          ...reqBody,
          primary_user: opportunityBrokerageUser.primary_user
        };
      }
      response = await opportunityBrokerageUsersService.update(
        opportunity_brokerage_user_id,
        reqBody
      );
    } else {
      response = await opportunityBrokerageUsersService.create(reqBody);
    }

    if (response.isValidationError) {
      setValidation(response.errorMessage);
      return;
    }

    if (response.isSuccess) {
      window.history.back();
    }
  };

  useEffect(() => {
    if (opportunity_brokerage_user_id !== undefined) {
      loadOpportunityBrokerageUser(opportunity_brokerage_user_id!);
    }
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView
          opportunityBrokerageUser={opportunityBrokerageUser}
          validation={validation}
          onChange={handleChange}
        />

        <StackRowWithDivider>
          <SaveButton onClick={handleSubmit} />
          <CancelButton />
        </StackRowWithDivider>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default OpportunityBrokerageUserCreate;
