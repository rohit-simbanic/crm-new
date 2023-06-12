import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';
import { OpportunityContext } from 'pages/opportunity/Context';
import CallIcon from '@mui/icons-material/Call';
import customerBrokerage from 'assets/constants/customer-brokerage';
import customerBrokerName from 'assets/constants/customer-broker-name';
import emptyFunction from 'helpers/empty-function-helper';
import eventBus from 'helpers/event-bus-helper';
import fieldLabel from 'assets/constants/fieldLabel';
import FormContainer from 'components/form/container';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import OpportunityCall from 'features/opportunity-call';
import React, { useContext } from 'react';
import RouteCreateIconLink from 'components/link/route-create-icon-link';
import RouteEditIconLink from 'components/link/route-edit-icon-link';
import RouteLink from 'components/link/route-link';
import TenantEdit from '../partial-edit/tenant-edit';
import UnitBrokerageUser from 'components/form/unit-brokerage-user';
import UnitEmpty from 'components/form/unit-empty';
import UnitItem from 'components/form/unit-item';
import UnitLabel from 'components/form/unit-label';
import UnitParty from 'components/form/unit-party';
import UnitPercentageFormatter from 'components/form/unit-percentage-formatter';
import UnitRead from 'components/form/unit-read';
import UnitSelect from 'components/form/unit-select';
import UnitSwitch from 'components/form/unit-switch';
import UnitText from 'components/form/unit-text';
import {
  isUserAdmin,
  isUserBrokerageOperationManager
} from 'helpers/user-role-helper';
import UnitDateTime from 'components/form/unit-date-time';

interface recordViewType {
  oppurtunity: ObjectType;
  oldOppurtunity: ObjectType;
  updateOpportunity: ObjectType;
  validation?: ObjectType;
  onChange?: (e: any) => any;
  readOnly?: boolean;
  setField?: (e: any) => any;
}

