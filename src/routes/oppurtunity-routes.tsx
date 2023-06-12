import UploadDocuments from 'features/document-upload';
import AcceptOffer from 'features/brokerage-actions/accept-offer';
import BuyerCounterOfferConfirmation from 'features/brokerage-actions/buyer-counter-offer-confirmation';
import CancelOffer from 'features/brokerage-actions/cancel-offer';
import ClearDueDiligence from 'features/brokerage-actions/clear-due-diligence';
import ClientChat from 'features/brokerage-actions/client-chat';
import CounterOffer from 'features/brokerage-actions/counter-offer';
import DueDiligenceFees from 'features/brokerage-actions/due-diligence-fees';
import EnterDueDiligence from 'features/brokerage-actions/enter-due-diligence';
import ExtensionConfirmation from 'features/brokerage-actions/extension-confirmation';
import ExtensionRequest from 'features/brokerage-actions/extension-request';
import NegotiatorNotes from 'features/brokerage-actions/negotiator-notes';
import OptionEarnestFeeStatus from 'features/brokerage-actions/option-earnest-fee-status';
import RejectOffer from 'features/brokerage-actions/reject-offer';
import RetradeComplete from 'features/brokerage-actions/retrade-complete';
import RetradeRequest from 'features/brokerage-actions/retrade-request';
import TerminationApproval from 'features/brokerage-actions/termination-approval';
import TerminationRequest from 'features/brokerage-actions/termination-request';
import TransactionNotes from 'features/brokerage-actions/transaction-notes';
import BrokerageNotes from 'features/dashboards/brokerage-notes';
import DocumentList from 'features/documents/document-list';
import ComposeEmail from 'features/email2/compose';
import Draft from 'features/email2/email-draft';
import EditOppurtunity from 'features/opportunity/edit-oppurtunity';
import ViewOppurtunity from 'features/opportunity/view-oppurtunity';
import CreateParties from 'features/parties/party-create';
import PartiesList from 'features/parties/party-list';
import CreateService from 'features/services/service-create';
import ServiceList from 'features/services/service-list';
import Actions from 'pages/opportunity/actions';
import Inbox from 'features/email2/email-inbox';
import OpportunityBrokerageUsersList from 'features/opportunity-brokerage-users/opportunity-brokerage-users-list';
import OpportunityBrokerageUserView from 'features/opportunity-brokerage-users/opportunity-brokerage-user-view';
import SQSList from 'features/sqs/sqs-list';
import SQSView from 'features/sqs/sqs-view';
import TransactionHistoriesList from 'features/transaction-history/transaction-history-list';
import TransactionHistoryView from 'features/transaction-history/transaction-history-view';
import OpportunityBrokerageUserCreate from 'features/opportunity-brokerage-users/opportunity-brokerage-user-create';
import PartyView from 'features/parties/party-view';
import CallsList from 'features/calls/calls-list';
import TasksList from 'features/tasks/tasks-list';
import SQSCreate from 'features/sqs/sqs-create';
import ServiceView from 'features/services/service-view';
import PDFTemplatesList from 'features/pdf-template/pdf-template-list';
import EmailView from 'features/email2/email-view';
import OpportunityViewChangelog from 'features/opportunity/opportunity-change-log';
import OpportunityPage from 'pages/opportunity';
import EmailThread from 'features/email2/email-thread';

