//@ts-nocheck
import BreadcrumbItem from 'components/breadcrumbs/item';
import MuiBreadcrumbs from 'components/breadcrumbs';
import sessionHelper from 'helpers/session-helper';
import OpportunityName from 'features/opportunity-name';
import fieldLabel from 'assets/constants/fieldLabel';
import { v4 as uuid } from 'uuid';

const Breadcrumbs = ({ params }) => {
  let breadcrumbs = [];

  if (params.routeName === 'opportunities-view') breadcrumbs = view(params);

  if (params.routeName === 'opportunities-edit') breadcrumbs = edit(params);

  if (params.routeName === 'opportunities-documents')
    breadcrumbs = documents(params);

  if (params.routeName === 'opportunities-documents-upload')
    breadcrumbs = documentUpload(params);

  if (params.routeName === 'opportunities-services-list')
    breadcrumbs = services(params);

  if (params.routeName === 'opportunities-services-create')
    breadcrumbs = serviceCreate(params);

  if (params.routeName === 'opportunities-services-edit')
    breadcrumbs = serviceEdit(params);

  if (params.routeName === 'opportunities-services-view')
    breadcrumbs = serviceView(params);

  if (params.routeName === 'opportunities-brokerage-users-list')
    breadcrumbs = opportunitiesBrokerageUsers(params);

  if (params.routeName === 'opportunities-brokerage-users-create')
    breadcrumbs = opportunitiesBrokerageUsersCreate(params);

  if (params.routeName === 'opportunities-brokerage-users-edit')
    breadcrumbs = opportunitiesBrokerageUsersEdit(params);

  if (params.routeName === 'opportunities-brokerage-users-view')
    breadcrumbs = opportunitiesBrokerageUsersView(params);

  if (params.routeName === 'opportunities-sqs-list')
    breadcrumbs = opportunitiesSqs(params);

  if (params.routeName === 'opportunities-sqs-edit')
    breadcrumbs = opportunitiesSqsEdit(params);

  if (params.routeName === 'opportunities-sqs-view')
    breadcrumbs = opportunitiesSqsView(params);

  if (params.routeName === 'opportunities-transaction-histories-list')
    breadcrumbs = transactionHistories(params);

  if (params.routeName === 'opportunities-transaction-histories-view')
    breadcrumbs = transactionHistoriesView(params);

  if (params.routeName === 'opportunities-calls-list')
    breadcrumbs = opportunitiesCalls(params);

  if (params.routeName === 'opportunities-tasks-list')
    breadcrumbs = opportunitiesTasks(params);

  if (params.routeName === 'opportunities-contracts')
    breadcrumbs = generateContract(params);

  if (params.routeName === 'opportunities-view-change-log')
    breadcrumbs = opportunityChangelogs(params);

  if (params.routeName === 'opportunities-emails-compose')
    breadcrumbs = opportunitiesComposeEmail(params);

  if (params.routeName === 'opportunities-emails-inbox')
    breadcrumbs = opportunitiesInboxEmail(params);

  if (params.routeName === 'opportunities-emails-draft')
    breadcrumbs = opportunitiesDraftEmail(params);

  if (params.routeName === 'opportunities-emails-view')
    breadcrumbs = opportunitiesViewEmail(params);

  if (params.routeName === 'opportunities-parties-list')
    breadcrumbs = opportunitiesParties(params);

  if (params.routeName === 'opportunities-parties-create')
    breadcrumbs = opportunitiesPartiesCreate(params);

  if (params.routeName === 'opportunities-parties-view')
    breadcrumbs = opportunitiesPartiesView(params);

  if (params.routeName === 'opportunities-parties-edit')
    breadcrumbs = opportunitiesPartiesEdit(params);

  if (params.routeName === 'opportunities-negotiator-notes')
    breadcrumbs = opportunitiesnegotiatorNotes(params);

  if (params.routeName === 'opportunities-transaction-notes')
    breadcrumbs = opportunitiesTransactionNotes(params);

  if (params.routeName === 'opportunities-brokerage-notes')
    breadcrumbs = opportunitiesBrokerageNotes(params);

  if (params.routeName === 'opportunities-client-chat')
    breadcrumbs = opportunitiesClientChat(params);

  if (params.routeName === 'opportunities-emails-draft-thread')
    breadcrumbs = opportunitiesDraftThreadEmail(params);

  if (params.routeName === 'opportunities-cancel-offer')
    breadcrumbs = cancelOfferAction(params);

  if (params.routeName === 'opportunities-reject-offer')
    breadcrumbs = rejectOfferAction(params);

  if (params.routeName === 'opportunities-counter-offer')
    breadcrumbs = counterOfferAction(params);

  if (params.routeName === 'opportunities-buyer-counter-offer-confirmation')
    breadcrumbs = buyerCounterOfferConfirmationAction(params);

  if (params.routeName === 'opportunities-accept-offer')
    breadcrumbs = acceptOfferAction(params);

  if (params.routeName === 'opportunities-option-earnest-fee-status')
    breadcrumbs = optionEarnestFeeStatusAction(params);

  if (params.routeName === 'opportunities-extension-request')
    breadcrumbs = extensionRequestAction(params);

  if (params.routeName === 'opportunities-termination-request')
    breadcrumbs = terminationRequestAction(params);

  if (params.routeName === 'opportunities-termination-approval')
    breadcrumbs = terminationApprovalAction(params);

  if (params.routeName === 'opportunities-retrade-approval')
    breadcrumbs = retradeCompleteAction(params);

  if (params.routeName === 'opportunities-request-price-adjustment')
    breadcrumbs = retradeRequestAction(params);

  if (params.routeName === 'opportunities-clear-due-diligence')
    breadcrumbs = clearDueDiligenceAction(params);

  if (params.routeName === 'opportunities-due-diligence-fees')
    breadcrumbs = dueDiligenceFeesAction(params);

  if (params.routeName === 'opportunities-due-diligence-opportunity')
    breadcrumbs = enterDueDiligenceAction(params);

  if (params.routeName === 'opportunities-extension-confirmation')
    breadcrumbs = extensionConfirmationAction(params);

  return (
    <MuiBreadcrumbs sx={{ borderBottom: 0 }}> {breadcrumbs} </MuiBreadcrumbs>
  );
};

