import TransactionHistoryView from 'features/transaction-history/transaction-history-view';
import TransactionHistoryList from 'features/transaction-history/transaction-history-list';
import TransactionHistoryPage from 'pages/transaction-history';

const transactionHistoryRoutes = {
  path: 'transaction-histories',
  element: <TransactionHistoryPage />,
  children: [
    {
      path: '',
      element: <TransactionHistoryList routeTag="transaction-histories" />
    },
    {
      path: ':transaction_history_id/view',
      element: <TransactionHistoryView routeTag="transaction-histories-view" />
    }
  ]
};

export default transactionHistoryRoutes;
