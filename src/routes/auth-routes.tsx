import AuthPage from 'pages/auth-page';
import LogoutPage from 'pages/logout-page';

const authRoute = {
  path: '/login',
  element: <AuthPage />
};

export const logoutRoute = {
  path: '/logout',
  element: <LogoutPage />
};

export default authRoute;
