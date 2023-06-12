import React, { useEffect, useReducer, useState } from 'react';
import { ObjectType } from 'types';
import mailService from 'services/mail-service';
import { useNavigate, useParams } from 'react-router-dom';
import { ComposeMailType, EmailThreadListType } from 'types/email-types';
import initialComposeMail from 'state/email/initial-compose-mail';
import RecordView from '../record-view2';
import { isEmpty } from 'helpers/misc-helper';
import eventBus from 'helpers/event-bus-helper';
import useRouteName from 'pages/route-outlet-context';

const EmailView = ({ routeTag }: { routeTag: string }) => {
  const { opportunity_id, email_id } = useParams<ObjectType>();
  const { routeName, setRouteName } = useRouteName();

  const [mail, setMail] = useState<ComposeMailType>({
    ...initialComposeMail,
    opportunity_id
  });
  const [content, setContent] = useState<ObjectType>({
    html: '',
    text: '',
    preview: ''
  });

  const loadEmail = async (email_id: string) => {
    let result: ObjectType = await mailService.getEmail(email_id);

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
        reply_to: result.data.data.email_body.reply_to_addr
      });

      setContent({
        html: result.data.data.email_body.description_html,
        text: result.data.data.email_body.description
      });
    }
  };

  useEffect(() => {
    if (!isEmpty(email_id)) {
      loadEmail(email_id);
    }
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <React.Fragment>
      <RecordView
        mail={mail}
        content={content}
        theme="bubble"
        readOnly={true}
      />
    </React.Fragment>
  );
};

export default EmailView;
