import { useState, useEffect } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EVENTS from 'assets/constants/events';
import useAuthenticated from 'hooks/auth/use-authenticated';
import EnteraLogo from 'assets/images/entera-logo2.png';
import TextUnit from 'components/form/unit-text';
import FormContainer from 'components/form/container';
import fieldLabel from 'assets/constants/fieldLabel';
import eventBus from 'helpers/event-bus-helper';
import PrimaryButton from 'components/button/button-primary';
import { validateLogin } from './utility';
import ForgotPasswordService from 'services/forgot-password-service';
import { ForgotPassword } from 'types/forgot-password-type';

const ForgotForm = () => {
  const isAuthenticated = useAuthenticated();

  const navigate = useNavigate();
  const [validation, setValidation] = useState<{ [key: string]: any }>({});

  type ForgotPasswordState = ForgotPassword & {
    user_name: string;
  };

  const initialState: ForgotPasswordState = {
    user_name: ''
  };

  const [user, setUser] = useState<ForgotPasswordState>(initialState);
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const { status, ...errors } = validateLogin(user);

    setValidation(errors);
    if (!status) return;

    setLoading(true);
    const result = await ForgotPasswordService.send(user);
    setLoading(false);

    if (result.isError) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        message: result.errorMessage,
        isError: true
      });

      return;
    }

    if (result.isSuccess) {
      eventBus.dispatch(EVENTS.HIDE_TOAST, {});
      setUser(initialState);
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        message: 'We have e-mailed your password reset link!.',
        isError: false
      });
      navigate(`/login`);
    }
  };

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setUser(
      Object.assign({}, user, { [e.currentTarget.name]: e.currentTarget.value })
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/home`);
    }
  }, [isAuthenticated]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          marginTop: 8,
          backgroundColor: '#fafafa',
          boxShadow: '0 2px 5px 0 #bbb'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box
            component="img"
            style={{ width: '160px' }}
            alt="Entera"
            src={EnteraLogo}
            sx={{ mb: 2 }}
          />

          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 2 }}
            data-testid="forgot-form-test"
            style={{
              width: '100%'
            }}
          >
            <FormContainer>
              <TextUnit
                label={fieldLabel.userName}
                name="user_name"
                value={user.user_name}
                onChange={changeHandler}
                grid={{ sm: 0, xs: 12 }}
                error={validation['user_name'] ?? ''}
              />
            </FormContainer>
            <PrimaryButton
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              data-testid="button_node"
            >
              {fieldLabel.submit}
            </PrimaryButton>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotForm;
