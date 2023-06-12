import { Box } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Breadcrumbs = ({ sx, children }: { sx?: any; children: any }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2, ...sx }}>
      <Stack>
        <MuiBreadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {children}
        </MuiBreadcrumbs>
      </Stack>
    </Box>
  );
};

export default Breadcrumbs;
