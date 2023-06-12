import Box from '@mui/material/Box';
import ModalComponent from 'components/modal';
import actionHelper from 'helpers/action-helper';
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ObjectType } from 'types';
import { OpportunityContext } from './Context';
import upperCaseString from 'helpers/upper-case-string-helper';
import eventBus from 'helpers/event-bus-helper';
import useRouteName from 'pages/route-outlet-context';
import { isEmpty } from 'helpers/misc-helper';
import ActionName from 'assets/constants/action-name';

const Actions = () => {
  const { action } = useParams<ObjectType>();
  const outletContext = useRouteName();
  const { oppurtunity, setOpportunity, loading } =
    useContext(OpportunityContext);

  const [isModal, setIsModoal] = useState(false);

  const checkAction = () => {
    setIsModoal(true);
  };

  useEffect(() => {
    eventBus.on('show_action_modal', () => {
      checkAction();
    });
  }, []);

  const modalClose = () => {
    const prevUrl = localStorage.getItem('prevUrl');
    window.history.replaceState(null, '', prevUrl);
    setIsModoal(false);
    setOpportunity({});
  };

  const title = upperCaseString(ActionName[action]);

  return (
    <React.Fragment>
      {action && isModal ? (
        <ModalComponent
          title={title}
          Component={actionHelper.getActionModal(action)}
          data={{
            id: oppurtunity.id,
            oppurtunity: oppurtunity,
            reload: () => {
              window.location.reload();
            },
            onClose: () => {
              modalClose();
            }
          }}
          onClose={() => {
            modalClose();
          }}
          loading={loading}
          size="md"
        ></ModalComponent>
      ) : (
        <Box mt={1}>
          <Outlet
            context={{
              routeName: !isEmpty(outletContext) ? outletContext.routeName : '',
              setRouteName: !isEmpty(outletContext)
                ? outletContext.setRouteName
                : ''
            }}
          />
        </Box>
      )}
    </React.Fragment>
  );
};

export default Actions;
