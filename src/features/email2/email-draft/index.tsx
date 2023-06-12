import React, { useContext, useEffect } from 'react';
import { OpportunityContext } from 'pages/opportunity/Context';

import EmailDraftThred from './experimental-draft';
import EmailDraftNormal from './normal-draft';
import useRouteName from 'pages/route-outlet-context';
import { ObjectType } from 'types';
import { isEmpty } from 'helpers/misc-helper';
import EmailThread from '../email-thread';
import { useParams } from 'react-router-dom';
const EmailDraft = ({ routeTag }: { routeTag: string }) => {
  const { marketPreference } = useContext(OpportunityContext);
  const { routeName, setRouteName } = useRouteName();

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <React.Fragment>
      {' '}
      {marketPreference.enable_inbound_email == 1 ? (
        <EmailDraftThred />
      ) : (
        <EmailDraftNormal />
      )}
    </React.Fragment>
  );
};

export default EmailDraft;

export const EmailDraft2 = ({ routeTag }: { routeTag: string }) => {
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
      <EmailDraftThred />
    </>
  );
};
