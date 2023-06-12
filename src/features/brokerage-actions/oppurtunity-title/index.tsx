import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import RouteLink from 'components/link/route-link';
import SubTitle from 'components/typography/sub-title';
import capitalizeFirstLetter from 'helpers/capitalize-first-letter-healper';
import React from 'react';
import { tokens } from 'theme';

interface OppurtunityTitleProps {
  address: string;
  msa: string;
  status: string;
  account: string;
  opportunity_id: string;
}

const OppurtunityTitle = (props: OppurtunityTitleProps) => {
  const { address, msa, account, status, opportunity_id } = props;

  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const Msa = capitalizeFirstLetter(msa);

  const title = `${address} - ${Msa},${account} - ${status}`;

  return (
    <Stack
      bgcolor={colors.primary[400]}
      direction="row"
      p={1}
      mb={2}
      mr={1}
      ml={1}
      sx={{ borderRadius: 1 }}
    >
      <SubTitle value={title} sx={{ pl: 1, pr: 1, pt: 1, pb: 0 }} />
      <RouteLink
        url={`/opportunities/${opportunity_id}/view`}
        target={true}
        name={
          <IconButton>
            <VisibilityIcon />
          </IconButton>
        }
      />

      <RouteLink
        url={`/opportunities/${opportunity_id}/edit`}
        target={true}
        name={
          <IconButton>
            <EditIcon color="info" />
          </IconButton>
        }
      />
    </Stack>
  );
};

export default OppurtunityTitle;
