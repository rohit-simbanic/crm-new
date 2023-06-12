import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { StyledMenu } from 'components/action/styled-menu';
import { useState } from 'react';

interface DropdownMenuType {
  menuItems: JSX.Element[];
}

const DropdownMenu = ({ menuItems }: DropdownMenuType) => {
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
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems.map((item) => item)}
      </StyledMenu>
    </>
  );
};

export default DropdownMenu;
