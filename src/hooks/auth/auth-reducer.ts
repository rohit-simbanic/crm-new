import { setItem } from 'helpers/src/helpers/local-storage-helper';
import type { AuthenticationType } from 'types/index';

export default (state: AuthenticationType, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      delete action.payload.user.password;
      setItem('user', JSON.stringify(action.payload.user));
      setItem('accessToken', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case 'SET_USER':
      localStorage.setItem(
        'user',
        JSON.stringify({
          user: {
            ...state.user,
            ...action.payload.user
          }
        })
      );

      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.user
        }
      };
    default:
      return state;
  }
};
