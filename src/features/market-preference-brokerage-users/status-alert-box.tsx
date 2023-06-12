import { Box, useTheme } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import EVENTS from 'assets/constants/events';
import fieldLabel from 'assets/constants/fieldLabel';
import ConfirmBox from 'components/confirm-box/confirm-box';
import eventBus from 'helpers/event-bus-helper';
import { useState } from 'react';
import marketPreferenceBrokerageUserService from 'services/market-preference-brokerage-users-service';
import { tokens } from 'theme';
import { ObjectType } from 'types';

const initialConfirmModal = {
  open: false,
  message: '',
  proceed: () => {},
  cancel: () => {}
};

const StatusAlertBox = ({
  data,
  handleClose
}: {
  data: ObjectType;
  handleClose: any;
}) => {
  const {
    id,
    status,
    brokerage_user,
    brokerage_transaction_role,
    brokerage_transaction_role_id,
    brokerage_user_id,
    market_preference_id
  } = data;

  const [confirmModal, setConfirmModal] = useState<any>(initialConfirmModal);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleUpdate = async (id: string, reqBody: ObjectType) => {
    setConfirmModal(initialConfirmModal);
    const result = await marketPreferenceBrokerageUserService.update(
      id,
      reqBody
    );

    eventBus.dispatch(`market_preference_brokerage_user_refresh`, {});

    if (result.isValidationError) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        message: result.errorMessage['brokerage_user_id'][0],
        isError: true
      });
    }

    if (result.isSuccess) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        message: 'Market Preference Brokerage User updated.',
        isError: false
      });
    }
  };

  const isAlreadyActive = `${brokerage_user?.first_name} ${brokerage_user?.last_name} is already active as ${brokerage_transaction_role?.name}. Do you want to run a background job to activate this user in all opportunities belonging to this market preference?`;

  const isAlreadyInactive = `${brokerage_user?.first_name} ${brokerage_user?.last_name} is already inactive. Do you want to run a background job to inactivate this user in all opportunities belonging to this market preference?`;

  const setActive = `Do you want to activate ${brokerage_user?.first_name} ${brokerage_user?.last_name} as ${brokerage_transaction_role?.name}.?`;

  const setInactive = `Do you want to inactivate ${brokerage_user?.first_name} ${brokerage_user?.last_name} as ${brokerage_transaction_role?.name}.?`;

  const handleClick = (e: any) => {
    setConfirmModal({
      open: true,
      title: 'ALERT',
      text:
        e.target.id === 'active-btn' && status === 'active'
          ? isAlreadyActive
          : e.target.id === 'inactive-btn' && status === 'inactive'
          ? isAlreadyInactive
          : status !== 'inactive'
          ? setInactive
          : setActive,
      proceed: () => {
        const reqBody = {
          brokerage_transaction_role_id: brokerage_transaction_role_id,
          brokerage_user_id: brokerage_user_id,
          market_preference_id: market_preference_id,
          status: e.target.outerText === 'Active' ? 'active' : 'inactive'
        };
        handleUpdate(id, reqBody);
        handleClose();
      },
      cancel: () => {
        setConfirmModal(initialConfirmModal);
      }
    });
  };

  return (
    <>
      <MenuItem>
        <Box
          component={'span'}
          style={{
            textDecoration: 'none',
            color: '#141b2d',
            width: '100%',
            fontWeight: 600
          }}
          id="active-btn"
          onClick={(e: any) => handleClick(e)}
        >
          {fieldLabel.active}
        </Box>
      </MenuItem>

      {brokerage_transaction_role?.name !== 'negotiator' && (
        <MenuItem>
          <Box
            component={'span'}
            style={{
              textDecoration: 'none',
              color: '#141b2d',
              width: '100%',
              fontWeight: 600
            }}
            id="inactive-btn"
            onClick={(e: any) => handleClick(e)}
          >
            {fieldLabel.inactive}
          </Box>
        </MenuItem>
      )}

      {confirmModal.open && <ConfirmBox {...confirmModal} />}
    </>
  );
};
export default StatusAlertBox;
