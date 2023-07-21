import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material';
import useColorToken from 'hooks/useColorToken';

const CustomButtonSidebar = styled(MuiButton)(({ theme }: any) => {
  const colors = useColorToken();

  return {
    color: colors.grey[900],
    backgroundColor: colors.white[500],
    border: '1px solid #e0e0e0',
    boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 4px',
    borderRadius: '4px',
    minWidth: '90px',
    minHeight: '48px',

    '&:hover': {
      backgroundColor: colors.white[500],
      boxShadow: `inset 0 0 0 1px #0000001f, inset 0 -1px 0 #0000001f`
    },

    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
      minWidth: 32,
      paddingLeft: 12,
      paddingRight: 12,
      '& .MuiSvgIcon-root': {
        fontSize: '14px'
      }
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
      minWidth: 32,
      paddingLeft: 10,
      paddingRight: 10,
      '& .MuiSvgIcon-root': {
        fontSize: '14px'
      }
    }
  };
});

export default CustomButtonSidebar;
