import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import fieldLabel from 'assets/constants/fieldLabel';
import mlsStatuList from 'assets/constants/mls-status-list';
import oppurtunityStatusOptions from 'assets/constants/oppurtunity-status-options';
import sellerResponseList from 'assets/constants/seller-response-list';
import RouteLink from 'components/link/route-link';
import HoverableAction from 'features/dashboards/action/action';
import DateUtility from 'helpers/date-helper';

export const currencyFormatter = (value: any) => {
  let nf = new Intl.NumberFormat('en-US');
  return nf.format(value);
};

const oppurtuniyColumn: GridColDef[] = [
  {
    headerName: fieldLabel.action,
    field: 'action',
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => (
      <HoverableAction data={row} />
    ),
    minWidth: 120
  },
  {
    headerName: fieldLabel.closingName,
    field: 'name',
    sortable: true,
    renderCell: ({ row }: GridRenderCellParams) => (
      <RouteLink url={`/opportunities/${row?.id}/view`} name={row.name} />
    ),
    minWidth: 150
  },
  {
    headerName: fieldLabel.account,
    field: 'account',
    sortable: true,
    renderCell: ({ row }: GridRenderCellParams) => (
      <span>{row.account?.name || 'NA'}</span>
    ),
    minWidth: 150
  },
  {
    headerName: fieldLabel.msa,
    field: 'market',
    sortable: true,
    renderCell: ({ row }: GridRenderCellParams) => (
      <span>{row.market?.name || 'NA'}</span>
    ),
    minWidth: 100
  },
  {
    headerName: fieldLabel.enteraOpportunitId,
    field: 'entera_opportunity_id',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.buyerContractName,
    field: 'buyer_contract_name_c',
    sortable: false,
    flex: 1,
    minWidth: 175
  },
  {
    headerName: fieldLabel.stateOfClosing,
    field: 'opportunity_status_c',
    sortable: true,
    renderCell: ({ row }: GridRenderCellParams) => (
      <span>{oppurtunityStatusOptions[row.opportunity_status_c]}</span>
    ),
    minWidth: 185
  },
  {
    headerName: fieldLabel.primaryNegotiator,
    field: 'primary_negotiator_name',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.mls,
    field: 'mls_c',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.mlsStatus,
    field: 'mls_status_c',
    sortable: false,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => (
      <span>{mlsStatuList[row.mls_status_c] || row.mls_status_c}</span>
    ),
    minWidth: 150
  },
  {
    headerName: fieldLabel.listDate,
    field: 'list_date_c',
    sortable: true,
    flex: 0.5,
    valueGetter: (params: GridRenderCellParams) => {
      return DateUtility.getDateString(params.row.list_date_c);
    },
    minWidth: 150
  },
  {
    headerName: fieldLabel.offerFinalizedAt,
    field: 'offer_finalized_at',
    sortable: true,
    flex: 0.5,
    valueGetter: (params: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(params.row.offer_finalized_at);
    },
    minWidth: 150
  },
  {
    headerName: fieldLabel.closeDate,
    field: 'close_date_c',
    sortable: true,
    flex: 0.5,
    valueGetter: (params: GridRenderCellParams) => {
      return DateUtility.getDateString(params.row.close_date_c);
    },
    minWidth: 150
  },
  {
    headerName: fieldLabel.contractExecutionDate,
    field: 'contract_execution_date_c',
    sortable: true,
    flex: 0.5,
    valueGetter: (params: GridRenderCellParams) => {
      return DateUtility.getDateString(params.row.contract_execution_date_c);
    },
    minWidth: 150
  },
  {
    headerName: fieldLabel.dueDiligenceDate,
    field: 'due_diligence_end_c',
    sortable: true,
    flex: 0.5,
    valueGetter: (params: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(params.row.due_diligence_end_c);
    },
    minWidth: 150
  },
  {
    headerName: fieldLabel.listPrice,
    field: 'list_price_c',
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => (
      <span>$ {currencyFormatter(row.list_price_c)}</span>
    ),
    flex: 0.5,
    minWidth: 150
  },
  {
    headerName: fieldLabel.revisedListPrice,
    field: 'revised_list_price_c',
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => (
      <span>$ {currencyFormatter(row.revised_list_price_c)}</span>
    ),
    flex: 0.5,
    minWidth: 150
  },
  {
    headerName: fieldLabel.offerPrice,
    field: 'offer_price_c',
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => (
      <span>$ {currencyFormatter(row.offer_price_c)}</span>
    ),
    flex: 0.5,
    minWidth: 150
  },
  {
    headerName: fieldLabel.offerToList,
    field: 'offer_to_list_c',
    sortable: true,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.offerDate,
    field: 'offer_date_c',
    sortable: true,
    flex: 0.5,
    valueGetter: (params: GridRenderCellParams) => {
      return DateUtility.getDateString(params.row.offer_date_c);
    },
    minWidth: 150
  },
  {
    headerName: fieldLabel.rejectReason,
    field: 'reject_reason',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.counterOffer,
    field: 'counter_offer',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.sellerResponse,
    field: 'seller_offer_response',
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => (
      <span>
        {sellerResponseList[row.seller_offer_response] ||
          row.seller_offer_response}
      </span>
    ),
    minWidth: 150
  },
  {
    headerName: fieldLabel.nextSellerContactDate,
    field: 'next_seller_contact_date',
    sortable: true,
    flex: 0.5,
    valueGetter: (params: GridRenderCellParams) => {
      return DateUtility.getDateString(params.row.next_seller_contact_date);
    },
    minWidth: 150
  },
  {
    headerName: fieldLabel.cancelReason,
    field: 'cancel_reason',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.customerAcceptedStatusVerified,
    field: 'customer_accepted_status_verified',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.earnestAmount,
    field: 'earnest_amount_c',
    sortable: false,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => (
      <span>$ {currencyFormatter(row.earnest_amount_c || '0')}</span>
    ),
    minWidth: 150
  },
  {
    headerName: fieldLabel.earnestAmountStatus,
    field: 'earnest_money_status_c',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.earnestMoneyDueDate,
    field: 'earnest_money_due_date_c',
    sortable: true,
    flex: 0.5,
    valueGetter: (params: GridRenderCellParams) => {
      return DateUtility.getDateString(params.row.earnest_money_due_date_c);
    },
    minWidth: 150
  },
  {
    headerName: fieldLabel.escrowCompanyName,
    field: 'escrow_company_name_c',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.escrowCompanyContact,
    field: 'escrow_company_contact_c',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.congratsLetterSentDate,
    field: 'congrats_letter_sent_date',
    sortable: true,
    flex: 0.5,
    valueGetter: (params: GridRenderCellParams) => {
      return DateUtility.getDateString(params.row.congrats_letter_sent_date);
    },
    minWidth: 150
  },
  {
    headerName: fieldLabel.congratsLetterSentBy,
    field: 'congrats_letter_sent_by',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.listAgentName,
    field: 'list_agent_name',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.listAgentEmail,
    field: 'list_agent_email',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.listAgentPhone,
    field: 'list_agent_phone',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.maxOfferPrice,
    field: 'max_offer_price_c',
    sortable: false,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => (
      <span>$ {currencyFormatter(row.max_offer_price_c || '0')}</span>
    ),
    minWidth: 150
  },
  {
    headerName: fieldLabel.dateEntered,
    field: 'date_entered',
    sortable: false,
    flex: 0.5,
    valueGetter: (params: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(params.row.date_entered);
    },
    minWidth: 150
  },
  {
    headerName: fieldLabel.contractPrice,
    field: 'contract_price_c',
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => (
      <span>$ {currencyFormatter(row.contract_price_c || '0')}</span>
    ),
    minWidth: 150
  },
  {
    headerName: fieldLabel.negotiationNotes,
    field: 'latest_negotiator_note',
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => (
      <span>{row.negotiator_notes?.name ?? ''}</span>
    ),
    minWidth: 150
  },
  {
    headerName: fieldLabel.forecastedCloseDate,
    field: 'forecasted_close_date',
    sortable: true,
    flex: 0.5,
    valueGetter: (params: GridRenderCellParams) => {
      return DateUtility.getDateString(params.row.forecasted_close_date);
    },
    minWidth: 150
  },
  {
    headerName: fieldLabel.optionAmount,
    field: 'option_amount_c',
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => (
      <span>$ {currencyFormatter(row.option_amount_c || '0')}</span>
    ),
    minWidth: 150
  },
  {
    headerName: fieldLabel.optionDeliveryDate,
    field: 'option_fee_delivery_date_c',
    sortable: true,
    flex: 0.5,
    valueGetter: (params: GridRenderCellParams) => {
      return DateUtility.getDateString(params.row.option_fee_delivery_date_c);
    },
    minWidth: 150
  },
  {
    headerName: fieldLabel.contractReviewComplete,
    field: 'contract_review_complete',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.dateModified,
    field: 'date_modified',
    sortable: true,
    flex: 0.5,
    valueGetter: (params: GridRenderCellParams) => {
      return DateUtility.getDateTimeString(params.row.date_modified);
    },
    minWidth: 150
  },
  {
    headerName: fieldLabel.closingAttorney,
    field: 'closing_attorney',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.sellerDisclosureReceived,
    field: 'sellers_disclosure_received',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.specialInstructions,
    field: 'special_instructions',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.contractTerminatedDate,
    field: 'contract_terminated_date',
    sortable: true,
    flex: 0.5,
    valueGetter: (params: GridRenderCellParams) => {
      return DateUtility.getDateString(params.row.contract_terminated_date);
    },
    minWidth: 150
  },
  {
    headerName: fieldLabel.initialCommission,
    field: 'initial_commission_amount',
    sortable: false,
    flex: 1,
    minWidth: 150
  },
  {
    headerName: fieldLabel.contractTerminatedReasons,
    field: 'contract_termination_reasons',
    sortable: false,
    flex: 1,
    minWidth: 150
  }
];

export default oppurtuniyColumn;
