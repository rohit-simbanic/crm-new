import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, useTheme } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/system/Box';
import fieldLabel from 'assets/constants/fieldLabel';
import { StyledMenu } from 'components/action/styled-menu';
import RouteLinkBlack from 'components/link/route-link-black';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { tokens } from 'theme';

import StatusAlertBox from './status-alert-box';

const ActionDropdown = ({ data }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { market_preference_id } = useParams();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {market_preference_id && (
        <Box>
          <IconButton
            aria-label="more"
            id={`action_button-${data?.id}`}
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            color="primary"
            onMouseOver={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <StyledMenu
            id={`style_action_button-${data?.id}`}
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button'
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <StatusAlertBox data={data} handleClose={handleClose} />

            {data.brokerage_transaction_role?.name === 'negotiator' &&
              data.status !== 'inactive' && (
                <MenuItem>
                  <RouteLinkBlack
                    key="view"
                    url={`/market-preferences/${data.market_preference_id}/market-preferences-brokerage-users/${data.id}/edit/terminate`}
                    name={fieldLabel.terminateUser}
                  />
                </MenuItem>
              )}

            {data.brokerage_transaction_role?.name === 'negotiator' &&
              data.status !== 'inactive' && (
                <MenuItem>
                  <RouteLinkBlack
                    key="view"
                    url={`/market-preferences/${data.market_preference_id}/market-preferences-brokerage-users/${data.id}/edit/replace`}
                    name={fieldLabel.replaceUser}
                  />
                </MenuItem>
              )}
          </StyledMenu>
        </Box>
      )}
    </>
  );
};

export default ActionDropdown;
