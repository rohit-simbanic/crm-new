import { useState } from 'react';
import opportunityBrokerageUserService from 'services/opportunity-brokerage-user-service';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ConfirmBox from 'components/confirm-box/confirm-box';
import RefreshButton from 'components/form/button-refresh';
import Box from '@mui/material/Box';
import opportunityBrokerageUserRefreshMessage from 'assets/constants/opportunity-brokerage-user-refresh-message';

const initialConfirmModal = {
  open: false,
  message: '',
  proceed: () => {},
  cancel: () => {}
};

const OpportunityBrokerageUserRefresh = ({
  setIsFilterChanged,
  opportunityID
}: {
  setIsFilterChanged: (e: any) => any;
  opportunityID: string;
}) => {
  const [confirmModal, setConfirmModal] = useState<any>(initialConfirmModal);

  const refershOpportunities = async (id: string) => {
    setConfirmModal(initialConfirmModal);
    await opportunityBrokerageUserService.refresh(id);
    setIsFilterChanged(true);
  };

  const handleClick = () => {
    setConfirmModal({
      open: true,
      title: 'ALERT',
      text: opportunityBrokerageUserRefreshMessage,
      proceed: () => {
        refershOpportunities(opportunityID);
      },
      cancel: () => {
        setConfirmModal(initialConfirmModal);
      }
    });
  };

  return (
    <>
      <Box mt={1}>
        <RefreshButton onClick={handleClick} />

        <Tooltip title={opportunityBrokerageUserRefreshMessage}>
          <IconButton>
            <QuestionMarkIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Box>

      {confirmModal.open && <ConfirmBox {...confirmModal} />}
    </>
  );
};
export default OpportunityBrokerageUserRefresh;
