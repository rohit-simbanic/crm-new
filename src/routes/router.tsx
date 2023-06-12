import AuthPage from 'pages/auth-page';
import ForgotPage from 'pages/forgot-password/forgot';
import ForgotResetPage from 'pages/forgot-password/forgot-reset';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import CommonLayout from '../pages/common-layout';
import accountRoutes from './account-routes';
import { logoutRoute } from './auth-routes';
import callRoutes from './call-routes';
import dashboardRoutes from './dashboard-routes';
import documentRoutes from './document-routes';
import emailRoutes from './email-routes';
import emailTemplateRoutes from './email-template-routes';
import homeRoutes from './home-routes';
import marketPreferenceBrokerageUserRoutes from './market-preference-brokerage-user-routes';
import marketPreferencesRoutes from './market-preferences-routes';
import msaRoutes from './msa-routes';
import opportunityBrokerageUserRoutes from './opportunity-brokerage-user-routes';
import opportunityRoutes from './oppurtunity-routes';
import partyRoutes from './party-routes';
import pdfTemplateRoutes from './pdf-template-routes';
import profileRoutes from './profile-routes';
import propertiesRoutes from './properties-routes';
import reportRoutes from './report-routes';
import serviceRoutes from './service-routes';
import sqsRoutes from './sqs-routes';
import taskRoutes from './task-routes';
import transactionHistoryRoutes from './transaction-history-roues';

const Router = createBrowserRouter(
  [
    {
      path: '/forgot',
      element: <ForgotPage />
    },
    {
      path: '/forgot-reset/:token',
      element: <ForgotResetPage />
    },
    {
      path: '/',
      element: <CommonLayout />,
      children: [
        {
          path: '',
          element: <AuthPage />
        },
        {
          path: 'login',
          element: <AuthPage />
        },
        {
          path: '/forgot',
          element: <ForgotPage />
        },
        {
          path: '/forgot-reset/:token',
          element: <ForgotResetPage />
        },

        dashboardRoutes,
        documentRoutes,
        opportunityRoutes,
        homeRoutes,
        propertiesRoutes,
        partyRoutes,
        accountRoutes,
        msaRoutes,
        emailTemplateRoutes,
        marketPreferencesRoutes,
        emailRoutes,
        pdfTemplateRoutes,
        marketPreferenceBrokerageUserRoutes,
        reportRoutes,
        sqsRoutes,
        opportunityBrokerageUserRoutes,
        taskRoutes,
        callRoutes,
        serviceRoutes,
        transactionHistoryRoutes,
        profileRoutes,
        logoutRoute
      ]
    }
  ],
  { basename: '/app' }
);

export default Router;
