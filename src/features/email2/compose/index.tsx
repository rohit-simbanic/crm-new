import React, { useContext, useEffect, useReducer, useState } from 'react';
import { ObjectType } from 'types';
import mailService from 'services/mail-service';
import { useNavigate, useParams } from 'react-router-dom';
import { ComposeMailType, EmailThreadListType } from 'types/email-types';
import initialComposeMail from 'state/email/initial-compose-mail';
import RecordView from '../record-view2';
import { isEmpty } from 'helpers/misc-helper';
import eventBus from 'helpers/event-bus-helper';
import emailHelper from 'helpers/email-helper';
import EVENTS from 'assets/constants/events';
import opportunityBrokerageUserService from 'services/opportunity-brokerage-user-service';
import partiesService from 'services/parties-service';
import emailConfig from 'config/email';
import useRouteName from 'pages/route-outlet-context';
import brokerageTransactionRoleService from 'services/brokerage-transaction-role-service';
import { OpportunityContext } from 'pages/opportunity/Context';

interface ReducerActionType {
  type: string;
  payload: ObjectType;
}

const initialState: ObjectType[] = [];
const initialState2: Blob[] = [];

const savedAttachementReducer = (
  state: ObjectType[],
  action: ReducerActionType
) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload.file];
    case 'REMOVE':
      return [...state].filter((file, index) => index !== action.payload.index);
    default:
      return state;
  }
};

const unSavedAttachementReducer = (
  state: Blob[],
  action: ReducerActionType
) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload.file];
    case 'REMOVE':
      return [...state].filter((file, index) => index !== action.payload.index);
    default:
      return state;
  }
};

