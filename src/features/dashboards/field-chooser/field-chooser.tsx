import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  alpha,
  Box,
  FormControlLabel,
  Menu,
  MenuItem,
  MenuProps,
  styled
} from '@mui/material';
import PrimaryButton from 'components/button/button-primary';
import { MuiCheckbox } from 'components/checkbox/Checkbox';
import React from 'react';
import { ObjectType } from 'types';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        )
      }
    }
  }
}));

const FieldChooser = ({
  data,
  setFields
}: {
  data: ObjectType;
  setFields: (e: any) => any;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e: any) => {
    setFields(e);
  };

  return (
    <Box>
      <PrimaryButton
        id={`action_button-${data?.id}`}
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        color="info"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Field Chooser
      </PrimaryButton>
      <StyledMenu
        id={`style_action_button-${data?.id}`}
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {Object.keys(data).map((item) => (
          <MenuItem disableRipple key={item}>
            <FormControlLabel
              control={
                <MuiCheckbox
                  size="medium"
                  checked={data[item].checked}
                  onClick={handleChange}
                  id={`${item}`}
                  sx={{
                    paddingLeft: '10px',
                    paddingRight: '0px',
                    paddingTop: '9px',
                    paddingBottom: '10px'
                  }}
                  disabled={data[item]?.disable}
                />
              }
              label={data[item]?.title}
            />
          </MenuItem>
        ))}
      </StyledMenu>
    </Box>
  );
};

export default FieldChooser;
