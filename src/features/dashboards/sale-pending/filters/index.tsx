import DASHBOARDS from 'assets/constants/dashboards';
import dateRange from 'assets/constants/date-range';
import fieldLabel from 'assets/constants/fieldLabel';
import mlsStatus from 'assets/constants/mls-status';
import sellerResponse from 'assets/constants/seller-response';
import AutoCompleteUnit from 'components/form/auto-complete-unit';
import ClearButton from 'components/form/button-clear';
import RefreshButton from 'components/form/button-refresh';
import SearchButton from 'components/form/button-search';
import FormContainer from 'components/form/container';
import UnitAccount from 'components/form/unit-account';
import UnitDate from 'components/form/unit-date';
import UnitItem from 'components/form/unit-item';
import UnitMsa from 'components/form/unit-msa';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import ColumnChooser from 'features/dashboards/column-chooser';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import React, { useContext, useEffect, useState } from 'react';
import userPreferenceService from 'services/user-preference-service';
import initialFilter from 'state/dashboard/sale-pending/initial-filter';
import { ObjectType } from 'types';
import { UserPreferenceEntityResponse } from 'types/user-preference-type';

import { DashboardContext } from '../context';
import DefaultDashboardFields from 'assets/list/dashboard/default-column';

const Filters = ({ page }: ObjectType) => {
  const {
    setIsFilterChanged,
    filter,
    setFilter,
    updateFilter,
    updatePagiantion,
    currentTab
  } = useContext(DashboardContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeFilter = (obj: any) => {
    updateFilter(obj);
  };

  const saveFilters = async (value: ObjectType) => {
    setFilter(value);
    setIsFilterChanged(true);

    setIsLoading(true);

    await userPreferenceService.save({
      category: DASHBOARDS.NEGOTIATOR_DASHBOARD_SALE_PENDING,
      subcategory: DASHBOARDS.FILTER,
      contents: value
    });

    setIsLoading(false);
  };

  const loadFilter = async () => {
    let response: UserPreferenceEntityResponse =
      await userPreferenceService.getItem({
        category: DASHBOARDS.NEGOTIATOR_DASHBOARD_SALE_PENDING,
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

  return (
    <PaperBox>
      <PaperBoxContent>
        <FormContainer>
          <UnitText
            name={'property_address_c'}
            label={fieldLabel.propertyAddress}
            value={filter.property_address_c}
            onChange={(e: any) => changeFilter(e.target)}
            grid={{ xs: 12, sm: 4 }}
          />
          <UnitText
            name={'entera_opportunity_id'}
            label={fieldLabel.enteraOpportunitId}
            value={filter.entera_opportunity_id}
            onChange={(e: any) => changeFilter(e.target)}
            grid={{ xs: 12, sm: 4 }}
          />
          <UnitText
            name={'mls_c'}
            label={fieldLabel.mls}
            value={filter.mls_c}
            onChange={(e: any) => changeFilter(e.target)}
            grid={{ xs: 12, sm: 4 }}
          />
          <UnitText
            name={'street_name'}
            label={fieldLabel.streetName}
            value={filter.street_name}
            onChange={(e: any) => changeFilter(e.target)}
            grid={{ xs: 12, sm: 4 }}
          />
          <UnitAccount
            value={filter.account_id}
            multiple={true}
            onChange={(val: any) => {
              updateFilter({
                name: 'account_id',
                value: val
              });
            }}
            grid={{ xs: 12, sm: 4 }}
          />
          <UnitMsa
            value={filter.msa_id}
            multiple={true}
            onChange={(val: any) => {
              updateFilter({
                name: 'msa_id',
                value: val
              });
            }}
            grid={{ xs: 12, sm: 4 }}
          />
          <AutoCompleteUnit
            label={fieldLabel.opportunityStatus}
            id="opportunity_status_c"
            options={[
              {
                value: 'closing_sale_pending',
                label: 'Closing: Sale Pending'
              },
              {
                value: 'closing_sale_pending_amended',
                label: 'Closing Sale Pending Amended'
              },
              {
                value: 'closing_clear_to_close',
                label: 'Closing: Clear to Close'
              }
            ]}
            multiple={true}
            values={filter.opportunity_status_c}
            grid={{ xs: 12, sm: 4 }}
            onChange={(e: any) => {
              if (e.target.value.length > 0)
                changeFilter({
                  name: 'opportunity_status_c',
                  value: e.target.value
                });
            }}
          />

          <AutoCompleteUnit
            label={fieldLabel.mlsStatus}
            id="mls_status_c"
            options={getObjectEntriesAsArray(mlsStatus)}
            multiple={false}
            values={filter.mls_status_c}
            grid={{ xs: 12, sm: 4 }}
            onChange={(e: any) => {
              changeFilter({
                name: 'mls_status_c',
                value: e.target.value
              });
            }}
          />

          <AutoCompleteUnit
            label={fieldLabel.sellerResponse}
            id="seller_offer_response"
            options={getObjectEntriesAsArray(sellerResponse)}
            multiple={false}
            values={filter.seller_offer_response}
            grid={{ xs: 12, sm: 4 }}
            onChange={(e: any) => {
              changeFilter({
                name: 'seller_offer_response',
                value: e.target.value
              });
            }}
          />

          <UnitItem grid={{ xs: 12, sm: 4 }}>
            <FormContainer spacing={1}>
              <UnitSelect
                name="offer_date_c_range"
                label={fieldLabel.dateRange}
                records={getObjectEntriesAsArray(dateRange)}
                value={filter.offer_date_c_range ?? ''}
                onChange={(e: any) => changeFilter(e.target)}
                readOnly={false}
                grid={{ xs: 12, sm: 4 }}
              />
              {filter.offer_date_c_range === 'date-range' ? (
                <>
                  <UnitDate
                    label={fieldLabel.offerDate}
                    name="offer_date_c"
                    value={filter.offer_date_c ?? ''}
                    onChange={(e: any) => {
                      changeFilter({
                        name: 'offer_date_c',
                        value: e
                      });
                    }}
                    grid={{ xs: 12, sm: 4 }}
                  />

                  <UnitDate
                    label={fieldLabel.offerToDate}
                    name="offer_date_to_c"
                    value={filter.offer_date_to_c ?? ''}
                    onChange={(e: any) => {
                      changeFilter({
                        name: 'offer_date_to_c',
                        value: e
                      });
                    }}
                    grid={{ xs: 12, sm: 4 }}
                  />
                </>
              ) : (
                <UnitDate
                  label={fieldLabel.offerDate}
                  name="offer_date_c"
                  value={filter.offer_date_c ?? ''}
                  onChange={(e: any) => {
                    changeFilter({
                      name: 'offer_date_c',
                      value: e
                    });
                  }}
                  grid={{ xs: 12, sm: 8 }}
                />
              )}
            </FormContainer>
          </UnitItem>
        </FormContainer>

        <StackRow sx={{ pt: 2, pr: 0, pb: 0, pl: 0 }}>
          <SearchButton
            onClick={() => saveFilters(filter)}
            disabled={isLoading}
          />
          <ClearButton
            onClick={() => {
              saveFilters(initialFilter);
            }}
          />
          <ColumnChooser
            title="SALE PENDING"
            category={DASHBOARDS.NEGOTIATOR_DASHBOARD_SALE_PENDING}
            subcategory={DASHBOARDS.SELECTED_COLUMNS}
            dashboard={DASHBOARDS.NEGOTIATOR_DASHBOARD_SALE_PENDING}
            currentTab={currentTab}
            defaultColumns={
              DefaultDashboardFields.NEGOTIATOR_DASHBOARD_SALE_PENDING
            }
          />
          <RefreshButton
            onClick={() => {
              if (updatePagiantion) {
                if (page !== 0) {
                  updatePagiantion({ page: 0 });
                } else {
                  setIsFilterChanged(true);
                }
              }
            }}
          />
        </StackRow>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default Filters;