const opportunityItems = (opportunity) => {
  let breadcrumbs = [];

  breadcrumbs.push(<BreadcrumbItem key={uuid()} to="/" title="Home" />);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/view`}
      title={OpportunityName(opportunity)}
    />
  );

  return breadcrumbs;
};

const documentUpload = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/documents/list`}
      title={fieldLabel.documents}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.upload} />
  );
  return breadcrumbs;
};

const documents = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.documents} />
  );
  return breadcrumbs;
};

const services = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.services} />
  );
  return breadcrumbs;
};

const serviceCreate = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/services/list`}
      title={fieldLabel.services}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.create} />
  );
  return breadcrumbs;
};

const serviceEdit = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/services/list`}
      title={fieldLabel.services}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );
  return breadcrumbs;
};

const serviceView = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/services/list`}
      title={fieldLabel.services}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.view} />
  );
  return breadcrumbs;
};

const opportunitiesBrokerageUsers = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.opportunityBrokerageUsers}
    />
  );
  return breadcrumbs;
};

const opportunitiesBrokerageUsersView = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/opportunity-brokerage-users/list`}
      title={fieldLabel.opportunityBrokerageUsers}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.view} />
  );
  return breadcrumbs;
};

const opportunitiesBrokerageUsersEdit = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/opportunity-brokerage-users/list`}
      title={fieldLabel.opportunityBrokerageUsers}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );
  return breadcrumbs;
};

const opportunitiesBrokerageUsersCreate = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/opportunity-brokerage-users/list`}
      title={fieldLabel.opportunityBrokerageUsers}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.create} />
  );
  return breadcrumbs;
};

const opportunitiesSqs = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.sqsMessage} />
  );
  return breadcrumbs;
};

const opportunitiesSqsView = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/sqs/list`}
      title={fieldLabel.sqsMessage}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.view} />
  );
  return breadcrumbs;
};

const opportunitiesSqsEdit = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/sqs/list`}
      title={fieldLabel.sqsMessage}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );
  return breadcrumbs;
};

const transactionHistories = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.transactionHistories}
    />
  );
  return breadcrumbs;
};

