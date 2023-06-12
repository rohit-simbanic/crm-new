import { moduleLabels } from 'assets/list/tracker/constant';
import opportunityMenuItems from 'assets/menus/side-menu/opportunity';
import CenterBox from 'components/box/center-box';
import ContainerRight from 'components/container/right';
import CircularLoader from 'components/dog-loader/dog-lodar';
import ErrorComponent from 'components/errors/error-component';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import TopBar from 'components/top-bar';
import eventBus from 'helpers/event-bus-helper';
import menuHelper from 'helpers/menu-helper';
import { isEmpty } from 'helpers/misc-helper';
import LayoutProvider from 'pages/common-layout/layout-provider-context';
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import marketPreferenceService from 'services/market-preferences';
import oppurtunityService from 'services/oppurtunity-service';
import trackerService from 'services/tracker-service';
import { ObjectType } from 'types';
import { OpportunityByIdResponseType } from 'types/api-response';
import { OpportunityEntity } from 'types/opportunity-entity';

import Breadcrumbs from './breadcrumbs';
import { OpportunityContext } from './Context';
import { getAdditionalInfo } from './utility';

const OpportunityView: React.FC = () => {
  const { opportunity_id } = useParams<ObjectType>();
  const location = useLocation();
  const navigate = useNavigate();

  const [oldOppurtunity, setOldOppurtunity] = useState<
    OpportunityEntity | ObjectType
  >({});
  const [oppurtunity, setOppurtunity] = useState<
    OpportunityEntity | ObjectType
  >({});

  const [routeName, setRouteName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [marketPreference, setMarketPreference] = useState<ObjectType>({});
  const [isConditionLoading, setIsConditionLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { setSideNavMenuItems, setTopBar, topBar } = useContext(LayoutProvider);

  const handleChange = (e: any) => {
    if (e.target) {
      setOppurtunity(
        Object.assign({}, oppurtunity, { [e.target.name]: e.target.value })
      );
    } else {
      setOppurtunity(Object.assign({}, oppurtunity, e));
    }
  };

  const updateOpportunity = (obj: ObjectType) => {
    setOppurtunity(Object.assign({}, oppurtunity, obj));
  };

  const loadOpputunity = async (
    id: string,
    eventIsConditionLoading?: boolean
  ) => {
    if (!eventIsConditionLoading) setIsLoading(true);

    const result: OpportunityByIdResponseType =
      await oppurtunityService.getById(id);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setErrorMessage('');
    setOppurtunity(result.data);
    setOldOppurtunity(result.data);

    trackerService.createRecentlyViewed({
      module_name: moduleLabels.Opportunities.label,
      item_id: opportunity_id,
      item_summary: result.data.name,
      action: 'editview'
    });
    if (result.data?.market_preference_id) {
      const marketPreferenceResult = await marketPreferenceService.getById(
        result.data?.market_preference_id
      );

      setMarketPreference(marketPreferenceResult.data);
    } else {
      setMarketPreference({});
    }

    let data: ObjectType = await getAdditionalInfo(result.data);

    setOppurtunity(() => data);
    setOldOppurtunity(() => data);
    if (!eventIsConditionLoading) setIsLoading(false);
  };

  useEffect(() => {
    if (location.pathname.includes('actions')) {
      if (opportunity_id !== undefined) loadOpputunity(opportunity_id);
    }
  }, [location]);

  useEffect(() => {
    if (opportunity_id !== undefined) loadOpputunity(opportunity_id);

    eventBus.on('refresh_opportunity', (data?: ObjectType) => {
      if (opportunity_id !== undefined)
        loadOpputunity(opportunity_id, data?.isConditionLoading);
    });

    return () => {};
  }, []);

  const getMenus = async (data: ObjectType) => {
    let menus = [];
    let menusToshow = [];

    menus = await menuHelper.getItems('Opportunities', 'view');

    let actions = opportunityMenuItems.brokerageActions(data);

    menusToshow = menus.map(function (item) {
      let subMenuItemsWithURL;

      if (item.subMenuItems && item.subMenuItems.length > 0) {
        subMenuItemsWithURL = item.subMenuItems.map(function (
          subMenuItem: ObjectType
        ) {
          return {
            ...subMenuItem,
            url:
              typeof subMenuItem.url === 'function'
                ? subMenuItem.url(opportunity_id)
                : ''
          };
        });
      }

      return {
        ...item,
        subMenuItems: subMenuItemsWithURL,
        url: typeof item.url === 'function' ? item.url(opportunity_id) : ''
      };
    });

    menusToshow.splice(1, 0, actions);

    setSideNavMenuItems(menusToshow);
  };

  useEffect(() => {
    getMenus(oldOppurtunity);
  }, [oldOppurtunity.opportunity_status_c]);

  useEffect(() => {
    if (!location.pathname.includes('edit')) setTopBar(null);
  }, [routeName]);

  if (!isEmpty(errorMessage))
    return (
      <PaperBox>
        <PaperBoxContent>
          {' '}
          <ErrorComponent message={errorMessage} />{' '}
        </PaperBoxContent>
      </PaperBox>
    );

  return (
    <React.Fragment>
      <OpportunityContext.Provider
        value={{
          oppurtunity,
          handleChange,
          oldOppurtunity,
          updateOpportunity,
          marketPreference
        }}
      >
        {!isLoading && !isConditionLoading ? (
          <>
            <TopBar>
              <FormContainer>
                <UnitItem grid={{ xs: 12, sm: 8, md: 8 }}>
                  <Breadcrumbs params={{ routeName, opportunity_id }} />
                </UnitItem>
                <UnitItem grid={{ xs: 12, sm: 4, md: 4 }}>{topBar}</UnitItem>
              </FormContainer>
            </TopBar>
            <ContainerRight>
              <Outlet context={{ routeName, setRouteName }} />
            </ContainerRight>
          </>
        ) : (
          <CenterBox>
            <CircularLoader />
          </CenterBox>
        )}
      </OpportunityContext.Provider>
    </React.Fragment>
  );
};

export default OpportunityView;
