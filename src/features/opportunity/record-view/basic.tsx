import buyerAssignability from 'assets/constants/buyer-assignability';
import dataSource from 'assets/constants/data-source';
import fieldLabel from 'assets/constants/fieldLabel';
import inspectionContingencyaived from 'assets/constants/inspection-contingencyaived';
import listingSource from 'assets/constants/listing-source';
import listingType from 'assets/constants/listing-type';
import mlsStatus from 'assets/constants/mls-status';
import offerStrategy from 'assets/constants/offer-strategy';
import opportunityType from 'assets/constants/opportunity-type';
import sellerResponse from 'assets/constants/seller-response';
import FormContainer from 'components/form/container';
import UnitBrokerageUser from 'components/form/unit-brokerage-user';
import UnitDate from 'components/form/unit-date';
import UnitDateTime from 'components/form/unit-date-time';
import UnitEmpty from 'components/form/unit-empty';
import UnitMarketPreference from 'components/form/unit-market-preference';
import UnitMsa from 'components/form/unit-msa';
import UnitOpportunityStatus from 'components/form/unit-opportunity-status';
import UnitPercentageFormatter from 'components/form/unit-percentage-formatter';
import UnitPriceFormatter from 'components/form/unit-price-formatter';
import UnitRead from 'components/form/unit-read';
import UnitSelect from 'components/form/unit-select';
import UnitSwitch from 'components/form/unit-switch';
import UnitText from 'components/form/unit-text';
import RouteLink from 'components/link/route-link';
import RouteOpenNewIconLink from 'components/link/route-open-new-icon-link';
import envConfig from 'config/env';
import emptyFunction from 'helpers/empty-function-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import React from 'react';
import { ObjectType } from 'types';

interface recordViewType {
  oppurtunity: ObjectType;
  oldOppurtunity: ObjectType;
  validation?: ObjectType;
  onChange?: any;
  changeHandle?: (e: any) => any;
  setField?: (e: any) => any;
  readOnly?: boolean;
}

