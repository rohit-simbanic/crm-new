import FormContainer from 'components/form/container';
import React from 'react';
import fieldLabel from 'assets/constants/fieldLabel';
import { ObjectType } from 'types';
import UnitParty from 'components/form/unit-party';
import UnitText from 'components/form/unit-text';
import UnitDate from 'components/form/unit-date';
import { close_date_c } from 'services/validation/close_date';
import UnitPriceFormatter from 'components/form/unit-price-formatter';
import UnitEmpty from 'components/form/unit-empty';
import UnitPercentageFormatter from 'components/form/unit-percentage-formatter';
import UnitSelect from 'components/form/unit-select';
import UnitItem from 'components/form/unit-item';
import UnitLabel from 'components/form/unit-label';
import RouteCreateIconLink from 'components/link/route-create-icon-link';
import { isEmpty, valueToLabel } from 'helpers/misc-helper';
import emptyFunction from 'helpers/empty-function-helper';
import RouteEditIconLink from 'components/link/route-edit-icon-link';
import RouteLink from 'components/link/route-link';
import UnitRead from 'components/form/unit-read';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import buyerSource from 'assets/constants/buyer-source';
import yesNo from 'assets/constants/yes-no';
import PrimaryButton from 'components/button/button-primary';

interface recordViewType {
  oppurtunity: ObjectType;
  oldOppurtunity: ObjectType;
  validation?: ObjectType;
  calculate?: any;
  onChange?: any;
  changeHandle?: any;
  setField?: any;
  readOnly?: boolean;
}

