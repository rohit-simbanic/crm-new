import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material';
import useColorToken from 'hooks/useColorToken';

const PrimaryButton = styled(MuiButton)(({ theme }: any) => {
  const colors = useColorToken();

  return {
    color: colors.white[900],
    backgroundColor: colors.blue[500],

    '&:hover': {
      backgroundColor: colors.blue[600]
    },

    '&:disabled': {
      backgroundColor: colors.blue[600],
      color: colors.white[900]
    },

    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
      minWidth: 32,
      paddingLeft: 10,
      paddingRight: 10,
      marginRight: 10,
      '& .MuiSvgIcon-root': {
        fontSize: '14px !important'
      },
      '& .MuiButton-startIcon': {
        marginRight: '2px'
      }
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
      minWidth: 32,
      paddingLeft: 10,
      paddingRight: 10,
      '& .MuiSvgIcon-root': {
        fontSize: '12px'
      },
      '& .MuiButton-startIcon': {
        marginRight: '8px'
      }
    }
  };
});

export default PrimaryButton;