const BasicRecordView = ({
  oppurtunity,
  oldOppurtunity,
  validation,
  onChange,
  changeHandle,
  setField,
  readOnly = false
}: recordViewType) => {
  let handleChange = changeHandle ?? emptyFunction;
  let valMessages = validation ?? {};
  const data: ObjectType = readOnly ? oldOppurtunity : oppurtunity;
  var date = new Date();
  date.setDate(date.getDate() + 1);
  
  return (
    <>
      <FormContainer>
        <UnitText
          label={fieldLabel.closingName}
          name="name"
          value={
            readOnly === true
              ? `${data?.name} -- ${data?.market?.name}, ${data?.account?.name}`
              : `${data?.name ?? ''}`
          }
          onChange={handleChange}
          error={valMessages['name'] ?? ''}
          required
          readOnly={readOnly}
        />
        <UnitOpportunityStatus
          opportunity={oldOppurtunity}
          value={data?.opportunity_status_c}
          handleChange={onChange}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.enteraPropertyId}
          name="entera_property_id_c"
          value={data?.entera_property_id_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitSelect
          name="seller_offer_response"
          label={fieldLabel.sellerResponse}
          records={getObjectEntriesAsArray(sellerResponse)}
          value={data?.seller_offer_response ?? ''}
          onChange={onChange}
          readOnly={readOnly}
          error={valMessages['seller_offer_response'] ?? ''}
        />
        <UnitText
          label={fieldLabel.enteraOpportunityId}
          name="entera_opportunity_id"
          value={data?.entera_opportunity_id ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitDate
          label={fieldLabel.nextSellerContactDate}
          name="next_seller_contact_date"
          value={data?.next_seller_contact_date || null}
          error={valMessages['next_seller_contact_date'] ?? ''}
          onChange={(e: any) =>
            onChange({
              target: {
                name: 'next_seller_contact_date',
                value: e
              }
            })
          }
          minDate={
            data?.seller_offer_response === 'in_negotiation' ||
            data?.seller_offer_response === 'highest_and_best_requested'
              ? date
              : null
          }
          readOnly={readOnly}
        />

        {readOnly === true ? (
          <UnitRead
            label={fieldLabel.enteraOpportunityUrl}
            value={
              <>
                {envConfig.REACT_APP_FRONTEND_URL}/opportunities/
                {data?.entera_opportunity_id ?? ''}
                <RouteOpenNewIconLink
                  url={`${envConfig.REACT_APP_FRONTEND_URL}/opportunities/${
                    data?.entera_opportunity_id ?? ''
                  }`}
                />
              </>
            }
          />
        ) : (
          <UnitText
            label={fieldLabel.enteraOpportunityUrl}
            name="entera_opportunity_url"
            value={`${envConfig.REACT_APP_FRONTEND_URL}/opportunities/${
              data?.entera_opportunity_id ?? ''
            }`}
            onChange={handleChange}
            disabled={true}
          />
        )}

        <UnitSelect
          name="is_inspection_contingencies_waived"
          label={fieldLabel.isInspectionContingenciesWaived}
          records={getObjectEntriesAsArray(inspectionContingencyaived)}
          value={data?.is_inspection_contingencies_waived ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.mls}
          name="mls_c"
          value={data?.mls_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitSelect
          name="type_c"
          label={fieldLabel.type}
          records={getObjectEntriesAsArray(opportunityType)}
          value={data?.type_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          error={valMessages['type_c'] ?? ''}
        />
        <UnitSelect
          name="mls_status_c"
          label={fieldLabel.mlsStatus}
          records={getObjectEntriesAsArray(mlsStatus)}
          value={data?.mls_status_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.enteraCustomerId}
          name="entera_customer_id"
          value={data?.entera_customer_id ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitEmpty />
        <UnitText
          label={fieldLabel.propertyType}
          name="property_type_c"
          value={data?.property_type_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline={true}
          rows={4}
        />
        <UnitEmpty />
        <UnitSelect
          name="listing_type_c"
          label={fieldLabel.listingType}
          records={getObjectEntriesAsArray(listingType)}
          value={data?.listing_type_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitEmpty />
        <UnitDate
          label={fieldLabel.listDate}
          name="list_date_c"
          value={data?.list_date_c || null}
          onChange={(e: any) =>
            handleChange({
              target: {
                name: 'list_date_c',
                value: e
              }
            })
          }
          readOnly={readOnly}
        />
        <UnitDateTime
          label={fieldLabel.mlsUpdatedDate}
          name="mls_updated_timestamp_c"
          value={data?.mls_updated_timestamp_c || null}
          onChange={(e: any) =>
            handleChange({
              target: {
                name: 'mls_updated_timestamp_c',
                value: e
              }
            })
          }
          readOnly={readOnly}
        />
        <UnitSwitch
          value={data?.entera_sourced_off_market ?? 0}
          onChange={handleChange}
          name="entera_sourced_off_market"
          label={fieldLabel.enteraSourcedOffMarket}
          disabled={readOnly}
        />
        <UnitPriceFormatter
          name="list_price_c"
          value={data?.list_price_c}
          onChange={handleChange}
          label={fieldLabel.listPrice}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />
        <UnitSelect
          name="listing_source_c"
          label={fieldLabel.listingSource}
          records={getObjectEntriesAsArray(
            listingSource,
            data?.listing_source_c
          )}
          value={data?.listing_source_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitPriceFormatter
          name="revised_list_price_c"
          value={data?.revised_list_price_c}
          onChange={handleChange}
          label={fieldLabel.revisedListPrice}
          readOnly={readOnly}
          disabled={readOnly}
        />
        <UnitSelect
          name="data_source"
          label={fieldLabel.dataSource}
          records={getObjectEntriesAsArray(dataSource)}
          value={data?.data_source ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="offer_price_c"
          value={data?.offer_price_c}
          onChange={onChange}
          label={fieldLabel.offerPrice}
          error={valMessages['offer_price_c'] ?? ''}
          readOnly={readOnly}
        />
        <UnitDateTime
          label={fieldLabel.listPriceUpdatedDate}
          name="list_price_updated_date_c"
          value={data?.list_price_updated_date_c || null}
          onChange={(e: any) =>
            handleChange({
              target: {
                name: 'list_price_updated_date_c',
                value: e
              }
            })
          }
          readOnly={readOnly}
        />
        <UnitEmpty />
        <UnitSelect
          name="offer_strategy"
          label={fieldLabel.offerStrategy}
          records={getObjectEntriesAsArray(offerStrategy)}
          value={data?.offer_strategy ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitPriceFormatter
          name="max_offer_price_c"
          value={data?.max_offer_price_c}
          onChange={handleChange}
          label={fieldLabel.maxOfferPrice}
          readOnly={readOnly}
        />

        {readOnly == true ? (
          <UnitRead
            label={fieldLabel.msa}
            value={
              <>
                <RouteLink
                  url={`${`/msa/${data?.market?.id}/view`}`}
                  name={data?.market?.name || '-'}
                  target={true}
                />
              </>
            }
          />
        ) : (
          <UnitMsa
            value={{
              label: data?.market?.name || '',
              value: data?.market?.id || ''
            }}
            multiple={false}
            onChange={(val: any) => {
              handleChange({
                market: {
                  id: val?.value,
                  name: val?.label
                },
                msa_id_1: val?.value || ''
              });
            }}
            readOnly={readOnly}
            error={valMessages['msa_id_1']}
          />
        )}

        <UnitPercentageFormatter
          name="offer_to_list_c"
          label={fieldLabel.offerToList}
          value={data?.offer_to_list_c}
          onChange={handleChange}
          data-testid="offer_to_list_c-input"
          readOnly={readOnly}
        />

        {readOnly == true ? (
          <UnitRead
            label={fieldLabel.marketPreferences}
            value={
              <>
                <RouteLink
                  url={`${`/market-preferences/${data?.market_preference?.id}/view`}`}
                  name={`${data?.market_preference?.name || '-'} `}
                  target={true}
                />
              </>
            }
          />
        ) : (
          <UnitMarketPreference
            multiple={false}
            value={{
              label: data?.market_preference?.name || '',
              value: data?.market_preference?.id || ''
            }}
            onChange={(val: any) => {
              handleChange({
                market_preference: {
                  id: val?.value || '',
                  name: val?.label || ''
                },
                market_preference_id: val?.value || ''
              });
            }}
            readOnly={readOnly}
            error={valMessages['market_preference_id']}
          />
        )}

        <UnitPercentageFormatter
          name="offer_to_market_value_percentage_c"
          label={fieldLabel.offerToMarketValue}
          value={data?.offer_to_market_value_percentage_c}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />
        <UnitEmpty />

        <UnitDateTime
          label={fieldLabel.offerInitialized}
          name="offer_initialized_at"
          value={data?.offer_initialized_at ? data?.offer_initialized_at : null}
          onChange={(e: any) =>
            handleChange({
              target: {
                name: 'offer_initialized_at',
                value: e
              }
            })
          }
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
        />

        <UnitDateTime
          label={fieldLabel.offerFinalized}
          name="offer_finalized_at"
          value={data?.offer_finalized_at ? data?.offer_finalized_at : null}
          onChange={handleChange}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
        />

        {readOnly == true ? (
          <UnitRead
            label={fieldLabel.submittingUser}
            value={data?.submitting_user_name}
          />
        ) : (
          <UnitBrokerageUser
            label={fieldLabel.submittingUser}
            value={{
              value: data?.submitting_user_code,
              label: data?.submitting_user_name
            }}
            onChange={(val: any) => {
              handleChange({
                submitting_user_name: val?.label,
                submitting_user_code: val?.value
              });
            }}
            readOnly={readOnly}
          />
        )}

        <UnitText
          label={fieldLabel.behalfOfSubmittingUser}
          name="behalf_of_user_name"
          value={data?.behalf_of_user_name ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
        />

        <UnitSelect
          name="buyer_assignability"
          label={fieldLabel.buyerAssignability}
          records={getObjectEntriesAsArray(buyerAssignability)}
          value={data?.buyer_assignability ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
      </FormContainer>
    </>
  );
};

export default BasicRecordView;
