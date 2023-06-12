import {
  Box,
  CardActions,
  CardContent,
  CardHeader,
  FormLabel,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import Card from '@mui/material/Card';
import fieldLabel from 'assets/constants/fieldLabel';
import PrimaryButton from 'components/button/button-primary';
import ContainerRight from 'components/container/right';
import CircularLoader from 'components/dog-loader/dog-lodar';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import ModalComponent from 'components/modal';
import ModalHeader from 'components/modal/modal-header';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxHeader from 'components/paper-box/paper-box-header';
import eventBus from 'helpers/event-bus-helper';
import { isEmpty, mobileUnmask } from 'helpers/misc-helper';
import { AuthContext } from 'hooks/auth/auth-context';
import { OpportunityContext } from 'pages/opportunity/Context';
import React, { useContext, useEffect, useState } from 'react';
import CTSCallService from 'services/cts-call-service';
import initialOpportunityCall from 'state/opportunity-call/initial-opportunity-call';
import { tokens } from 'theme';
import { ObjectType } from 'types';
import { OpportunityCallEntity } from 'types/opportunity-call';

import CallNotes from './call-notes';
import OpporutnityUpdate from './opportunity-update';

const StyledCard = styled(Card)(({ theme }: any) => {
  return {};
});

const StyledCardHeader = styled(CardHeader)(({ theme }: any) => {
  return {
    '& .MuiTypography-root': {
      fontSize: '16px !important',
      fontWeight: 400,
      wordBreak: 'break-word'
    },

    [theme.breakpoints.down('sm')]: {
      padding: 8,
      '& .MuiTypography-root': {
        fontSize: '12px !important'
      }
    }
  };
});

const StyledCardContent = styled(CardContent)(({ theme }: any) => {
  return {
    height: '12vh',
    overflow: 'auto',
    fontSize: '14px !important',
    '& .MuiTypography-root': {
      fontSize: '12px !important',
      wordBreak: 'break-word'
    },
    '& .MuiFormLabel-root': {
      fontSize: '12px !important'
    },

    [theme.breakpoints.down('sm')]: {
      '& .MuiTypography-root': {
        fontSize: '10px !important'
      },
      '& .MuiFormLabel-root': {
        fontSize: '10px !important'
      }
    }
  };
});

const Component: React.FC = ({ onClose }: any) => {
  const { oppurtunity } = useContext(OpportunityContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [callId, setCallId] = useState<string>('');

  const { state } = useContext(AuthContext);

  const { user } = JSON.parse(localStorage.getItem('user') || '{}');

  const [opportunityCall, setOpportunityCall] = useState<OpportunityCallEntity>(
    initialOpportunityCall
  );
  const [loading, setLoading] = useState(true);

  const [notes, setNotes] = useState<ObjectType[]>([]);

  const handleChange = (e: any) => {
    setOpportunityCall(
      Object.assign({}, opportunityCall, { [e.target.name]: e.target.value })
    );
  };

  const countryCode = user?.cts_country_code ? user?.cts_country_code : '+1';

  const initiateCall = async () => {
    let reqBody = {
      identifier: 'initiate-call',
      contextId: oppurtunity?.id,
      from: `${countryCode}${mobileUnmask(user?.phone_mobile)}`,
      to: `${countryCode}${mobileUnmask(oppurtunity?.list_agent_phone_c)}`,
      correlatorId: user?.id
    };

    const result = await CTSCallService.ctsCall(reqBody);

    if (result.isError) {
      eventBus.dispatch('SHOW_TOAST', {
        message: result.errorMessage,
        isError: true
      });
      return;
    }

    if (result.isSuccess) {
      setCallId(result.data.id);
    }
  };

  const createCallNote = async () => {
    if (isEmpty(opportunityCall.notes)) {
      eventBus.dispatch('SHOW_TOAST', {
        message: 'Please Enter Note',
        isError: true
      });
      return;
    }

    let reqBody = {
      note: opportunityCall.notes,
      identifier: 'create-call-note',
      contextId: oppurtunity?.id
    };

    let requestBodyCtsCall = isEmpty(callId) ? reqBody : { ...reqBody, callId };

    const result = await CTSCallService.ctsCall(requestBodyCtsCall);

    if (result.isError) {
      eventBus.dispatch('SHOW_TOAST', {
        message: result.errorMessage,
        isError: true
      });
      return;
    }

    loadCallNotes();
  };

  const loadCallNotes = async () => {
    let reqBody = {
      identifier: 'retrieve-call-notes',
      contextId: oppurtunity?.id
    };

    const result = await CTSCallService.ctsCall(reqBody);

    setOpportunityCall((preOpportunityCall) => ({
      ...preOpportunityCall,
      notes: ''
    }));

    setLoading(false);

    if (result.isSuccess) {
      setNotes(result.data);
    }
  };

  useEffect(() => {
    if (!initialLoad) loadCallNotes();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    eventBus.on('cts_note_list_refresh', () => {
      loadCallNotes();
    });
  }, []);

  return (
    <>
      {loading ? (
        <Box sx={{ textAlign: 'center' }}>
          <CircularLoader />
        </Box>
      ) : (
        <PaperBox variantValue="elevation" sx={{ p: 0 }}>
          <PaperBoxHeader
            value={
              <>
                <UnitItem grid={{ xs: 12, sm: 12 }} p={0}>
                  <ModalHeader title="Opportunity Call" onClose={onClose} />
                </UnitItem>
              </>
            }
          />
          <PaperBoxContent
            sx={{
              height: 'calc(100vh - 26vh)',
              overflowY: 'auto',
              p: 2
            }}
          >
            <FormContainer>
              <UnitItem grid={{ xs: 12, sm: 4 }}>
                <StyledCard variant="outlined">
                  <StyledCardHeader
                    title={fieldLabel.myPhoneNumber}
                    sx={{ bgcolor: colors.primary[400] }}
                  />
                  <StyledCardContent sx={{ pb: '16px !important' }}>
                    <Typography
                      variant="h5"
                      component="div"
                      style={{ fontWeight: 'bold' }}
                    >
                      {user
                        ? `${user?.cts_country_code}${mobileUnmask(
                            user?.phone_mobile
                          )}`
                        : ''}
                    </Typography>
                    <Typography mt={1}>
                      {user ? `${user?.first_name} ${user?.last_name}` : ''}
                    </Typography>
                  </StyledCardContent>
                </StyledCard>

                <StyledCard
                  style={{
                    marginTop: '20px'
                  }}
                  variant="outlined"
                >
                  <StyledCardHeader
                    title={fieldLabel.listingAgent}
                    sx={{ bgcolor: colors.primary[400] }}
                  />
                  <StyledCardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      style={{ fontWeight: 'bold' }}
                    >
                      {countryCode}
                      {mobileUnmask(oppurtunity?.list_agent_phone_c)}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} mt={1}>
                      <FormLabel style={{ fontWeight: 'bold' }}>
                        {' '}
                        {oppurtunity?.parties_listing_agent_name || ''}
                      </FormLabel>{' '}
                      - {oppurtunity?.name}
                    </Typography>
                  </StyledCardContent>
                  <CardActions>
                    <PrimaryButton
                      size="small"
                      onClick={initiateCall}
                      disabled={!isEmpty(callId)}
                    >
                      {fieldLabel.initiatePhoneCall}
                    </PrimaryButton>
                  </CardActions>
                </StyledCard>
              </UnitItem>

              <UnitItem grid={{ xs: 12, sm: 8 }}>
                <Card variant="outlined" sx={{ p: 1 }}>
                  <ContainerRight>
                    <OpporutnityUpdate
                      opportunityCall={opportunityCall}
                      handleChange={handleChange}
                      opportunity={oppurtunity}
                      callId={callId}
                    />

                    <CallNotes
                      notes={notes}
                      opportunityCall={opportunityCall}
                      handleChange={handleChange}
                      createCallNote={createCallNote}
                      loginUser={user}
                      opportunity={oppurtunity}
                    />
                  </ContainerRight>
                </Card>
              </UnitItem>
            </FormContainer>
          </PaperBoxContent>
        </PaperBox>
      )}
    </>
  );
};

const OpportunityCall = ({ oppurtunity }: { oppurtunity?: ObjectType }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = (val: boolean) => {
    setModal(val);
  };

  useEffect(() => {
    eventBus.on('toggle_opportunity_call', () => {
      toggleModal(!modal);
    });
  }, []);

  return (
    <React.Fragment>
      {modal === true && (
        <ModalComponent
          title={'Opportunity Call'}
          Component={Component}
          data={{
            onClose: () => {
              toggleModal(false);
            }
          }}
          onClose={() => {
            toggleModal(false);
          }}
          size="xl"
        ></ModalComponent>
      )}
    </React.Fragment>
  );
};

export default OpportunityCall;
