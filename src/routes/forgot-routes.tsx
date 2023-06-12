import ForgotPage from 'pages/forgot-password/forgot';
import ForgotResetPage from 'pages/forgot-password/forgot-reset';

const forgotRoute = {
  path: '/forgot',
  element: <ForgotPage />,
  children: [
    {
      path: 'forgot-reset/:token',
      element: <ForgotResetPage />
    }
  ]
};

export default forgotRoute;
