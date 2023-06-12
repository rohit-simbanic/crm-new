import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import transactionHistoryService from 'services/transaction-history-service';
import initialTransactionHistory from 'state/transaction-history/initial-transaction-history';
import { ObjectType } from 'types';
import { TransactionHistoryEntity } from 'types/transaction-history-types';

import RecordView from '../record-view';

const TransactionHistoryView = ({ routeTag }: { routeTag: string }) => {
  const { transaction_history_id } = useParams<ObjectType>();

  const [transactionHistory, setTransactionHistory] =
    useState<TransactionHistoryEntity>(initialTransactionHistory);

  const { routeName, setRouteName } = useRouteName();

  const loadTransactionHistory = async (transaction_history_id: string) => {
    let response = await transactionHistoryService.get(transaction_history_id);
    setTransactionHistory(response.data);
  };

  useEffect(() => {
    if (transaction_history_id) loadTransactionHistory(transaction_history_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView transactionHistory={transactionHistory} readOnly={true} />
      </PaperBoxContent>
    </PaperBox>
  );
};

export default TransactionHistoryView;
