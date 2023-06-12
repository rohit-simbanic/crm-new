import { Chip, Grid, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import oppurtunityStatusOptions from 'assets/constants/oppurtunity-status-options';
import useColorToken from 'hooks/useColorToken';
import { OpportunityEntity } from 'types/opportunity-entity';

const OpportunityName = (opportunity: OpportunityEntity, action?: string) => {
  const colors = useColorToken();
  const mobileView = useMediaQuery('(max-width:599px)');

  if (opportunity === null) return <></>;

  return (
    <>
      <Typography
        component={'span'}
        display={'flex'}
        sx={{
          textDecoration: 'none',
          color: colors.grey[900],
          maxWidth: '100%',
          fontWeight: 700
        }}
      >
        <Grid container direction={'row'} alignItems="center">
          <Grid item xs sx={{ whiteSpace: !mobileView ? 'nowrap' : 'normal' }}>
            {opportunity.name}
            <Chip
              size="small"
              sx={{ ml: 0.5, mr: 0.5, mt: -0.2 }}
              label={
                oppurtunityStatusOptions[opportunity.opportunity_status_c || '']
              }
              variant="outlined"
            />

            <Chip
              size="small"
              label={[
                opportunity?.account?.name,
                opportunity?.market?.name
              ].join(': ')}
              variant="outlined"
              sx={{ mt: -0.2 }}
            />
          </Grid>
          <Grid item xs>
            {action && (
              <>
                &nbsp;{' > '} {action}
              </>
            )}
          </Grid>
        </Grid>
      </Typography>
    </>
  );
};

export default OpportunityName;
