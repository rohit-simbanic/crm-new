import eventBus from 'helpers/event-bus-helper';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../hooks/auth/auth-context';

const ListenStorageEvent: React.FC = () => {
  const { dispatch } = useContext(AuthContext);

  window.addEventListener('storage', function (e) {
    if (e.key == null) {
      dispatch({
        type: 'LOGOUT'
      });
    }
  });

  const logoutHanhdle = () => {
    localStorage.clear();
  };

  useEffect(() => {
    eventBus.on('LOGOUT', logoutHanhdle);

    return () => {
      eventBus.remove('LOGOUT', logoutHanhdle);
    };
  }, []);

  return <></>;
};

export default ListenStorageEvent;
