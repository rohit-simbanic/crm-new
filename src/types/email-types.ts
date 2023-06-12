import { ObjectType } from 'typescript';

export interface EmailListItem {
  id: string;
  name: string;
  status: string;
  type: string;
  thread_id: string;
  date_entered: string;
  opportunity_name: string;
  opportunity_id: string;
  thread_emails_count: number;
  opportunity: {
    id: string;
    name: string;
  };
}

export interface EmailListType {
  isSuccess: boolean;
  isError: boolean;
  data: {
    data: EmailListItem[];
    meta: {
      total: number;
    };
  };
  errorMessage: any;
}

export interface TemplateListItem {
  id: string;
  name: string;
  subject: string;
  description: string;
  date_entered: string;
  date_modified: string;
  related_event: string;
}

export interface TemplateListType {
  isSuccess: boolean;
  isError: boolean;
  data: {
    data: TemplateListItem[];
    meta: {
      total: number;
      from: string;
      to: number;
      current_page: number;
    };
  };
  errorMessage: any;
}

export interface TemplateType {
  isSuccess: boolean;
  isError: boolean;
  data: {
    // data: {
    id: string;
    name: string;
    subject: string;
    description: string;
    date_entered: string;
    date_modified: string;
    modified_user_id: string;
    created_by: string;
    published: string;
    body_html: string;
    body: string;
    type: string;
    related_event: string;
    assigned_user_id: string;
    related_to: string;
    // }
  };
  errorMessage: any;
}

export interface EmailThreadListItem {
  id: string;
  thread_id: string;
  name: string;
  type: string;
  opportunity: {
    id: string;
    name: string;
  };
  emailBody: {
    email_id: string;
    description: string;
    description_html: string;
  };
  status: string;
  date_entered: string;
  // {
  //     date: string;
  //     timezone_type: number;
  //     timezone: string
  //     type: string
  // };
  count: number;
  to_addrs: string;
  thread_description: string;
  body: string;
  emailAddresses?: {
    bcc: string;
    from: string;
    to: string;
    cc: string;
  };
  notes: any;
  reply_to: string;
  email_template_id: string;
}

export interface EmailThreadListType {
  isSuccess: boolean;
  isError: boolean;
  data: {
    data: EmailThreadListItem[];
    meta: {
      total: number;
    };
  };
  errorMessage: any;
}

export interface ComposeMailType {
  from: string;
  reply_to: string;
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  template: string;
  opportunity_id: string;
  opportunity_name?: string;
  email_id: string;
  body_html: string;
  from_name: string;
  notes: any[];
  count: number;
  status: string;
}
