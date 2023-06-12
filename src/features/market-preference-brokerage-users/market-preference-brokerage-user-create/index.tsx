import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import { validateMarketPreferenceBrockrageUser } from 'helpers/validation/market-preference-brockrage-user-helper';
import useRouteName from 'pages/route-outlet-context';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import marketPreferenceBrokerageUsersService from 'services/market-preference-brokerage-users-service';
import initialMarketPreferenceBrokerageUser from 'state/market-preference-brokerage-user/initial-market-preference-brokerage-user';
import { MarketPreferenceBrokerageUserEntity } from 'types/market-preference-brokerage-user-types';

import RecordView from '../record-view';

const MarketPreferenceBrokerageUserCreate = ({
  routeTag
}: {
  routeTag: string;
}) => {
  const { market_preference_brokerage_user_id, market_preference_id } =
    useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [marketPreferenceBrokerageUser, setMarketPreferenceBrokerageUser] =
    useState<MarketPreferenceBrokerageUserEntity>(
      initialMarketPreferenceBrokerageUser
    );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { routeName, setRouteName } = useRouteName();

  const [validation, setValidation] = useState<{ [key: string]: any }>({});

  const handleChange = (e: any) => {
    if (e.target) {
      setMarketPreferenceBrokerageUser(
        Object.assign({}, marketPreferenceBrokerageUser, {
          [e.target.name]: e.target.value
        })
      );
    } else {
      setMarketPreferenceBrokerageUser(
        Object.assign({}, marketPreferenceBrokerageUser, e)
      );
    }
  };

  const loadMarketPreferenceBrokerageUser = async (
    market_preference_brokerage_user_id: string
  ) => {
    let marketPreferenceBrokerageUser =
      await marketPreferenceBrokerageUsersService.get(
        market_preference_brokerage_user_id
      );

    let response = marketPreferenceBrokerageUser.data;
    response = {
      ...response,
      brokerage_transaction_role_name:
        marketPreferenceBrokerageUser.data.brokerage_transaction_role?.name,
      brokerage_user_name: `${marketPreferenceBrokerageUser.data.brokerage_user?.first_name} ${marketPreferenceBrokerageUser.data.brokerage_user?.last_name}`,
      market_preference_name:
        marketPreferenceBrokerageUser.data?.market_preference?.name
    };

    setMarketPreferenceBrokerageUser(response);
  };

  const handleSubmit = async () => {
    const { status, ...errors } = validateMarketPreferenceBrockrageUser(
      marketPreferenceBrokerageUser
    );

    setValidation(errors);

    if (!status) return;

    let response;

    const reqBody: any = {
      brokerage_transaction_role_id:
        marketPreferenceBrokerageUser.brokerage_transaction_role_id,
      brokerage_user_id: marketPreferenceBrokerageUser.brokerage_user_id,
      market_preference_id: marketPreferenceBrokerageUser.market_preference_id,
      replace_brokerage_user_id:
        marketPreferenceBrokerageUser.replace_brokerage_user_id,
      status: marketPreferenceBrokerageUser.status
    };

    setIsLoading(true);

    if (market_preference_brokerage_user_id) {
      if (location.pathname.includes('terminate')) {
        response = await marketPreferenceBrokerageUsersService.terminate(
          market_preference_brokerage_user_id,
          reqBody
        );
      } else if (location.pathname.includes('replace')) {
        response = await marketPreferenceBrokerageUsersService.replace(
          market_preference_brokerage_user_id,
          reqBody
        );
      } else {
        response = await marketPreferenceBrokerageUsersService.update(
          market_preference_brokerage_user_id,
          reqBody
        );
      }
    } else {
      let result = reqBody;
      result = {
        ...result,
        market_preference_id: market_preference_id!
      };
      response = await marketPreferenceBrokerageUsersService.create(result);
    }

    setIsLoading(false);

    if (response.isValidationError) {
      setValidation(response.errorMessage);
    }

    if (response.isSuccess) {
      window.history.back();
    }
  };

  useEffect(() => {
    if (market_preference_brokerage_user_id) {
      loadMarketPreferenceBrokerageUser(market_preference_brokerage_user_id);
    }
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView
          marketPreferenceBrokerageUser={marketPreferenceBrokerageUser}
          validation={validation}
          onChange={handleChange}
          market_preference_brokerage_user_id={
            market_preference_brokerage_user_id
          }
        />

        <StackRowWithDivider>
          <SaveButton onClick={handleSubmit} disabled={isLoading} />
          <CancelButton />
        </StackRowWithDivider>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default MarketPreferenceBrokerageUserCreate;