const ContactInformationRecordView = ({
  oppurtunity,
  oldOppurtunity,
  updateOpportunity,
  validation,
  readOnly = false,
  onChange,
  setField
}: recordViewType) => {
  let handleChange = onChange ?? emptyFunction;
  let valMessages = validation ?? {};

  const data: ObjectType = readOnly ? oldOppurtunity : oppurtunity;
  const { marketPreference } = useContext(OpportunityContext);

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
        <UnitText
          label={fieldLabel.listBrokerName}
          name="list_agent_broker_name_c"
          value={data?.list_agent_broker_name_c ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        {readOnly ? (
          <UnitRead
            grid={{ sm: 5, xs: 8 }}
            label={fieldLabel.escrowContact}
            value={
              !isEmpty(data?.parties_escrow_company_id) ? (
                <>
                  <RouteLink
                    url={
                      !isEmpty(data?.parties_escrow_company_id)
                        ? `/opportunities/${data?.id}/parties/${data?.parties_escrow_company_id}/view`
                        : ``
                    }
                    name={data?.escrow_company_contact_c || '-'}
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
            label={fieldLabel.escrowContact}
            type="escrow"
            subType=""
            value={{
              label: data?.escrow_company_contact_c || '',
              value: data?.parties_escrow_company_id || ''
            }}
            onChange={(val: any) => {
              handleChange({
                parties_escrow_company_id: val?.value || '',
                escrow_company_name_c: val?.company || '',
                escrow_company_contact_c: val?.name || '',
                escrow_company_email_c: val?.email || '',
                escrow_company_phone_c: val?.mobile || '',
                escrow_company_address_c: val?.address || ''
              });
            }}
            error={valMessages['escrow_company_contact_c'] ?? ''}
            grid={{ sm: 5, xs: 8 }}
            readOnly={readOnly}
          />
        )}

        <UnitItem grid={{ sm: 1, xs: 4 }}>
          <CreateEditLink
            url={
              !isEmpty(data?.parties_escrow_company_id)
                ? `/opportunities/${data?.id}/parties/${data?.parties_escrow_company_id}/edit`
                : `/opportunities/${data?.id}/parties/create`
            }
            value={data?.parties_escrow_company_id}
          />
        </UnitItem>

        <UnitText
          label={fieldLabel.listBrokerAddress}
          name="list_broker_address_c"
          value={data?.list_broker_address_c ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.escrowCompany}
          name="escrow_company_name_c"
          value={data?.escrow_company_name_c ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.brokerageLicense}
          name="list_brokerage_license"
          value={data?.list_brokerage_license ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.escrowEmail}
          name="escrow_company_email_c"
          value={data?.escrow_company_email_c ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        {readOnly ? (
          <UnitRead
            grid={{ sm: 5, xs: 8 }}
            label={fieldLabel.listingAgent}
            value={
              !isEmpty(data?.parties_listing_agent_id) ? (
                <>
                  <RouteLink
                    url={
                      !isEmpty(data?.parties_listing_agent_id)
                        ? `/opportunities/${data?.id}/parties/${data?.parties_listing_agent_id}/view`
                        : ``
                    }
                    name={data?.parties_listing_agent_name || '-'}
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
            label={fieldLabel.listingAgent}
            type="seller_representative"
            subType="listing_agent"
            value={{
              label: data?.parties_listing_agent_name || '',
              value: data?.parties_listing_agent_id || ''
            }}
            onChange={(val: any) => {
              handleChange({
                parties_listing_agent_name: val?.name || '',
                parties_listing_agent_id: val?.value || '',
                list_agent_broker_name_c: val?.company || '',
                list_broker_address_c: val?.address || '',
                list_brokerage_license: val?.brokerage_license || '',
                list_agent_email_c: val?.email || '',
                list_agent_phone_c: val?.mobile || '',
                listing_agent_license_number_c: val?.license || ''
              });
            }}
            error={valMessages['parties_listing_agent_name'] ?? ''}
            grid={{ sm: 5, xs: 8 }}
            readOnly={readOnly}
          />
        )}

        <UnitItem grid={{ sm: 1, xs: 4 }}>
          <CreateEditLink
            url={
              !isEmpty(data?.parties_listing_agent_id)
                ? `/opportunities/${data?.id}/parties/${data?.parties_listing_agent_id}/edit`
                : `/opportunities/${data?.id}/parties/create`
            }
            value={data?.parties_listing_agent_id}
          />
        </UnitItem>

        <UnitText
          label={fieldLabel.escrowPhone}
          name="escrow_company_phone_c"
          value={data?.escrow_company_phone_c ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.listAgentEmail}
          name="list_agent_email_c"
          value={data?.list_agent_email_c ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.escrowAddress}
          name="escrow_company_address_c"
          value={data?.escrow_company_address_c ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.listAgentPhone}
          name="list_agent_phone_c"
          value={data?.list_agent_phone_c ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
          grid={{ sm: 5, xs: 8 }}
        />

        <UnitItem grid={{ sm: 1, xs: 4 }}>
          {marketPreference.enable_call_from_cts &&
          !isEmpty(data?.parties_listing_agent_id) &&
          !isEmpty(data?.list_agent_phone_c) ? (
            <CallIcon
              color="primary"
              cursor={'pointer'}
              onClick={() => {
                eventBus.dispatch('toggle_opportunity_call', {});
              }}
            />
          ) : (
            ''
          )}
        </UnitItem>

        <UnitPercentageFormatter
          name="escrow_percent"
          label={fieldLabel.escrowPercent}
          value={data?.escrow_percent}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.listingAgentLicense}
          name="listing_agent_license_number_c"
          value={data?.listing_agent_license_number_c ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.closingAttorney}
          name="closing_attorney"
          value={data?.closing_attorney ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.licensedSupervisorOfListingAssociate}
          name="licensed_supervisor_of_listing_associate"
          value={data?.licensed_supervisor_of_listing_associate ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.closingAttorneyContact}
          name="closing_attorney_contract"
          value={data?.closing_attorney_contract ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.licensedSupervisorLicenseNumber}
          name="license_supervisor_license_number"
          value={data?.license_supervisor_license_number ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.closingAttorneyEmail}
          name="closing_attorney_email"
          value={data?.closing_attorney_email ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitText
          label={fieldLabel.closingAttorneyPhone}
          name="closing_attorney_phone"
          value={data?.closing_attorney_phone ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        {readOnly ? (
          <UnitRead
            grid={{ sm: 5, xs: 8 }}
            label={fieldLabel.coListAgent}
            value={
              !isEmpty(data?.parties_co_listing_agent_id) ? (
                <>
                  <RouteLink
                    url={
                      !isEmpty(data?.parties_co_listing_agent_id)
                        ? `/opportunities/${data?.id}/parties/${data?.parties_co_listing_agent_id}/view`
                        : ``
                    }
                    name={data?.parties_co_listing_agent_name || '-'}
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
            label={fieldLabel.coListAgent}
            type="seller_representative"
            subType="co_listing_agent"
            value={{
              label: data?.parties_co_listing_agent_name || '',
              value: data?.parties_co_listing_agent_id || ''
            }}
            onChange={(val: any) => {
              handleChange({
                parties_co_listing_agent_name: val?.name || '',
                parties_co_listing_agent_id: val?.value || '',
                parties_co_listing_agent_email: val?.email || '',
                parties_co_listing_agent_phone: val?.mobile || ''
              });
            }}
            grid={{ sm: 5, xs: 8 }}
            readOnly={readOnly}
          />
        )}

        <UnitItem grid={{ sm: 1, xs: 4 }}>
          <CreateEditLink
            url={
              !isEmpty(data?.parties_co_listing_agent_id)
                ? `/opportunities/${data?.id}/parties/${data?.parties_co_listing_agent_id}/edit`
                : `/opportunities/${data?.id}/parties/create`
            }
            value={data?.parties_co_listing_agent_id}
          />
        </UnitItem>

        <UnitText
          label={fieldLabel.closingAttorneyAddress}
          name="closing_attorney_address"
          value={data?.closing_attorney_address ?? ''}
          onChange={handleChange}
          multiline={true}
          rows={4}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.coListAgentEmail}
          name="parties_co_listing_agent_email"
          value={data?.parties_co_listing_agent_email ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        {readOnly ? (
          <UnitRead
            grid={{ sm: 5, xs: 8 }}
            label={fieldLabel.transactionCoordinatorName}
            value={
              !isEmpty(data?.parties_transaction_coordinator_id) ? (
                <>
                  <RouteLink
                    url={
                      !isEmpty(data?.parties_transaction_coordinator_id)
                        ? `/opportunities/${data?.id}/parties/${data?.parties_transaction_coordinator_id}/view`
                        : ``
                    }
                    name={data?.parties_transaction_coordinator_name || '-'}
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
            label={fieldLabel.transactionCoordinatorName}
            type="transaction_coordinator"
            subType=""
            value={{
              label: data?.parties_transaction_coordinator_name || '',
              value: data?.parties_transaction_coordinator_id || ''
            }}
            onChange={(val: any) => {
              handleChange({
                parties_transaction_coordinator_name: val?.name || '',
                parties_transaction_coordinator_id: val?.value || '',
                transaction_coordinator_email: val?.email || ''
              });
            }}
            grid={{ sm: 5, xs: 8 }}
            readOnly={readOnly}
          />
        )}

        <UnitItem grid={{ sm: 1, xs: 4 }}>
          <CreateEditLink
            url={
              !isEmpty(data?.parties_transaction_coordinator_id)
                ? `/opportunities/${data?.id}/parties/${data?.parties_transaction_coordinator_id}/edit`
                : `/opportunities/${data?.id}/parties/create`
            }
            value={data?.parties_transaction_coordinator_id}
          />
        </UnitItem>

        <UnitText
          label={fieldLabel.coListAgentPhone}
          name="parties_co_listing_agent_phone"
          value={data?.parties_co_listing_agent_phone ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.transactionCoordinatorEmail}
          name="transaction_coordinator_email"
          value={data?.transaction_coordinator_email ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        {readOnly == true ? (
          <UnitRead
            label={fieldLabel.offerSubmittedBy}
            value={data?.offer_submitted_user_name}
          />
        ) : (
          <UnitBrokerageUser
            label={fieldLabel.offerSubmittedBy}
            value={{
              value: data?.offer_submitted_by,
              label: data.offer_submitted_user_name
            }}
            onChange={(val: any) => {
              handleChange({
                offer_submitted_user_name: val?.label,
                offer_submitted_by: val?.value
              });
            }}
            readOnly={readOnly}
          />
        )}

        {readOnly == true ? (
          <UnitRead
            label={fieldLabel.saveForSignatureBy}
            value={data?.save_for_singnature_user_name}
          />
        ) : (
          <UnitBrokerageUser
            label={fieldLabel.saveForSignatureBy}
            value={{
              label: data.save_for_singnature_user_name,
              value: data?.save_for_singnature_by
            }}
            onChange={(val: any) => {
              handleChange({
                save_for_singnature_user_name: val?.label,
                save_for_singnature_by: val?.value
              });
            }}
            readOnly={readOnly}
          />
        )}

        {readOnly ? (
          <UnitRead
            grid={{ sm: 5, xs: 8 }}
            label={fieldLabel.sellerName}
            value={
              !isEmpty(data?.seller_id) ? (
                <>
                  <RouteLink
                    url={
                      !isEmpty(data?.seller_id)
                        ? `/opportunities/${data?.id}/parties/${data?.parties_seller_id}/view`
                        : ``
                    }
                    name={data?.seller_name_c}
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
            type="seller"
            subType=""
            value={{
              label: data.seller_name_c || '',
              value: data.seller_id || ''
            }}
            onChange={(val: any) => {
              handleChange({
                seller_name_c: val?.name || '',
                seller_id: val?.value || '',
                seller_email_c: val?.email || '',
                seller_notice_address_c: val?.address || '',
                seller_phone_c: val?.mobile || '',
                seller_name2_c: val?.name_2 || '',
                seller_email: val?.email || '',
                parties_seller_type: val?._type || '',
                parties_seller_sub_type: val?.sub_type || ''
              });
            }}
            error={valMessages['seller_name_c'] ?? ''}
            grid={{ sm: 5, xs: 8 }}
            readOnly={readOnly}
          />
        )}

        <UnitItem grid={{ sm: 1, xs: 4 }}>
          <CreateEditLink
            url={
              !isEmpty(data?.seller_id)
                ? `/opportunities/${data?.id}/parties/${data?.seller_id}/edit`
                : `/opportunities/${data?.id}/parties/create`
            }
            value={data?.seller_id}
          />
        </UnitItem>

        <UnitText
          label={fieldLabel.sellerName2}
          name="seller_name2_c"
          value={data?.seller_name2_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.sellerEmail}
          name="seller_email_c"
          value={data?.seller_email_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.sellerPhone}
          name="seller_phone_c"
          value={data?.seller_phone_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.sellerNoticeAddress}
          name="seller_notice_address_c"
          value={data?.seller_notice_address_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.buyerNoticeAddress}
          name="buyer_notice_address_c"
          value={data?.buyer_notice_address_c ?? ''}
          onChange={handleChange}
          multiline={true}
          rows={4}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.buyerEmail}
          name="buyer_email_c"
          value={data?.buyer_email_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.buyerPhone}
          name="buyer_phone_c"
          value={data?.buyer_phone_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.buyerAttorney}
          name="buyers_attorney_name_c"
          value={data?.buyers_attorney_name_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitRead
          label={fieldLabel.photo}
          value={
            <>
              <RouteLink
                url={data?.photo_c}
                name={data?.photo_c}
                target={true}
              />
            </>
          }
          grid={{ xs: 12, sm: 6 }}
        />

        <UnitText
          label={fieldLabel.marketSignerName}
          name="market_signer_name_c"
          value={data?.market_signer_name_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.marketSignerInitials}
          name="market_signer_initials_c"
          value={data?.market_signer_initials_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.marketSignerName2}
          name="market_signer_name_2_c"
          value={data?.market_signer_name_2_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.marketSignerInitials2}
          name="market_signer_initials_2_c"
          value={data?.market_signer_initials_2_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.repName}
          name="rep_name"
          value={data?.rep_name ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.repEmail}
          name="rep_email"
          value={data?.rep_email ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.repPhone}
          name="rep_phone"
          value={data?.rep_phone ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.repCompany}
          name="rep_company"
          value={data?.rep_company ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.propertyAccessContactName}
          name="property_access_contact_name"
          value={data?.property_access_contact_name ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.propertyAccessContactPhone}
          name="property_access_contact_phone"
          value={data?.property_access_contact_phone ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.propertyAccessContactEmail}
          name="property_access_contact_email"
          value={data?.property_access_contact_email ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.propertyAccessComments}
          name="property_access_comments"
          value={data?.property_access_comments ?? ''}
          onChange={handleChange}
          multiline={true}
          rows={4}
          readOnly={readOnly}
        />

        <UnitSelect
          name="customer_brokerage_c"
          label={fieldLabel.customerBrokerage}
          records={getObjectEntriesAsArray(customerBrokerage)}
          value={data?.customer_brokerage_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitSelect
          name="customer_broker_name_c"
          label={fieldLabel.customerBrokerName}
          records={getObjectEntriesAsArray(customerBrokerName)}
          value={data?.customer_broker_name_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.primaryNegotiator}
          name="active_primary_negotiator_user"
          value={data?.active_primary_negotiator_user ?? ''}
          onChange={handleChange}
          error={valMessages['active_primary_negotiator_user'] ?? ''}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
        />

        <UnitText
          label={fieldLabel.negotiatorAtOfferSent}
          name="nego_at_offer_sent_name"
          value={data?.nego_at_offer_sent_name ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
        />

        <UnitText
          label={fieldLabel.negotiatorAtOfferAcceptance}
          name="nego_at_offer_accept_name"
          value={data?.nego_at_offer_accept_name ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
        />
        <UnitText
          label={fieldLabel.negotiatorAtClosing}
          name="nego_at_closing_name"
          value={data?.nego_at_closing_name ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitItem>
          <TenantEdit
            oppurtunity={data}
            handleChange={handleChange}
            updateOpportunity={updateOpportunity}
            readOnly={true}
          />
        </UnitItem>

        <UnitEmpty />
        {readOnly == true ? (
          <UnitRead
            label={fieldLabel.benefittingNegotiator}
            value={data?.benefitting_negotiator_name}
          />
        ) : (
          <UnitBrokerageUser
            label={fieldLabel.benefittingNegotiator}
            value={{
              label: data.benefitting_negotiator_name,
              value: data.benefitting_negotiator_id
            }}
            onChange={(val: any) => {
              handleChange({
                benefitting_negotiator_name: val?.label,
                benefitting_negotiator_id: val?.value
              });
              setField?.('benefitting_negotiator');
            }}
            disabled={
              (isUserAdmin() || isUserBrokerageOperationManager()) === false
            }
            readOnly={readOnly}
          />
        )}
        <UnitEmpty />

        <UnitDateTime
          label={fieldLabel.benefittingNegotiatorChangedAt}
          name="benefitting_negotiator_changed_at"
          value={data?.benefitting_negotiator_changed_at ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitText
          label={fieldLabel.benefittingNegotiatorChangedBy}
          name="benefitting_negotiator_changed_by"
          value={data?.benefitting_negotiator_changed_by_name ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitSwitch
          value={data?.benefitting_negotiator_is_locked ?? 0}
          onChange={handleChange}
          name="benefitting_negotiator_is_locked"
          label={fieldLabel.benefittingNegotiatorIsLocked}
          disabled={
            readOnly ||
            (isUserAdmin() || isUserBrokerageOperationManager()) === false
          }
        />

        <UnitEmpty />

        <UnitText
          label={fieldLabel.primaryTc}
          name="primary_tc_name"
          value={data?.primary_tc_name ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.primaryLogistics}
          name="primary_logistics_name"
          value={data?.primary_logistics_name ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.primaryTcAtDiligencePeriod}
          name="primary_tc_at_diligence_name"
          value={data?.primary_tc_at_diligence_name ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.primaryLogisticsAtDiligencePeriod}
          name="primary_logistics_at_diligence_name"
          value={data?.primary_logistics_at_diligence_name ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.primaryTcAtSalePending}
          name="primary_tc_at_sale_pending_name"
          value={data?.primary_tc_at_sale_pending_name ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.primaryLogisticsAtSalePending}
          name="primary_logistics_at_sale_pending_name"
          value={data?.primary_logistics_at_sale_pending_name ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.primaryTcAtClosing}
          name="primary_tc_at_closing_name"
          value={data?.primary_tc_at_closing_name ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.primaryLogisticsAtClosing}
          name="primary_logistics_at_closing_name"
          value={data?.primary_logistics_at_closing_name ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.brokerRepFirm}
          name="broker_rep_firm"
          value={data?.broker_rep_firm ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.brokerRepFirmLicenseNumber}
          name="broker_rep_firm_license_number"
          value={data?.broker_rep_firm_license_number ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.brokerRepMlsId}
          name="broker_rep_mlsid"
          value={data?.broker_rep_mlsid ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.brokerRepAgentLicenseNumber}
          name="broker_rep_agent_license_number"
          value={data?.broker_rep_agent_license_number ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.brokerRepAgentEmail}
          name="broker_rep_agent_email"
          value={data?.broker_rep_agent_email ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitText
          label={fieldLabel.executedContractEmailTo}
          name="executed_contract_email_to"
          value={data?.executed_contract_email_to ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.preCloseNotificationToRecipient}
          name="pre_close_notification_to_recipient"
          value={data?.pre_close_notification_to_recipient ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.executedContractEmailCc}
          name="executed_contract_email_cc"
          value={data?.executed_contract_email_cc ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.preCloseNotificationCcRecipient}
          name="pre_close_notification_cc_recipient"
          value={data?.pre_close_notification_cc_recipient ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.executedContractEmailBcc}
          name="executed_contract_email_bcc"
          value={data?.executed_contract_email_bcc ?? ''}
          onChange={handleChange}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <OpportunityCall oppurtunity={oldOppurtunity} />
      </FormContainer>
    </>
  );
};

export default ContactInformationRecordView;