const OffMarketRecordView = ({
  oppurtunity,
  oldOppurtunity,
  validation,
  calculate,
  onChange,
  changeHandle,
  setField,
  readOnly = false
}: recordViewType) => {
  let handleChange = changeHandle ?? emptyFunction;
  let valMessages = validation ?? {};
  const data: ObjectType = readOnly ? oldOppurtunity : oppurtunity;

  const CreateEditLink = ({ value, url }: any) => {
    return !isEmpty(value) ? (
      <RouteEditIconLink url={url} target={true} />
    ) : (
      <RouteCreateIconLink url={url} target={true} />
    );
  };

  return (
    <>
      <FormContainer>
        <UnitLabel label={fieldLabel.partiesDetails} fontWeight="bold" />
        <UnitLabel label={fieldLabel.offerDetails} fontWeight="bold" />

        {readOnly == true ? (
          <UnitRead
            grid={{ sm: 5, xs: 8 }}
            label={fieldLabel.sellerName}
            value={
              !isEmpty(data?.parties_seller_id) ? (
                <>
                  <RouteLink
                    url={
                      !isEmpty(data?.parties_seller_id)
                        ? `/opportunities/${data?.id}/parties/${data?.parties_seller_id}/view`
                        : ``
                    }
                    name={data?.offmarket_seller_name_c || '-'}
                    target={true}
                  />
                </>
              ) : (
                ''
              )
            }
          />
        ) : (
          <UnitParty
            label={fieldLabel.sellerName}
            value={{
              label: data?.offmarket_seller_name_c,
              value: data?.parties_seller_id
            }}
            type="seller"
            subType=""
            onChange={(val: any) => {
              handleChange({
                offmarket_seller_name_c: val?.name || '',
                parties_seller_id: val?.value || '',
                offmarket_seller_email_c: val?.email || '',
                offmarket_parties_seller_type: val?.type || '',
                offmarket_parties_seller_sub_type: val?.sub_type || ''
              });

              setField('seller_name_c');
            }}
            readOnly={readOnly}
            grid={{ sm: 5, xs: 8 }}
          />
        )}

        <UnitItem grid={{ sm: 1, xs: 4 }}>
          <CreateEditLink
            url={
              !isEmpty(data?.parties_seller_id)
                ? `/opportunities/${data?.id}/parties/${data?.parties_seller_id}/edit`
                : `/opportunities/${data?.id}/parties/create`
            }
            value={data?.parties_seller_id}
          />
        </UnitItem>

        <UnitText
          label={fieldLabel.dataSource}
          name="data_source"
          value={data?.data_source ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
        />

        <UnitText
          label={fieldLabel.sellerEmail}
          name="seller_email"
          value={data?.offmarket_seller_email_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
        />

        <UnitDate
          label={fieldLabel.closeDate}
          name="close_date_c"
          value={data?.close_date_c ?? null}
          onChange={(value) => {
            value = close_date_c.calculate({ close_date_c: value });
            onChange({
              target: {
                name: 'close_date_c',
                value: value
              }
            });
          }}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
        />

        <UnitText
          label={fieldLabel.sellerType}
          name="parties_seller_type"
          value={data?.offmarket_parties_seller_sub_type ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
          error={valMessages['parties_seller_type'] ?? ''}
        />

        <UnitPriceFormatter
          name="contract_price_c"
          value={data?.contract_price_c}
          onChange={handleChange}
          label={fieldLabel.contractPrice}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
          error={valMessages['contract_price_c'] ?? ''}
        />

        <UnitEmpty />

        <UnitPercentageFormatter
          name="initial_commission_percentage"
          label={`${fieldLabel.initialCommission} %`}
          value={data?.initial_commission_percentage}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitEmpty />
        <UnitEmpty />

        {readOnly ? (
          <UnitRead
            grid={{ sm: 5, xs: 8 }}
            label={fieldLabel.sellerRepresentativeName}
            value={
              !isEmpty(data?.parties_seller_representative_id) ? (
                <>
                  <RouteLink
                    url={
                      !isEmpty(data?.parties_seller_representative_id)
                        ? `/opportunities/${data?.id}/parties/${data?.parties_seller_representative_id}/view`
                        : ``
                    }
                    name={data?.parties_seller_representative_name || '-'}
                    target={true}
                  />
                </>
              ) : (
                ''
              )
            }
          />
        ) : (
          <UnitParty
            label={fieldLabel.sellerRepresentativeName}
            type="seller_representative"
            subType=""
            value={{
              label: data?.parties_seller_representative_name || '',
              value: data?.parties_seller_representative_id || ''
            }}
            onChange={(val: any) => {
              handleChange({
                parties_seller_representative_name: val?.name || '',
                parties_seller_representative_id: val?.value || '',
                parties_seller_representative_email: val?.email || '',
                parties_seller_representative_company: val?.company || '',
                parties_seller_representative_type: val?.type || '',
                parties_seller_representative_sub_type: val?.sub_type || ''
              });
              setField('parties_seller_representative_name');
            }}
            readOnly={readOnly}
            error={valMessages['parties_seller_representative_name'] ?? ''}
            grid={{ sm: 5, xs: 8 }}
          />
        )}

        <UnitItem grid={{ sm: 1, xs: 4 }}>
          <CreateEditLink
            url={
              !isEmpty(data?.parties_seller_representative_id)
                ? `/opportunities/${data?.id}/parties/${data?.parties_seller_representative_id}/edit`
                : `/opportunities/${data?.id}/parties/create`
            }
            value={data?.parties_seller_representative_id}
          />
        </UnitItem>

        <UnitLabel label={fieldLabel.commissionInput} fontWeight="bold" />

        <UnitText
          label={fieldLabel.sellerRepresentativeEmail}
          name="parties_seller_representative_email"
          value={data?.parties_seller_representative_email ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitSelect
          name="commission_buyer_source"
          label={fieldLabel.buyerSource}
          records={getObjectEntriesAsArray(buyerSource)}
          value={data?.commission_buyer_source ?? ''}
          onChange={onChange}
          readOnly={readOnly}
          error={valMessages['commission_buyer_source'] ?? ''}
        />

        <UnitText
          label={fieldLabel.sellerRepresentativeCompany}
          name="parties_seller_representative_company"
          value={data?.parties_seller_representative_company ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitSelect
          name="commission_buyer_rep"
          label={`${fieldLabel.didYouRepresenttheBuyer}?`}
          records={getObjectEntriesAsArray(yesNo)}
          value={data?.commission_buyer_rep ?? ''}
          onChange={onChange}
          readOnly={readOnly}
          error={valMessages['commission_buyer_rep'] ?? ''}
        />

        <UnitText
          label={fieldLabel.sellerRepresentativeType}
          name="parties_seller_representative_type"
          value={data?.parties_seller_representative_type ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
          error={valMessages['parties_seller_representative_type'] ?? ''}
        />

        <UnitEmpty />
        <UnitEmpty />

        <UnitSelect
          name="commission_seller_source"
          label={fieldLabel.sellerSource}
          records={getObjectEntriesAsArray(buyerSource)}
          value={data?.commission_seller_source ?? ''}
          onChange={onChange}
          readOnly={readOnly}
          error={valMessages['commission_seller_source'] ?? ''}
        />

        <UnitEmpty />
        <UnitEmpty />

        {readOnly == true ? (
          <UnitRead
            grid={{ sm: 5, xs: 8 }}
            label={fieldLabel.leadSourceName}
            value={
              !isEmpty(data?.parties_lead_source_id) ? (
                <>
                  <RouteLink
                    url={
                      !isEmpty(data?.parties_lead_source_id)
                        ? `/opportunities/${data?.id}/parties/${data?.parties_lead_source_id}/view`
                        : ``
                    }
                    name={data?.parties_lead_source_name || '-'}
                    target={true}
                  />
                </>
              ) : (
                ''
              )
            }
          />
        ) : (
          <UnitParty
            label={fieldLabel.leadSourceName}
            type="lead_source"
            subType=""
            value={{
              label: data?.parties_lead_source_name,
              value: data?.parties_lead_source_id
            }}
            onChange={(val: any) => {
              handleChange({
                parties_lead_source_name: val?.name || '',
                parties_lead_source_id: val?.value || '',
                parties_lead_source_email: val?.email || '',
                parties_lead_source_type: val?.type || '',
                parties_lead_source_sub_type: val?.sub_type || ''
              });

              setField('parties_lead_source_name');
            }}
            error={valMessages['parties_lead_source_name'] ?? ''}
            readOnly={readOnly}
            grid={{ sm: 5, xs: 8 }}
          />
        )}

        <UnitItem grid={{ sm: 1, xs: 4 }}>
          <CreateEditLink
            url={
              !isEmpty(data?.parties_lead_source_id)
                ? `/opportunities/${data?.id}/parties/${data?.parties_lead_source_id}/edit`
                : `/opportunities/${data?.id}/parties/create`
            }
            value={data?.parties_lead_source_id}
          />
        </UnitItem>

        <UnitSelect
          name="commission_seller_rep"
          label={fieldLabel.doesTheSellerHaveOutSideRepresentation}
          records={getObjectEntriesAsArray(yesNo)}
          value={data?.commission_seller_rep ?? ''}
          onChange={onChange}
          readOnly={readOnly}
          error={valMessages['commission_seller_rep'] ?? ''}
        />

        <UnitText
          label={fieldLabel.leadSourceEmail}
          name="parties_lead_source_email"
          value={data?.parties_lead_source_email ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
        />

        <UnitEmpty />

        <UnitText
          label={fieldLabel.leadSourceType}
          name="parties_lead_source_type"
          value={data?.parties_lead_source_type ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
          error={valMessages['parties_lead_source_type'] ?? ''}
        />

        <UnitEmpty />
        <UnitEmpty />
        <UnitEmpty />

        {readOnly == true ? (
          <UnitRead
            grid={{ sm: 5, xs: 8 }}
            label={fieldLabel.leadOwnerName}
            value={
              !isEmpty(data?.parties_lead_owner_id) ? (
                <>
                  <RouteLink
                    url={
                      !isEmpty(data?.parties_lead_owner_id)
                        ? `/opportunities/${data?.id}/parties/${data?.parties_lead_owner_id}/view`
                        : ``
                    }
                    name={data?.parties_lead_owner_name || '-'}
                    target={true}
                  />
                </>
              ) : (
                ''
              )
            }
          />
        ) : (
          <UnitParty
            label={fieldLabel.leadOwnerName}
            type="lead_owner,buyer_representative"
            subType=""
            value={{
              label: data?.parties_lead_owner_name,
              value: data?.parties_lead_owner_id
            }}
            onChange={(val: any) => {
              handleChange({
                parties_lead_owner_name: val?.name || '',
                parties_lead_owner_id: val?.value || '',
                parties_lead_owner_email: val?.email || '',
                parties_lead_owner_type: val?.type || ''
              });

              setField('parties_lead_owner_name');
            }}
            error={valMessages['parties_lead_owner_name'] ?? ''}
            grid={{ sm: 5, xs: 8 }}
            readOnly={readOnly}
          />
        )}

        <UnitItem grid={{ sm: 1, xs: 4 }}>
          <CreateEditLink
            url={
              !isEmpty(data?.parties_lead_owner_id)
                ? `/opportunities/${data?.id}/parties/${data?.parties_lead_owner_id}/edit`
                : `/opportunities/${data?.id}/parties/create`
            }
            value={data?.parties_lead_owner_id}
          />
        </UnitItem>

        <UnitLabel label={fieldLabel.commissionOutput} fontWeight="bold" />

        <UnitText
          label={fieldLabel.leadOwnerEmail}
          name="parties_lead_owner_email"
          value={data?.parties_lead_owner_email ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitPercentageFormatter
          name="commission_buyer_source_pct"
          label={`${fieldLabel.buyerSource} (%)`}
          value={calculate('commission_buyer_source_pct')}
          onChange={onChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.leadOwnerType}
          name="parties_lead_owner_type"
          value={data?.parties_lead_owner_type ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitPercentageFormatter
          name="commission_buyer_rep_pct"
          label={`${fieldLabel.didYouRepresenttheBuyer}? (%)`}
          value={calculate('commission_buyer_rep_pct')}
          onChange={onChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitEmpty />
        <UnitEmpty />

        {readOnly == true ? (
          <UnitRead
            grid={{ sm: 5, xs: 8 }}
            label={fieldLabel.buyerRepresentativeName}
            value={
              !isEmpty(data?.parties_buyer_representative_id) ? (
                <>
                  <RouteLink
                    url={
                      !isEmpty(data?.parties_buyer_representative_id)
                        ? `/opportunities/${data?.id}/parties/${data?.parties_buyer_representative_id}/view`
                        : ``
                    }
                    name={data?.parties_buyer_representative_name || '-'}
                    target={true}
                  />
                </>
              ) : (
                ''
              )
            }
          />
        ) : (
          <UnitParty
            label={fieldLabel.buyerRepresentativeName}
            type="lead_owner,buyer_representative"
            subType=""
            value={{
              label: data?.parties_buyer_representative_name || '',
              value: data?.parties_buyer_representative_id || ''
            }}
            onChange={(val: any) => {
              handleChange({
                parties_buyer_representative_name: val?.name || '',
                parties_buyer_representative_id: val?.value || '',
                parties_buyer_representative_email: val?.email || '',
                parties_buyer_representative_type: val?.type || ''
              });
              setField('parties_buyer_representative_name');
            }}
            error={valMessages['parties_buyer_representative_name'] ?? ''}
            grid={{ sm: 5, xs: 8 }}
            readOnly={readOnly}
          />
        )}

        <UnitItem grid={{ sm: 1, xs: 4 }}>
          <CreateEditLink
            url={
              !isEmpty(data?.parties_buyer_representative_id)
                ? `/opportunities/${data?.id}/parties/${data?.parties_buyer_representative_id}/edit`
                : `/opportunities/${data?.id}/parties/create`
            }
            value={data?.parties_buyer_representative_id}
          />
        </UnitItem>

        <UnitPercentageFormatter
          name="commission_seller_source_pct"
          label={`${fieldLabel.sellerSource} (%)`}
          value={calculate('commission_seller_source_pct')}
          onChange={onChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.buyerRepresentativeEmail}
          name="parties_buyer_representative_email"
          value={data?.parties_buyer_representative_email ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
        />

        <UnitPercentageFormatter
          name="commission_seller_rep_pct"
          label={`${fieldLabel.doesTheSellerHaveOutSideRepresentation}? (%)`}
          value={calculate('commission_seller_rep_pct')}
          onChange={(e: any) => {}}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.buyerRepresentativeType}
          name="parties_buyer_representative_type"
          value={
            data?.parties_buyer_representative_type
              ? valueToLabel(data?.parties_buyer_representative_type)
              : ''
          }
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitPercentageFormatter
          name="commission_negotiator_commission_pct"
          label={fieldLabel.negotiatorTakeOfCommission}
          value={calculate('commission_negotiator_commission_pct')}
          onChange={(e: any) => {}}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitPriceFormatter
          name="commission_negotiator_commission_amount"
          value={calculate('commission_negotiator_commission_amount')}
          onChange={(e: any) => {}}
          label={fieldLabel.yourCommission}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitEmpty />
        <UnitEmpty />

        {readOnly == true ? (
          <UnitRead
            grid={{ sm: 5, xs: 8 }}
            label={fieldLabel.intendedBuyerName}
            value={
              !isEmpty(data?.parties_intended_buyer_id) ? (
                <>
                  <RouteLink
                    url={
                      !isEmpty(data?.parties_intended_buyer_id)
                        ? `/opportunities/${data?.id}/parties/${data?.parties_intended_buyer_id}/view`
                        : ``
                    }
                    name={data?.parties_intended_buyer_name || '-'}
                    target={true}
                  />
                </>
              ) : (
                ''
              )
            }
          />
        ) : (
          <UnitParty
            label={fieldLabel.intendedBuyerName}
            type="intended_buyer"
            subType=""
            value={{
              label: data?.parties_intended_buyer_name,
              value: data?.parties_intended_buyer_id
            }}
            onChange={(val: any) => {
              handleChange(
                {
                  parties_intended_buyer_name: val?.name || '',
                  parties_intended_buyer_id: val?.value || '',
                  parties_intended_buyer_email: val?.email || '',
                  parties_intended_buyer_type: val?.type || ''
                },
                'parties_intended_buyer_name'
              );
            }}
            error={valMessages['parties_intended_buyer_name'] ?? ''}
            grid={{ sm: 5, xs: 8 }}
            readOnly={readOnly}
          />
        )}

        <UnitItem grid={{ sm: 1, xs: 4 }}>
          <CreateEditLink
            url={
              !isEmpty(data?.parties_intended_buyer_id)
                ? `/opportunities/${data?.id}/parties/${data?.parties_intended_buyer_id}/edit`
                : `/opportunities/${data?.id}/parties/create`
            }
            value={data?.parties_intended_buyer_id}
          />
        </UnitItem>

        <UnitEmpty />

        <UnitText
          label={fieldLabel.intendedBuyerEmail}
          name="parties_intended_buyer_email"
          value={data?.parties_intended_buyer_email ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitText
          label={fieldLabel.intendedBuyerType}
          name="parties_intended_buyer_type"
          value={data?.parties_intended_buyer_type ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
          error={valMessages['parties_intended_buyer_type'] ?? ''}
        />

        <UnitEmpty />
        <UnitEmpty />
        <UnitEmpty />

        {readOnly ? (
          <UnitRead
            grid={{ sm: 5, xs: 8 }}
            label={fieldLabel.uploadedByName}
            value={
              !isEmpty(data?.parties_uploaded_by_id) ? (
                <>
                  <RouteLink
                    url={
                      !isEmpty(data?.parties_uploaded_by_id)
                        ? `/opportunities/${data?.id}/parties/${data?.parties_uploaded_by_id}/view`
                        : ``
                    }
                    name={data?.parties_uploaded_by_name || '-'}
                    target={true}
                  />
                </>
              ) : (
                ''
              )
            }
          />
        ) : (
          <UnitParty
            label={fieldLabel.uploadedByName}
            type="uploaded_by"
            subType=""
            value={{
              label: data?.parties_uploaded_by_name,
              value: data?.parties_uploaded_by_id
            }}
            onChange={(val: any) => {
              handleChange(
                {
                  parties_uploaded_by_name: val?.name || '',
                  parties_uploaded_by_id: val?.value || '',
                  parties_uploaded_by_email: val?.email || '',
                  parties_uploaded_by_type: val?.type || ''
                },
                'parties_uploaded_by_name'
              );
            }}
            error={valMessages['parties_uploaded_by_name'] ?? ''}
            grid={{ sm: 5, xs: 8 }}
            readOnly={readOnly}
          />
        )}

        <UnitItem grid={{ sm: 1, xs: 4 }}>
          <CreateEditLink
            url={
              !isEmpty(data?.parties_uploaded_by_id)
                ? `/opportunities/${data?.id}/parties/${data?.parties_uploaded_by_id}/edit`
                : `/opportunities/${data?.id}/parties/create`
            }
            value={data?.parties_uploaded_by_id}
          />
        </UnitItem>

        <UnitEmpty />

        <UnitText
          label={fieldLabel.uploadedByEmail}
          name="parties_uploaded_by_email"
          value={data?.parties_uploaded_by_email ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
          error={valMessages['parties_uploaded_by_email'] ?? ''}
        />

        <UnitEmpty />

        <UnitText
          label={fieldLabel.uploadedByType}
          name="parties_uploaded_by_type"
          value={data?.parties_uploaded_by_type ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
          error={valMessages['parties_uploaded_by_type'] ?? ''}
        />
      </FormContainer>
    </>
  );
};

export default OffMarketRecordView;