const ComposeEmail = ({ routeTag }: { routeTag: string }) => {
  const navigate = useNavigate();
  const { thread_id, opportunity_id, email_id } = useParams<ObjectType>();
  const { marketPreference } = useContext(OpportunityContext);
  const outletContext = useRouteName();
  const [validation, setValidation] = useState<ObjectType>({});
  const [savedAttachments, dispatch] = useReducer(
    savedAttachementReducer,
    initialState
  );
  const [unSavedAttachments, dispatch2] = useReducer(
    unSavedAttachementReducer,
    initialState2
  );

  const [loading, setLoading] = React.useState<boolean>(false);

  const [mail, setMail] = useState<ComposeMailType>({
    ...initialComposeMail,
    from_name: emailConfig.SENDER_FROM_NAME,
    opportunity_id
  });
  const [content, setContent] = useState<ObjectType>({
    html: '',
    text: '',
    preview: ''
  });

  const handleChange = (
    Obj: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | ObjectType
  ) => {
    if (Obj.target) {
      setMail(Object.assign({}, mail, { [Obj.target.name]: Obj.target.value }));
    } else {
      setMail((preMail) => ({ ...preMail, ...Obj }));
    }
  };

  const draftMail = async () => {
    const { status, ...errors } = emailHelper.validate({
      ...mail,
      body_html: content.html,
      body_text: content.text
    });

    let reqBody = new FormData();

    reqBody.append('from', mail.from);
    reqBody.append('to', mail.to);
    if (!isEmpty(mail.cc)) {
      reqBody.append('cc', mail.cc);
    }
    if (!isEmpty(mail.bcc)) {
      reqBody.append('bcc', mail.bcc);
    }

    reqBody.append('reply_to', mail.reply_to);
    reqBody.append('body_html', content.html);
    reqBody.append('body_plain', content.text);
    reqBody.append('subject', mail.subject);
    reqBody.append('type', 'draft');
    reqBody.append('opportunity_id', mail.opportunity_id);

    if (!isEmpty(mail.template)) {
      reqBody.append('email_template_id', mail.template);
    }

    reqBody.append('from_name', mail.from_name);

    if (mail.status === 'draft') {
      reqBody.append('email_id', mail.email_id);
    }
    if (!isEmpty(thread_id)) reqBody.append('email_thread_id', thread_id);

    for (const doc of savedAttachments) {
      reqBody.append('doc_ids[]', doc.id);
    }

    for (const doc of unSavedAttachments) {
      reqBody.append('files[]', doc);
    }

    for (const note of mail.notes) {
      reqBody.append('note_ids[]', note?.id);
    }

    setValidation(errors);

    if (status) return;
    setLoading(true);
    let result: ObjectType = await mailService.draftMail(reqBody);
    setLoading(false);

    if (result.isError) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        isError: true,
        message: result.errorMessage
      });

      return;
    }

    if (opportunity_id) {
      navigate(`/opportunities/${opportunity_id}/email/draft`);
    } else {
      navigate(`/email/draft`);
    }
  };

  const send = async () => {
    const { status, ...errors } = emailHelper.validate({
      ...mail,
      body_html: content.html,
      body_text: content.text
    });
    setValidation(errors);

    if (status) return;

    let reqBody = new FormData();

    reqBody.append('from', mail.from);
    reqBody.append('to', mail.to);
    reqBody.append('cc', mail.cc);
    reqBody.append('bcc', mail.bcc);
    reqBody.append('reply_to', mail.reply_to);
    reqBody.append('body_html', content.html);
    reqBody.append('body_plain', content.text);
    reqBody.append('subject', mail.subject);
    reqBody.append('type', 'send');
    reqBody.append('opportunity_id', mail.opportunity_id);
    reqBody.append('email_template_id', mail.template);
    reqBody.append('from_name', mail.from_name);
    if (mail.status === 'draft') {
      reqBody.append('email_id', mail.email_id);
    }
    if (!isEmpty(thread_id)) reqBody.append('email_thread_id', thread_id);

    for (const doc of savedAttachments) {
      reqBody.append('doc_ids[]', doc.id);
    }

    for (const doc of unSavedAttachments) {
      reqBody.append('files[]', doc);
    }

    for (const note of mail.notes) {
      reqBody.append('note_ids[]', note?.id);
    }

    setLoading(true);
    const result = await mailService.sentEmail(reqBody);

    setLoading(false);

    if (result.isValidationError) {
      setValidation(result.errorMessage);
      return;
    }
    if (result.isError) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        isError: true,
        message: result.errorMessage
      });

      return;
    }

    if (opportunity_id) {
      navigate(`/opportunities/${opportunity_id}/email/inbox`);
    } else {
      navigate(`/email/inbox`);
    }
  };

  const loadPreviousMail = async (id: string) => {
    const result: EmailThreadListType = await mailService.getEmailThread(
      id,
      `?sort[field]=date_entered&sort[direction]=desc`
    );
    let data = result.data.data[0];

    setMail((preMail) => ({
      ...preMail,
      opportunity_id: data.opportunity.id,
      subject: data.name,
      email_id: data.emailBody.email_id,
      count: data.count,
      status: data.status,
      template: data.email_template_id || ''
    }));

    if (data?.count > 0 && data.status === 'send') {
      setMail((preMail) => ({
        ...preMail,
        subject: `RE: ${data.name}`,
        to: data.emailAddresses!.to
      }));
    }

    if (data?.status === 'draft') {
      setContent({
        html: data?.emailBody.description_html,
        text: data?.emailBody.description
      });
      setMail((preMail) => ({
        ...preMail,
        notes: data.notes,
        to: data.emailAddresses!.to,
        cc: data.emailAddresses!.cc,
        bcc: emailConfig.INBOUND_POSTMARK_EMAIL_ADDRESS.includes(
          data.emailAddresses!.bcc
        )
          ? ''
          : data.emailAddresses!.bcc
      }));
    }
  };

  const loadEmail = async (email_id: string) => {
    setLoading(true);
    let result: ObjectType = await mailService.getEmail(email_id);
    setLoading(false);

    if (result.isSuccess) {
      setMail({
        ...mail,
        to: result.data.data.email_body.to_addrs,
        cc: result.data.data.email_body.cc_addrs,
        bcc: result.data.data.email_body.bcc_addrs,
        subject: result.data.data.name,
        template: result.data.data.email_template_id || '',
        email_id: result.data.data.id,
        notes: result.data.data.notes,
        from: result.data.data.email_body.from_addr,
        reply_to: result.data.data.email_body.reply_to_addr,
        status: result.data.data.status
      });

      setContent({
        html: result.data.data.email_body.description_html,
        text: result.data.data.email_body.description
      });
    }
  };

  const attachDoc = (doc: ObjectType) => {
    dispatch({
      type: 'ADD',
      payload: {
        file: {
          id: doc.id,
          name: doc.name
        }
      }
    });
  };

  const loadOpportunityBrokerageUsers = async (opportunity_id: string) => {
    const response =
      await brokerageTransactionRoleService.getTransactionRolesByName(
        'brokerage_shared_inbox'
      );
    if (response.isSuccess) {
      let brokerageTransactionRole = response.data?.data[0];
      if (brokerageTransactionRole?.id) {
        let queryString = `?filter[opportunity_id]=${opportunity_id}&filter[brokerage_transaction_role_id]=${brokerageTransactionRole?.id}&filter[status]=active`;
        setLoading(true);
        const result = await opportunityBrokerageUserService.getList(
          queryString
        );
        setLoading(false);

        if (result.isError) {
          setMail((preMail) => ({
            ...preMail,
            from: emailConfig!.SENDER_FROM_EMAIL,
            reply_to: emailConfig!.ENTERA_EMAIL_FAILSAFE_ENTERA_REALTY_COM
          }));
          return;
        }

        if (result.isSuccess) {
          let user = result.data?.data[0];
          let email = '';
          if (!isEmpty(user?.brokerage_user.email)) {
            email = `${user?.brokerage_user?.email.split('@')[0]}@${
              user?.brokerage_user?.email.split('@')[1]
            }`;

            if (marketPreference.enable_inbound_email == 1) {
              email = `${user?.brokerage_user?.email.split('@')[0]}+${
                mail.opportunity_id
              }@${user?.brokerage_user?.email.split('@')[1]}`;
            }
          }
          setMail((preMail) => ({
            ...preMail,
            from: user?.brokerage_user?.email || emailConfig!.SENDER_FROM_EMAIL,
            reply_to: !isEmpty(email)
              ? email
              : emailConfig!.ENTERA_EMAIL_FAILSAFE_ENTERA_REALTY_COM
          }));
        }
      }
    }
  };

  useEffect(() => {
    if (mail.opportunity_id) {
      loadOpportunityBrokerageUsers(mail.opportunity_id);
    }
  }, [mail.opportunity_id]);

  useEffect(() => {
    if (!isEmpty(thread_id)) loadPreviousMail(thread_id);
    if (!isEmpty(email_id)) {
      loadEmail(email_id);
    }
  }, []);

  useEffect(() => {
    eventBus.on('ATTACH_DOCS', (data: ObjectType) => attachDoc(data));
  }, []);

  useEffect(() => {
    if (!isEmpty(outletContext))
      outletContext.setRouteName(routeTag !== undefined ? routeTag : '');
  }, []);

  return (
    <React.Fragment>
      <RecordView
        mail={mail}
        onChange={handleChange}
        content={content}
        setContent={setContent}
        savedAttachments={savedAttachments}
        unSavedAttachments={unSavedAttachments}
        dispatch={dispatch}
        dispatch2={dispatch2}
        send={send}
        theme="snow"
        draftMail={draftMail}
        validation={validation}
        loading={loading}
      />
    </React.Fragment>
  );
};

export default ComposeEmail;
