import { Box } from '@mui/material';
import PrimaryButton from 'components/button/button-primary';
import CircularLoader from 'components/dog-loader/dog-lodar';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import RouteLink from 'components/link/route-link';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import sessionHelper from 'helpers/session-helper';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mailService from 'services/mail-service';
import initiailThreadList from 'state/email/initial-thread-list';
import { ObjectType } from 'types';
import { EmailThreadListItem, EmailThreadListType } from 'types/email-types';

import ThreadItem from './thread-item';

const EmailThread = () => {
  const { thread_id, opportunity_id } = useParams<ObjectType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emails, setEmails] =
    useState<EmailThreadListItem[]>(initiailThreadList);

  const loadEmails = async () => {
    try {
      setIsLoading(true);
      const result: EmailThreadListType = await mailService.getEmailThread(
        thread_id,
        `?sort[field]=date_entered&sort[direction]=asc`
      );
      setIsLoading(false);
      setEmails(result.data.data);
      if (result.data.data?.[0]) {
        sessionHelper.setRecord(result.data.data?.[0]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadEmails();
  }, []);

  return (
    <React.Fragment>
      <PaperBox>
        <PaperBoxContent>
          <Box
            sx={{
              height: '75vh',
              p: 2,
              width: '80vw',
              overflowY: 'auto'
            }}
          >
            {isLoading ? (
              <Box
                sx={{
                  padding: '5px',
                  textAlign: 'center'
                }}
              >
                {' '}
                <FormContainer>
                  <UnitItem grid={{ xs: 12, sm: 12 }}>
                    {' '}
                    <CircularLoader />
                  </UnitItem>
                </FormContainer>
              </Box>
            ) : (
              emails.map((mail: EmailThreadListItem, index: number) => (
                <ThreadItem
                  key={mail.id}
                  data={mail}
                  isLast={index == emails.length - 1}
                />
              ))
            )}
          </Box>
          <RouteLink
            url={
              opportunity_id
                ? `/opportunities/${opportunity_id}/email/inbox/thread/${thread_id}/reply`
                : `/email/thread/${thread_id}/reply`
            }
            name={<PrimaryButton size="small">Reply</PrimaryButton>}
          />
        </PaperBoxContent>
      </PaperBox>
    </React.Fragment>
  );
};

export default EmailThread;
