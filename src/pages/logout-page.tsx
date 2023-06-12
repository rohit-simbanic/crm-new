import { AuthContext } from 'hooks/auth/auth-context';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage: React.FC = () => {
  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: 'LOGOUT'
    });

    navigate(`/login`);
  }, []);

  return <></>;
};

export default LogoutPage;
