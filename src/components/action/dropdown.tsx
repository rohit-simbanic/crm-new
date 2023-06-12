import { ButtonGroup, IconButton, useTheme } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/system/Box';
import { useState } from 'react';
import { allowedActionsPerStatus } from 'assets/mega-menu-items';
import allowedActionsDashboard from 'assets/list/dashboard/default-actions';
import { tokens } from 'theme';
import { StyledMenu } from './styled-menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RouteLinkStyled from 'components/link/route-link-styled';
import RouteOpenNewIconLink from 'components/link/route-open-new-icon-link';
import RouteEditIconLink from 'components/link/route-edit-icon-link';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

const ActionDropdown = ({ data }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const paths = window.location.pathname.split('/');
  const dashboard = paths[paths.indexOf('dashboard') + 1];

  let statusArr: ObjectType = {};

  if (!isEmpty(dashboard)) {
    statusArr = allowedActionsDashboard[dashboard];
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <ButtonGroup variant="text">
        {['closing', 'negotiator'].includes(dashboard) ? (
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
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
              {statusArr[data.opportunity_status_c] &&
                Object.keys(
                  statusArr[data.opportunity_status_c] &&
                    statusArr[data.opportunity_status_c]
                ).map((status) => (
                  <MenuItem
                    sx={{ width: '100%' }}
                    onClick={() => {
                      handleClose();
                    }}
                    key={status}
                  >
                    <RouteLinkStyled
                      key={status}
                      onClick={() => {
                        localStorage.setItem(
                          'prevUrl',
                          window.location.pathname
                        );
                      }}
                      to={
                        dashboard
                          ? `/dashboard/${dashboard}/opportunities/${data.id}/brokerage-action/${status}`
                          : `#`
                      }
                      style={{
                        textDecoration: 'none',
                        color: colors.black[100],
                        width: '100%'
                      }}
                    >
                      {statusArr[data.opportunity_status_c][status]}
                    </RouteLinkStyled>
                  </MenuItem>
                ))}
            </StyledMenu>
          </>
        ) : (
          ''
        )}

        <RouteOpenNewIconLink url={`/opportunities/${data?.id}/view`} />
        <RouteEditIconLink
          url={`/opportunities/${data?.id}/edit`}
          target={true}
        />
      </ButtonGroup>
    </Box>
  );
};

export default ActionDropdown;