const opportunityRoutes = {
  path: 'opportunities/:opportunity_id',
  element: <OpportunityPage />,
  children: [
    {
      path: 'view',
      element: <ViewOppurtunity routeTag="opportunities-view" />
    },
    {
      path: 'edit',
      element: <EditOppurtunity routeTag="opportunities-edit" />
    },
    {
      path: 'documents/list',
      element: <DocumentList routeTag="opportunities-documents" />
    },
    {
      path: 'documents/upload',
      element: (
        <UploadDocuments
          routeTag="opportunities-documents-upload"
          action="edit-view"
        />
      )
    },
    {
      path: 'email/compose',
      element: (
        <ComposeEmail
          routeTag="opportunities-emails-compose"
          key="compose-email"
        />
      )
    },
    {
      path: 'email/inbox',
      element: <Inbox routeTag="opportunities-emails-inbox" />
    },
    {
      path: 'email/inbox/:email_id',
      element: <EmailView routeTag="opportunities-emails-view" />
    },
    {
      path: 'email/inbox/thread/:thread_id',
      element: <EmailThread />
    },
    {
      path: 'email/draft/thread/:thread_id',
      element: <EmailThread />
    },
    {
      path: 'email/inbox/thread/:thread_id/reply',
      element: (
        <ComposeEmail
          routeTag="opportunities-emails-compose"
          key="compose-reply"
        />
      )
    },
    {
      path: 'email/draft',
      element: <Draft routeTag="opportunities-emails-draft" />
    },
    {
      path: 'email/draft/:email_id',
      element: <ComposeEmail routeTag="opportunities-emails-draft-thread" />
    },
    {
      path: 'services/list',
      element: <ServiceList routeTag="opportunities-services-list" />
    },
    {
      path: 'services/create',
      element: (
        <CreateService key="create" routeTag="opportunities-services-create" />
      )
    },
    {
      path: 'services/:service_id/edit',
      element: (
        <CreateService key="edit" routeTag="opportunities-services-edit" />
      )
    },
    {
      path: 'services/:service_id/view',
      element: <ServiceView routeTag="opportunities-services-view" />
    },
    {
      path: 'notes_chats/negotiator_notes',
      element: <NegotiatorNotes routeTag="opportunities-negotiator-notes" />
    },
    {
      path: 'notes_chats/transaction_notes',
      element: <TransactionNotes routeTag="opportunities-transaction-notes" />
    },
    {
      path: 'notes_chats/brokerage_notes',
      element: <BrokerageNotes routeTag="opportunities-brokerage-notes" />
    },
    {
      path: 'notes_chats/client_chats',
      element: <ClientChat routeTag="opportunities-client-chat" />
    },
    {
      path: 'opportunity-brokerage-users/list',
      element: (
        <OpportunityBrokerageUsersList routeTag="opportunities-brokerage-users-list" />
      )
    },
    {
      path: 'opportunity-brokerage-users/:opportunity_brokerage_user_id/view',
      element: (
        <OpportunityBrokerageUserView routeTag="opportunities-brokerage-users-view" />
      )
    },
    {
      path: 'opportunity-brokerage-users/create',
      element: (
        <OpportunityBrokerageUserCreate routeTag="opportunities-brokerage-users-create" />
      )
    },
    {
      path: 'opportunity-brokerage-users/:opportunity_brokerage_user_id/edit',
      element: (
        <OpportunityBrokerageUserCreate routeTag="opportunities-brokerage-users-edit" />
      )
    },
    {
      path: 'sqs/list',
      element: <SQSList routeTag="opportunities-sqs-list" />
    },
    {
      path: 'sqs/:sqs_id/edit',
      element: <SQSCreate routeTag="opportunities-sqs-edit" key="edit" />
    },
    {
      path: 'sqs/:sqs_id/view',
      element: <SQSView routeTag="opportunities-sqs-view" />
    },
    {
      path: 'transaction-histories/list',
      element: (
        <TransactionHistoriesList routeTag="opportunities-transaction-histories-list" />
      )
    },
    {
      path: 'transaction-histories/:transaction_history_id/view',
      element: (
        <TransactionHistoryView routeTag="opportunities-transaction-histories-view" />
      )
    },
    {
      path: 'calls/list',
      element: <CallsList routeTag="opportunities-calls-list" />
    },
    {
      path: 'tasks/list',
      element: <TasksList routeTag="opportunities-tasks-list" />
    },
    {
      path: 'generate_contract',
      element: <PDFTemplatesList routeTag="opportunities-contracts" />
    },
    {
      path: 'view_changelog',
      element: (
        <OpportunityViewChangelog routeTag="opportunities-view-change-log" />
      )
    },
    {
      path: 'actions',
      element: <Actions />,
      children: [
        {
          path: 'cancel_opportunity',
          element: <CancelOffer routeTag="opportunities-cancel-offer" />
        },
        {
          path: 'reject_opportunity',
          element: <RejectOffer routeTag="opportunities-reject-offer" />
        },
        {
          path: 'opportunity_action_counter_offer',
          element: <CounterOffer routeTag="opportunities-counter-offer" />
        },
        {
          path: 'buyer_counter_offer_confirmation',
          element: (
            <BuyerCounterOfferConfirmation routeTag="opportunities-buyer-counter-offer-confirmation" />
          )
        },
        {
          path: 'execute_contract',
          element: <AcceptOffer routeTag="opportunities-accept-offer" />
        },
        {
          path: 'option_earnest_fee_status',
          element: (
            <OptionEarnestFeeStatus routeTag="opportunities-option-earnest-fee-status" />
          )
        },
        {
          path: 'extension_request',
          element: (
            <ExtensionRequest routeTag="opportunities-extension-request" />
          )
        },
        {
          path: 'termination_request',
          element: (
            <TerminationRequest routeTag="opportunities-termination-request" />
          )
        },
        {
          path: 'termination_approval',
          element: (
            <TerminationApproval routeTag="opportunities-termination-approval" />
          )
        },
        {
          path: 'retrade_approval',
          element: <RetradeComplete routeTag="opportunities-retrade-approval" />
        },
        {
          path: 'request_price_adjustment',
          element: (
            <RetradeRequest routeTag="opportunities-request-price-adjustment" />
          )
        },
        {
          path: 'clear_due_diligence',
          element: (
            <ClearDueDiligence routeTag="opportunities-clear-due-diligence" />
          )
        },
        {
          path: 'due_diligence_fees',
          element: (
            <DueDiligenceFees routeTag="opportunities-due-diligence-fees" />
          )
        },
        {
          path: 'due_diligence_opportunity',
          element: (
            <EnterDueDiligence routeTag="opportunities-due-diligence-opportunity" />
          )
        },
        {
          path: 'extension_confirmation',
          element: (
            <ExtensionConfirmation routeTag="opportunities-extension-confirmation" />
          )
        }
      ]
    },
    {
      path: 'parties/list',
      element: <PartiesList routeTag="opportunities-parties-list" />
    },
    {
      path: 'parties/create',
      element: <CreateParties routeTag="opportunities-parties-create" />
    },
    {
      path: 'parties/:party_id/view',
      element: <PartyView routeTag="opportunities-parties-view" />
    },
    {
      path: 'parties/:party_id/edit',
      element: <CreateParties routeTag="opportunities-parties-edit" />
    }
  ]
};

export default opportunityRoutes;
