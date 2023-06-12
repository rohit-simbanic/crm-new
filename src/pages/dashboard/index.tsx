import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { getAdditionalInfo } from '../opportunity/utility';
import oppurtunityService from 'services/oppurtunity-service';
import { ObjectType } from 'types';
import { OpportunityEntity } from 'types/opportunity-entity';
import { OpportunityContext } from '../opportunity/Context';
import * as validationService from 'services/validation-service';
import marketPreferenceService from 'services/market-preferences';
import menuHelper from 'helpers/menu-helper';
import LayoutProvider from 'pages/common-layout/layout-provider-context';
import eventBus from 'helpers/event-bus-helper';
import ContainerRight from 'components/container/right';
import Breadcrumbs from './breadcrumbs';

const Dashboard: React.FC = () => {
  const { opportunity_id } = useParams<ObjectType>();
  const location = useLocation();

  const [opportunity, setOpportunity] = useState<
    OpportunityEntity | ObjectType
  >({});

  const [loading, setLoading] = useState<boolean>(false);
  const { setSideNavMenuItems } = useContext(LayoutProvider);

  const { oldOpportunity, setOldOpportunity } = useContext(OpportunityContext);

  const [marketPreference, setMarketPreference] = useState<ObjectType>({});

  const [routeName, setRouteName] = useState('');

  const [validation, setValidation] = useState({});
  const [field, setField] = useState('');

  const getOpportunity = async (id: string) => {
    setLoading(true);
    const result = await oppurtunityService.getById(id);
    setOpportunity(result.data);

    if (result.data?.market_preference_id) {
      const marketPreferenceResult = await marketPreferenceService.getById(
        result.data?.market_preference_id
      );

      setMarketPreference(marketPreferenceResult.data);
    }

    let data: ObjectType = await getAdditionalInfo(result.data);

    setOpportunity(() => data);
    setLoading(false);
  };

  const handleChange = (e: any) => {
    if (e.target) {
      setOpportunity(
        Object.assign({}, opportunity, { [e.target.name]: e.target.value })
      );
    } else {
      setOpportunity(Object.assign({}, opportunity, e));
    }
  };

  const updateOpportunity = (obj: ObjectType) => {
    setOpportunity(Object.assign({}, opportunity, obj));
  };

  const updateValidation = (obj: ObjectType) => {
    setValidation(Object.assign({}, validation, obj));
  };

  const performAfterEffect = async (field: string) => {
    if (validationService.validation[field]?.validate) {
      const errors = validationService.validation[field]?.validate(
        opportunity,
        'edit',
        oldOpportunity
      );
      updateValidation({ [field]: errors });
    }
    setField('1');
  };

  useEffect(() => {
    performAfterEffect(field);
  }, [field]);

  useEffect(() => {
    if (location.pathname.includes('brokerage-action')) {
      if (opportunity_id !== undefined) {
        getOpportunity(opportunity_id);
        eventBus.dispatch('show_action_modal', {});
      }
    }

    setOpportunity({});
  }, [location]);

  const getMenus = async () => {
    let menus = await menuHelper.getItems('dashboard', 'list');

    let menusToshow = menus.map(function (item) {
      return { ...item, url: item.url('') };
    });

    setSideNavMenuItems(menusToshow);
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <>
      <Breadcrumbs
        params={{
          routeName
        }}
      />
      <ContainerRight p={1}>
        <OpportunityContext.Provider
          value={{
            oppurtunity: opportunity,
            handleChange,
            oldOppurtunity: opportunity,
            updateOpportunity,
            setOpportunity: (val: ObjectType) => {
              setOpportunity(val);
            },
            marketPreference,
            loading
          }}
        >
          <Outlet context={{ routeName, setRouteName }} />
        </OpportunityContext.Provider>
      </ContainerRight>
    </>
  );
};

export default Dashboard;