const transactionHistoriesView = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/transaction-histories/list`}
      title={fieldLabel.transactionHistories}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.view} />
  );
  return breadcrumbs;
};

const opportunitiesCalls = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.calls} />
  );
  return breadcrumbs;
};

const opportunitiesTasks = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.task} />
  );
  return breadcrumbs;
};

const generateContract = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.generateContract}
    />
  );
  return breadcrumbs;
};

const opportunityChangelogs = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.viewChangelogs}
    />
  );
  return breadcrumbs;
};

const opportunitiesInboxEmail = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.inbox} />
  );
  return breadcrumbs;
};

const opportunitiesComposeEmail = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  // breadcrumbs.push(
  //   <BreadcrumbItem
  //     key={uuid()}
  //     to={`/opportunities/${opportunity.id}/email/inbox`}
  //     title={fieldLabel.inbox}
  //   />
  // );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.compose} />
  );
  return breadcrumbs;
};

const opportunitiesDraftThreadEmail = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/email/draft`}
      title={fieldLabel.draft}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.view} />
  );
  return breadcrumbs;
};

const opportunitiesDraftEmail = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  // breadcrumbs.push(
  //   <BreadcrumbItem
  //     key={uuid()}
  //     to={`/opportunities/${opportunity.id}/email/inbox`}
  //     title={fieldLabel.inbox}
  //   />
  // );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.draft} />
  );
  return breadcrumbs;
};

const opportunitiesViewEmail = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/email/inbox`}
      title={fieldLabel.inbox}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.view} />
  );
  return breadcrumbs;
};

const opportunitiesParties = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.parties} />
  );
  return breadcrumbs;
};

const opportunitiesPartiesView = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/parties/list`}
      title={fieldLabel.parties}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.view} />
  );
  return breadcrumbs;
};

const opportunitiesPartiesEdit = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/parties/list`}
      title={fieldLabel.parties}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );
  return breadcrumbs;
};

const opportunitiesPartiesCreate = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      to={`/opportunities/${opportunity.id}/parties/list`}
      title={fieldLabel.parties}
    />
  );

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.create} />
  );
  return breadcrumbs;
};
const opportunitiesnegotiatorNotes = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.negotiatorNotes}
    />
  );
  return breadcrumbs;
};

const opportunitiesTransactionNotes = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.transactionNotes}
    />
  );
  return breadcrumbs;
};

const opportunitiesBrokerageNotes = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.brokerageNotes}
    />
  );
  return breadcrumbs;
};

const opportunitiesClientChat = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.clientChat} />
  );
  return breadcrumbs;
};

const cancelOfferAction = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.cancelOffer} />
  );

  return breadcrumbs;
};

const rejectOfferAction = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.rejectOffer} />
  );

  return breadcrumbs;
};

const counterOfferAction = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.counterOffer} />
  );

  return breadcrumbs;
};

const buyerCounterOfferConfirmationAction = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.buyerCounterOfferConfirmation}
    />
  );

  return breadcrumbs;
};

const acceptOfferAction = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.acceptOffer} />
  );

  return breadcrumbs;
};

const optionEarnestFeeStatusAction = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.optionEarnestFeeStatus}
    />
  );

  return breadcrumbs;
};

const extensionRequestAction = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.extensionRequest}
    />
  );

  return breadcrumbs;
};

const terminationRequestAction = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.terminationRequest}
    />
  );

  return breadcrumbs;
};

const terminationApprovalAction = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.terminationApproval}
    />
  );

  return breadcrumbs;
};

const retradeCompleteAction = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.retradeComplete}
    />
  );

  return breadcrumbs;
};

const retradeRequestAction = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.retradeRequest}
    />
  );

  return breadcrumbs;
};

const dueDiligenceFeesAction = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.dueDiligenceFees}
    />
  );

  return breadcrumbs;
};

const enterDueDiligenceAction = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.enterDueDiligence}
    />
  );

  return breadcrumbs;
};

const extensionConfirmationAction = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.extensionConfirmation}
    />
  );

  return breadcrumbs;
};
const clearDueDiligenceAction = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);

  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={fieldLabel.clearDueDiligence}
    />
  );

  return breadcrumbs;
};

const view = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs.push(<BreadcrumbItem key={uuid()} to="/" title="Home" />);
  breadcrumbs.push(
    <BreadcrumbItem
      key={uuid()}
      type="title"
      title={OpportunityName(opportunity)}
    />
  );
  return breadcrumbs;
};

const edit = (params) => {
  let breadcrumbs = [];
  let opportunity = sessionHelper.getRecord(params.opportunity_id);
  breadcrumbs = opportunityItems(opportunity);
  breadcrumbs.push(
    <BreadcrumbItem key={uuid()} type="title" title={fieldLabel.edit} />
  );
  return breadcrumbs;
};

export default Breadcrumbs;
