import { OpportunityContext } from 'pages/opportunity/Context';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import messageService from 'services/message-service';
import { ObjectType } from 'types';
import NotesTermsProvisionsRecordView from '../record-view/notes-terms-provisions';

const NotesTermsProvision = () => {
  const { opportunity_id } = useParams<ObjectType>();
  const { oppurtunity, oldOppurtunity } = useContext(OpportunityContext);
  const [negotiatorNotes, setNegotiatorNotes] = useState([]);
  const [transactionNotes, setTransactionNotes] = useState([]);

  const loadNegotiatorNotes = async (id: string) => {
    const result = await messageService.getNegotiatorNotes(id);

    if (result.isSuccess) {
      setNegotiatorNotes(result.data.data);
    }
  };

  const loadTransactionNotes = async (id: string) => {
    const result = await messageService.getTransactionNotes(id);

    if (result.isSuccess) {
      setTransactionNotes(result.data.data);
    }
  };

  useEffect(() => {
    if (opportunity_id !== null) {
      loadNegotiatorNotes(opportunity_id);
      loadTransactionNotes(opportunity_id);
    }
  }, []);

  return (
    <>
      <NotesTermsProvisionsRecordView
        oppurtunity={oppurtunity}
        oldOppurtunity={oldOppurtunity}
        readOnly={true}
        transactionNotes={transactionNotes}
        negotiatorNotes={negotiatorNotes}
      />
    </>
  );
};

export default NotesTermsProvision;
