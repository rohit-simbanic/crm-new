import DASHBOARDS from 'assets/constants/dashboards';
import dateRange from 'assets/constants/date-range';
import fieldLabel from 'assets/constants/fieldLabel';
import mlsStatus from 'assets/constants/mls-status';
import sellerResponse from 'assets/constants/seller-response';
import stateOfOffers from 'assets/constants/state-of-offers';
import DefaultDashboardFields from 'assets/list/dashboard/default-column';
import SecondaryButton from 'components/button/button-secondary';
import AutoCompleteUnit from 'components/form/auto-complete-unit';
import ClearButton from 'components/form/button-clear';
import SearchButton from 'components/form/button-search';
import FormContainer from 'components/form/container';
import UnitAccount from 'components/form/unit-account';
import UnitDate from 'components/form/unit-date';
import UnitItem from 'components/form/unit-item';
import UnitMsa from 'components/form/unit-msa';
import UnitSelect from 'components/form/unit-select';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import ColumnChooser from 'features/dashboards/column-chooser';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import React, { useEffect } from 'react';
import { isValidFilter } from 'services/filter-service';
import userPreferenceService from 'services/user-preference-service';
import { ObjectType } from 'types';
import { UserPreferenceEntityResponse } from 'types/user-preference-type';

interface FilterPropTypes {
  filter: ObjectType;
  setFilter: (val: ObjectType) => void;
  updateFilter: (val: ObjectType) => void;
  showAll: (val: string) => void;
  setIsFilterChanged: (val: boolean) => any;
  currentTab: any;
}

export const initialFilter = {
  opportunity_status_c: [],
  mls_status_c: [],
  msa_id: [],
  account_id: [],
  seller_offer_response: [],

  offer_date_c_range: '',
  offer_date_c: '',
  offer_date_to_c: '',
  next_seller_contact_date_range: '',
  next_seller_contact_date: '',
  next_seller_contact_date_to: ''
};

const Filter = ({
  filter,
  setFilter,
  updateFilter,
  showAll,
  setIsFilterChanged,
  currentTab
}: FilterPropTypes) => {
  const loadAll = () => {
    let query = ``;

    for (const el of getObjectEntriesAsArray(stateOfOffers)) {
      query += `&filter[opportunity_status_c][]=${el.value}`;
    }

    showAll(query);
  };

  const saveFilters = async (value: ObjectType) => {
    setFilter(value);
    showAll('');
    if (isValidFilter(value)) {
      setIsFilterChanged(true);
    }

    await userPreferenceService.save({
      category: DASHBOARDS.PROPERTIES_OFFERS,
      subcategory: DASHBOARDS.FILTER,
      contents: value
    });
  };

  const loadFilter = async () => {
    let response: UserPreferenceEntityResponse =
      await userPreferenceService.getItem({
        category: DASHBOARDS.PROPERTIES_OFFERS,
        subcategory: DASHBOARDS.FILTER
      });

    if (response.isSuccess && response.data) {
      setFilter(response.data.contents);
    }
  };

  useEffect(() => {
    loadFilter();
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <FormContainer>
          <AutoCompleteUnit
            label={fieldLabel.opportunityStatus}
            id="opportunity_status_c"
            options={getObjectEntriesAsArray(stateOfOffers)}
            multiple={true}
            values={filter.opportunity_status_c || []}
            grid={{ xs: 12, sm: 4 }}
            onChange={(e: any) => {
              updateFilter({
                name: 'opportunity_status_c',
                value: e.target.value
              });
            }}
          />
          <AutoCompleteUnit
            label={fieldLabel.sellerResponse}
            id="seller_offer_response"
            options={getObjectEntriesAsArray(sellerResponse)}
            multiple={true}
            values={filter.seller_offer_response || []}
            grid={{ xs: 12, sm: 4 }}
            onChange={(e: any) => {
              updateFilter({
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
                onChange={(e: any) => updateFilter(e.target)}
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
                      updateFilter({
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
                      updateFilter({
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
                    updateFilter({
                      name: 'offer_date_c',
                      value: e
                    });
                  }}
                  grid={{ xs: 12, sm: 8 }}
                />
              )}
            </FormContainer>
          </UnitItem>
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
            label={fieldLabel.mlsStatus}
            id="mls_status_c"
            options={getObjectEntriesAsArray(mlsStatus)}
            multiple={true}
            values={filter.mls_status_c || []}
            grid={{ xs: 12, sm: 4 }}
            onChange={(e: any) => {
              updateFilter({
                name: 'mls_status_c',
                value: e.target.value
              });
            }}
          />
          <UnitItem grid={{ xs: 12, sm: 4 }}>
            <FormContainer spacing={1}>
              <UnitSelect
                name="next_seller_contact_date_range"
                label={fieldLabel.dateRange}
                records={getObjectEntriesAsArray(dateRange)}
                value={filter.next_seller_contact_date_range ?? ''}
                onChange={(e: any) => updateFilter(e.target)}
                readOnly={false}
                grid={{ xs: 12, sm: 4 }}
              />
              {filter.next_seller_contact_date_range === 'date-range' ? (
                <>
                  <UnitDate
                    label={fieldLabel.nextSellerContactDate}
                    name="next_seller_contact_date"
                    value={filter.next_seller_contact_date ?? ''}
                    onChange={(e: any) => {
                      updateFilter({
                        name: 'next_seller_contact_date',
                        value: e
                      });
                    }}
                    grid={{ xs: 12, sm: 4 }}
                  />

                  <UnitDate
                    label={fieldLabel.offerToDate}
                    name="next_seller_contact_date_to"
                    value={filter.next_seller_contact_date_to ?? ''}
                    onChange={(e: any) => {
                      updateFilter({
                        name: 'next_seller_contact_date_to',
                        value: e
                      });
                    }}
                    grid={{ xs: 12, sm: 4 }}
                  />
                </>
              ) : (
                <UnitDate
                  label={fieldLabel.nextSellerContactDate}
                  name="next_seller_contact_date"
                  value={filter.next_seller_contact_date ?? ''}
                  onChange={(e: any) => {
                    updateFilter({
                      name: 'next_seller_contact_date',
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
          <SearchButton onClick={() => saveFilters(filter)}></SearchButton>

          <SecondaryButton
            variant="contained"
            id="btn-loadall"
            onClick={() => {
              loadAll();
            }}
          >
            Show All Offers
          </SecondaryButton>

          <ClearButton onClick={() => saveFilters(initialFilter)} />

          <ColumnChooser
            title="OFFERS"
            category={DASHBOARDS.PROPERTIES_OFFERS}
            subcategory={DASHBOARDS.SELECTED_COLUMNS}
            dashboard={DASHBOARDS.PROPERTIES_OFFERS}
            currentTab={currentTab}
            defaultColumns={
              DefaultDashboardFields.NEGOTIATOR_DASHBOARD_OFFER_MAKE_OFFER
            }
          />
        </StackRow>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default Filter;
