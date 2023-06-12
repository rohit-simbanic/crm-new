import { Box } from '@mui/material';
import DASHBOARDS from 'assets/constants/dashboards';
import fieldLabel from 'assets/constants/fieldLabel';
import ContainerRight from 'components/container/right';
import ClearButton from 'components/form/button-clear';
import SearchButton from 'components/form/button-search';
import FormContainer from 'components/form/container';
import DashboradTabLabel from 'components/form/unit-dashboard-tab';
import UnitText from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import HorizontalTabs from 'components/tabs/horizontal-tabs';
import TabArea from 'components/tabs/tab-area';
import Title from 'components/typography/title';
import ColumnChooser from 'features/dashboards/column-chooser';
import React, { useContext, useEffect, useState } from 'react';
import { isValidFilter } from 'services/filter-service';
import userPreferenceService from 'services/user-preference-service';
import { ObjectType } from 'types';
import { UserPreferenceEntityResponse } from 'types/user-preference-type';

import ClosingProperties from '../features/properties/closing.tsx';
import NewProperties from '../features/properties/new';
import OffersProperties from '../features/properties/offers';
import PreOffersProperties from '../features/properties/pre-offers';
import QueryResultProperties from '../features/properties/query-results';
import LayoutProvider from './common-layout/layout-provider-context';
import DefaultDashboardFields from 'assets/list/dashboard/default-column';

const initailQuery = {
  property_address_c: '',
  entera_opportunity_id: '',
  mls_c: '',
  street_name: ''
};

const tabId = 'properties-tab';

const Properties = () => {
  const [filter, setFilter] = useState<ObjectType>(initailQuery);
  const [activeTab, setActiveTab] = React.useState(0);
  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);

  const { setSideNavMenuItems } = useContext(LayoutProvider);

  const changeFilter = (obj: any) => {
    setFilter(Object.assign({}, filter, { [obj.name]: obj.value }));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const saveFilter = async (value: ObjectType) => {
    if (isValidFilter(value)) {
      setActiveTab(4);
      setIsFilterChanged(true);
    }
    setFilter(value);

    await userPreferenceService.save({
      category: DASHBOARDS.PROPERTIES_QUERY_RESULT,
      subcategory: DASHBOARDS.FILTER,
      contents: value
    });
  };

  const saveFilterOnEnterPress = (e: any) => {
    if (e.key === 'Enter') {
      saveFilter(filter);
    }
  };

  const loadFilter = async () => {
    let response: UserPreferenceEntityResponse =
      await userPreferenceService.getItem({
        category: DASHBOARDS.PROPERTIES_QUERY_RESULT,
        subcategory: DASHBOARDS.FILTER
      });

    if (response.isSuccess && response.data) {
      setFilter(response.data.contents);
      setIsFilterChanged(true);
    }
  };

  useEffect(() => {
    loadFilter();
  }, []);

  const getMenus = async () => {
    setSideNavMenuItems([]);
  };

  useEffect(() => {
    getMenus();
  }, []);

  const tabItems = () => {
    return {
      closing: <DashboradTabLabel title={fieldLabel.closing} />,
      offers: <DashboradTabLabel title={fieldLabel.offers} />,
      pre_offers: <DashboradTabLabel title={fieldLabel.preOffers} />,
      new: <DashboradTabLabel title={fieldLabel.new} />,
      query_results: <DashboradTabLabel title={fieldLabel.queryResults} />
    };
  };

  return (
    <>
      <ContainerRight p={1}>
        <PaperBox>
          <PaperBoxContent>
            <Title value={fieldLabel.searchQuery} sx={{ mt: -1, pb: 1 }} />

            <FormContainer>
              <UnitText
                name={'property_address_c'}
                label={fieldLabel.propertyAddress}
                value={filter.property_address_c}
                onChange={(e: any) => changeFilter(e.target)}
                grid={{ xs: 12, sm: 4 }}
                onKeyDown={(e: any) => saveFilterOnEnterPress(e)}
              />

              <UnitText
                name={'entera_opportunity_id'}
                label={fieldLabel.enteraOpportunitId}
                value={filter.entera_opportunity_id}
                onChange={(e: any) => changeFilter(e.target)}
                onKeyDown={(e: any) => saveFilterOnEnterPress(e)}
                grid={{ xs: 12, sm: 4 }}
              />

              <UnitText
                name={'mls_c'}
                label={fieldLabel.mls}
                value={filter.mls_c}
                onChange={(e: any) => changeFilter(e.target)}
                onKeyDown={(e: any) => saveFilterOnEnterPress(e)}
                grid={{ xs: 12, sm: 4 }}
              />

              <UnitText
                name={'street_name'}
                label={fieldLabel.streetName}
                value={filter.street_name}
                onChange={(e: any) => changeFilter(e.target)}
                onKeyDown={(e: any) => saveFilterOnEnterPress(e)}
                grid={{ xs: 12, sm: 4 }}
              />
            </FormContainer>

            <StackRow sx={{ pt: 2, pr: 0, pb: 0, pl: 0 }}>
              <SearchButton onClick={() => saveFilter(filter)} />
              <ClearButton
                onClick={() => {
                  saveFilter(initailQuery);
                }}
              />
              <ColumnChooser
                title="QUERY RESULTS"
                category={DASHBOARDS.PROPERTIES_QUERY_RESULT}
                subcategory={DASHBOARDS.SELECTED_COLUMNS}
                dashboard={DASHBOARDS.PROPERTIES_QUERY_RESULT}
                currentTab={DASHBOARDS.PROPERTIES_QUERY_RESULT}
                defaultColumns={
                  DefaultDashboardFields.NEGOTIATOR_DASHBOARD_OFFER_MAKE_OFFER
                }
              />
            </StackRow>
          </PaperBoxContent>
        </PaperBox>

        <Box mt={2}>
          <HorizontalTabs
            value={activeTab}
            handleChange={handleChange}
            tabItems={tabItems()}
            tabId={tabId}
          />

          <TabArea index={0} value={activeTab} border={false} tabId={tabId}>
            <ClosingProperties />
          </TabArea>
          <TabArea index={1} value={activeTab} border={false} tabId={tabId}>
            <OffersProperties />
          </TabArea>
          <TabArea index={2} value={activeTab} border={false} tabId={tabId}>
            <PreOffersProperties />
          </TabArea>
          <TabArea index={3} value={activeTab} border={false} tabId={tabId}>
            <NewProperties />
          </TabArea>
          <TabArea index={4} value={activeTab} border={false} tabId={tabId}>
            <QueryResultProperties
              currentTab={activeTab}
              filter={filter}
              isFilterChanged={isFilterChanged}
              setIsFilterChanged={setIsFilterChanged}
            />
          </TabArea>
        </Box>
      </ContainerRight>
    </>
  );
};

export default Properties;
