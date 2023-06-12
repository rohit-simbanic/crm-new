import React, { useState } from 'react';
import { ObjectType } from 'types';
import { Box, Typography } from '@mui/material';
import { EmailThreadListItem } from 'types/email-types';
import Composer from 'features/email2/composer';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import DateUtility from 'helpers/date-helper';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import FilePanel from '../record-view2/file-panel';

interface PropsType {
  data: EmailThreadListItem;
  isLast: boolean;
}

const ThreadItem = ({ data, isLast }: PropsType) => {
  const [expanded, setExpanded] = useState(isLast ? true : false);

  return (
    <React.Fragment>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          aria-controls={`${data.id}-content`}
          id={`${data.id}-panel1bh-header`}
        >
          <FormContainer>
            <UnitItem grid={{ xs: 12, sm: 6 }}>
              <Typography component={'span'} variant="h6" fontWeight={'bold'}>
                {data.emailAddresses?.from ?? 'From'}
              </Typography>
            </UnitItem>
            <UnitItem grid={{ xs: 12, sm: 6 }}>
              <Box style={{ float: 'right' }}>
                {DateUtility.getDateTimeString(new Date(data?.date_entered))}
              </Box>
            </UnitItem>
            {!expanded && (
              <UnitItem grid={{ xs: 12, sm: 12 }}>
                {/* {data?.emailBody?.description?.substring(0, 100)} */}
                {data?.name}
              </UnitItem>
            )} 
          </FormContainer>
        </AccordionSummary>

        <AccordionDetails>
          <Composer
            value={data?.emailBody?.description_html}
            onChange={() => {}}
            theme={'bubble'}
            readOnly={true}
          />

          <FilePanel
            readOnly={true}
            notesFiles={data.notes}
            title={'Attachments'}
          />
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
};

export default ThreadItem;
