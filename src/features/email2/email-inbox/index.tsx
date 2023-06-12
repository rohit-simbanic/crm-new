import React, { useContext, useEffect } from 'react';
import { OpportunityContext } from 'pages/opportunity/Context';

import EmailInboxThred from './experimental-inbox';
import EmailInboxNormal from './normal-inbox';
import { useParams } from 'react-router-dom';
import { ObjectType } from 'types';
import EmailThread from '../email-thread';
import useRouteName from 'pages/route-outlet-context';
import { isEmpty } from 'helpers/misc-helper';

const EmailInbox = ({ routeTag }: { routeTag: string }) => {
  const { marketPreference } = useContext(OpportunityContext);
  const { routeName, setRouteName } = useRouteName();

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <React.Fragment>
      {' '}
      {marketPreference.enable_inbound_email == 1 ? (
        <EmailInboxThred />
      ) : (
        <EmailInboxNormal />
      )}
    </React.Fragment>
  );
};

export default EmailInbox;

export const EmailInbox2 = ({ routeTag }: { routeTag: string }) => {
  const { thread_id } = useParams<ObjectType>();
  const outletContext = useRouteName();

  useEffect(() => {
    if (
      outletContext !== undefined &&
      !isEmpty(useContext) &&
      !isEmpty(routeTag)
    )
      outletContext.setRouteName(routeTag !== undefined ? routeTag : '');
  }, []);

  if (thread_id)
    return (
      <>
        <EmailThread />
      </>
    );

  return (
    <>
      <EmailInboxThred />
    </>
  );
};
