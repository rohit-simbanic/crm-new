import { ObjectType } from 'types';

const sqsStatus: ObjectType = {
  pending: 'Pending',
  in_process: 'InProcess',
  sent: 'Sent',
  fetched: 'Fetched',
  processed: 'Processed',
  failed: 'Failed',
  queued_for_delete: 'Queued For Delete',
  queued_for_process: 'Queued For Process',
  queued_for_sent: 'Queued For Sent',
  processed_failed: 'Processed Failed',
  processed_deleted: 'Processed Deleted',
  processed_failed_deleted: 'Processed Failed Deleted',
  processed_failed_to_delete_from_sqs: 'Processed Failed To Delete From SQS',
  failed_to_send: 'Failed To Send',
  in_progress: 'In Progress',
  opportunity_not_found: 'Opportunity Not Found',
  opportunity_not_found_deleted: 'Opportunity Not Found Deleted'
};

export default sqsStatus;
