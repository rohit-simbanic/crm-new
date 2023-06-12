import Email from 'pages/email';
import Inbox from 'features/email2/email-inbox/experimental-inbox';
import Draft from 'features/email2/email-draft/experimental-draft';
import ComposeEmail from 'features/email2/compose';
import EmailThread from 'features/email2/email-thread';

import EmailInbox, { EmailInbox2 } from 'features/email2/email-inbox';
import { EmailDraft2 } from 'features/email2/email-draft';

const emailRoutes = {
  path: 'email',
  element: <Email />,
  children: [
    {
      path: 'compose',
      element: <ComposeEmail routeTag="compose-emails" key="compose-email" />
    },
    { path: 'inbox', element: <EmailInbox2 routeTag="inbox-emails" /> },
    { path: 'draft', element: <EmailDraft2 routeTag="draft-emails" /> },
    {
      path: 'draft/:thread_id',
      element: <EmailDraft2 routeTag="draft-thread-emails" />
    },
    {
      path: 'inbox/:thread_id',
      element: <EmailInbox2 routeTag="inbox-thread-emails" />
    },
    {
      path: 'thread/:thread_id/reply',
      element: <ComposeEmail routeTag="compose-emails" key="compose-reply" />
    }
  ]
};

export default emailRoutes;
