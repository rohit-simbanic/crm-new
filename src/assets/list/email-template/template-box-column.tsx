import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, IconButton, InputLabel, Typography } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Tooltip from '@mui/material/Tooltip';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models';
import fieldLabel from 'assets/constants/fieldLabel';
import UnitItem from 'components/form/unit-item';
import RouteLink from 'components/link/route-link';
import HtmlTooltip from 'components/tooltip/html-tooltip';
import eventBus from 'helpers/event-bus-helper';
import React from 'react';

const PreviewTooltip = ({ data }: any) => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Box>
        <HtmlTooltip
          placement="left"
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            <Box
              sx={{
                width: '47.7vw',
                height: '50vh',
                overflow: 'auto'
              }}
            >
              <UnitItem grid={{ xs: 12, sm: 12 }}>
                <InputLabel>{fieldLabel.subject}</InputLabel>
                <Typography>{data.subject}</Typography>
              </UnitItem>
              <UnitItem grid={{ xs: 12, sm: 12 }}>
                <InputLabel>{fieldLabel.emailBody}</InputLabel>
                <Typography
                  dangerouslySetInnerHTML={{
                    __html: data.body_html
                  }}
                  sx={{ border: '1px solid #000' }}
                ></Typography>
              </UnitItem>
            </Box>
          }
        >
          <IconButton onClick={handleTooltipOpen}>
            {open ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </HtmlTooltip>
      </Box>
    </ClickAwayListener>
  );
};

let columns: GridColDef[] = [
  {
    headerName: fieldLabel.action,
    field: 'action',
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => (
      <>
        <PreviewTooltip data={row} />

        <IconButton
          color="primary"
          onClick={() => {
            eventBus.dispatch('LOAD_TEMPLATE_CONTENT', {
              target: {
                value: row.id,
                name: 'template',
                subject: row.subject
              }
            });
          }}
        >
          <AddIcon />
        </IconButton>
      </>
    ),
    flex: 0.3,
    minWidth: 90,
    maxWidth: 90
  },

  {
    headerName: fieldLabel.name,
    field: 'name',
    sortable: true,
    flex: 1,
    minWidth: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <Tooltip
          title={
            <>
              <Typography
                color="inherit"
                variant="subtitle2"
                fontWeight={'bold'}
                style={{ paddingTop: '3px', paddingBottom: '3px' }}
              >
                {row.name}
              </Typography>
              <Typography
                component={'span'}
                variant="caption"
                style={{ paddingTop: '3px', paddingBottom: '3px' }}
              >
                {row.subject}
              </Typography>
            </>
          }
          placement="top"
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <RouteLink
              url={'#'}
              name={row.name}
              style={{ paddingTop: '3px', paddingBottom: '3px' }}
            />
            <Typography
              component={'span'}
              variant="caption"
              sx={{ paddingTop: '3px', paddingBottom: '3px' }}
            >
              {row.subject}
            </Typography>
          </Box>
        </Tooltip>
      );
    }
  }
];

export default columns;
