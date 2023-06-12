import { Box, Container, Paper, Typography } from '@mui/material';
import EVENTS from 'assets/constants/events';
import fieldLabel from 'assets/constants/fieldLabel';
import EnteraLogo from 'assets/images/entera-logo2.png';
import EnteraLogo2 from 'assets/images/blue_entera-logo.png';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import UnitPassword from 'components/form/unit-password';
import TextUnit from 'components/form/unit-text';
import RouteLink from 'components/link/route-link';
import eventBus from 'helpers/event-bus-helper';
import { AuthContext } from 'hooks/auth/auth-context';
import useAuthenticated from 'hooks/auth/use-authenticated';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from 'services/auth-service';
import { UserType } from 'types';

import validateLogin from 'validations/login';
import LinkExtenalOpenNewIcon from 'components/link/link-external-open-new-icon';
import envConfig from 'config/env';
import PaperBox from 'components/paper-box';
import LoginButton from 'components/form/button-login';
import { isLoginPage } from 'helpers/auth-helper';
import { AuthenticationEntityResponse } from 'types/authentication';

const LoginForm = () => {
  const isAuthenticated = useAuthenticated();
  const { state, dispatch } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [validation, setValidation] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(false);

  let location = useLocation();

  type LoginState = UserType & {
    errorMessage: any;
  };

  const initialState: LoginState = {
    id: '',
    email: '',
    password: '',
    errorMessage: null
  };

  const [user, setUser] = useState<LoginState>(initialState);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setValidation({});

    setUser({
      ...user,
      errorMessage: null
    });

    const { hasValidationError, ...errors } = validateLogin(user);

    setValidation(errors);

    if (hasValidationError) return;

    setLoading(true);

    const result: AuthenticationEntityResponse = await authService.login(user);
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
      eventBus.dispatch('LOAD_PERMISSION', {});
      dispatch({
        type: 'LOGIN',
        payload: {
          user: user,
          token: result?.data?.access_token
        }
      });
    }
  };

  const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  useEffect(() => {
    if (isAuthenticated && isLoginPage(location)) {
      navigate('/home');
    } else {
      navigate(location.pathname);
    }
  }, [isAuthenticated]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <PaperBox
          sx={{
            p: 3,
            marginTop: 8
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

            <Box sx={{ mt: 2 }}>
              <FormContainer>
                <TextUnit
                  label={fieldLabel.userName}
                  name="email"
                  value={user.email}
                  onChange={changeHandler}
                  grid={{ sm: 0, xs: 12 }}
                  error={validation['email'] ?? ''}
                />

                <UnitPassword
                  label={fieldLabel.password}
                  name="password"
                  showPassword={showPassword}
                  value={user.password}
                  onChange={(e: any) => changeHandler(e)}
                  grid={{ sm: 0, xs: 12 }}
                  error={validation['password'] ?? ''}
                  setShowPassword={() => setShowPassword((prev: any) => !prev)}
                />
                <UnitItem style={{ paddingTop: '10px' }}>
                  <RouteLink
                    url={`/forgot`}
                    name={'Forgot Password?'}
                    target={false}
                  />
                </UnitItem>
              </FormContainer>
              <LoginButton
                fullWidth
                loading={loading}
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
                onClick={submitHandler}
              />
            </Box>
          </Box>
        </PaperBox>
        <Typography p={1}>
          By logging into Entera, you agree to the{' '}
          <LinkExtenalOpenNewIcon
            url={`${envConfig.REACT_APP_FRONTEND_URL}/terms-of-use`}
            label="Terms of Use"
            withIcon={false}
          />{' '}
          and{' '}
          <LinkExtenalOpenNewIcon
            url={`${envConfig.REACT_APP_FRONTEND_URL}/privacy-notice`}
            label="Privacy Notice"
            withIcon={false}
          />
        </Typography>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          p: 1
        }}
      >
        Powered by: <img src={EnteraLogo2} height={'25px'} />
      </Box>
    </>
  );
};

export default LoginForm;
