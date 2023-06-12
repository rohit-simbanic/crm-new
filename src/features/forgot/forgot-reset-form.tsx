import { useState, useEffect } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import EVENTS from 'assets/constants/events';
import useAuthenticated from 'hooks/auth/use-authenticated';
import EnteraLogo from 'assets/images/entera-logo2.png';
import FormContainer from 'components/form/container';
import fieldLabel from 'assets/constants/fieldLabel';
import eventBus from 'helpers/event-bus-helper';
import PrimaryButton from 'components/button/button-primary';
import { validateForgotReset } from './utility';
import ForgotPasswordService from 'services/forgot-password-service';
import { ForgotResetPassword } from 'types/forgot-password-type';
import UnitPassword from 'components/form/unit-password';
import { ObjectType } from 'types';
import CenterBox from 'components/box/center-box';
import CircularLoader from 'components/dog-loader/dog-lodar';

const ForgotResetForm = () => {
  const isAuthenticated = useAuthenticated();

  const navigate = useNavigate();
  const [validation, setValidation] = useState<{ [key: string]: any }>({});
  const { token } = useParams<ObjectType>();
  const [isShowView, setIsShowView] = useState(false);
  const initialState: ForgotResetPassword = {
    password: '',
    confirm_password: ''
  };

  const [user, setUser] = useState<ForgotResetPassword>(initialState);
  const [loading, setLoading] = useState<boolean>(false);

  const loadForgotPasswordReset = async () => {
    const result: ObjectType = await ForgotPasswordService.show(token);

    if (result.isValidationError) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        message: result.errorMessage.token[0],
        isError: true
      });
      navigate(`/login`);
      return;
    }

    if (result.isError) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        message: result.errorMessage,
        isError: true
      });
      navigate(`/login`);
      return;
    }

    if (result.isSuccess) {
      setIsShowView(true);
    }
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const { status, ...errors } = validateForgotReset(user);

    setValidation(errors);
    if (!status) return;

    setLoading(true);
    const result = await ForgotPasswordService.reset(token, user);
    setLoading(false);

    if (result.isValidationError) {
      setValidation(result.errorMessage);

      return;
    }

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
        message: 'Your password has been changed.',
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

  useEffect(() => {
    loadForgotPasswordReset();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      {isShowView ? (
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
                <UnitPassword
                  label={fieldLabel.password}
                  name="password"
                  value={user.password}
                  onChange={(e: any) => changeHandler(e)}
                  grid={{ sm: 0, xs: 12 }}
                  error={validation['password'] ?? ''}
                />
                <UnitPassword
                  label={fieldLabel.confirmPassword}
                  name="confirm_password"
                  value={user.confirm_password}
                  onChange={(e: any) => changeHandler(e)}
                  grid={{ sm: 0, xs: 12 }}
                  error={validation['confirm_password'] ?? ''}
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
      ) : (
        <CenterBox>
          <CircularLoader />
        </CenterBox>
      )}
    </Container>
  );
};

export default ForgotResetForm;
