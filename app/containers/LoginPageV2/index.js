import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import jwt from 'jwt-decode';
import axios from 'axios';
import qs from 'qs';
import { useForm } from 'react-hook-form';

import { API_LOGIN } from 'constants/api';
import { ROUTE_REGISTER, ROUTE_FORGOTPASSWORD } from 'constants/routes';
import { ENUM_ROLES } from 'constants/enums';
import { setSecureCookie, getCookie } from 'utils/cookie';
import {
  SimpleGrid,
  Box,
  Stack,
  HStack,
  FormControl,
  Input,
  Checkbox,
  Button,
  Text,
  Link,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import {
  PRI_TEXT_COLOR,
  RED_COLOR,
  TEXT_GREEN,
  PRI_BACKGROUND,
  SEC_TEXT_COLOR,
  TEXT_PURPLE,
  THIRD_TEXT_COLOR,
} from 'constants/styles';
import { talentRole, orgRole, adminRole } from 'constants/roles';
import OAuthButtonGroup from './OAuthButtonGroup';
import PasswordField from './PasswordField';
import { messages } from './messages';
import { EmailIcon } from './ProviderIcons';

function LoginPageV2() {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
    if (getCookie('refreshToken')) {
      window.location.href = '/';
    }
  }, []);

  const onSubmit = async values => {
    const data = {
      client_id: 'backend',
      username: values.username,
      password: values.password,
      checkBoxRemember: values.checkBoxRemember,
      grant_type: 'password',
      scope: 'openid',
    };
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: `${process.env.REACT_KEYCLOAK_API}${API_LOGIN}`,
    };
    // eslint-disable-next-line no-console
    console.log('data', data);
    const result = await axios(options);
    const { roles } = jwt(result.data.access_token).realm_access;
    if (result.status === 200) {
      window.localStorage.setItem('exp', jwt(result.data.access_token).exp);
      window.localStorage.setItem('uid', jwt(result.data.access_token).sub);
      setSecureCookie(
        'token',
        result.data.access_token,
        jwt(result.data.access_token).exp,
      );
      setSecureCookie('refreshToken', result.data.refresh_token);
      if (data.checkBoxRemember === true) {
        window.localStorage.setItem('refreshToken', result.data.refresh_token);
      }
      const role = roles.every(element => {
        if (talentRole === element) {
          window.localStorage.setItem('role', ENUM_ROLES.TAL);
          window.location.href = '/';
          return false;
        }
        if (orgRole === element) {
          window.localStorage.setItem('role', ENUM_ROLES.ORG);
          window.location.href = '/';
          return false;
        }
        if (adminRole.includes(element)) {
          window.localStorage.setItem('role', ENUM_ROLES.ADMIN);
          window.location.href = '/admin';
          return false;
        }
        return true;
      });
      // eslint-disable-next-line no-console
      console.log(role);
    }
  };

  return (
    <SimpleGrid
      sx={{
        justifyContent: 'center',
      }}
    >
      <Box
        color={TEXT_GREEN}
        fontWeight="700"
        fontSize="36px"
        sx={{
          textAlign: 'center',
          marginBottom: '25px',
        }}
      >
        Entertainment Viet
      </Box>
      <Box
        sx={{
          backgroundColor: PRI_BACKGROUND,
        }}
        width="545px"
        borderRadius="10px"
        py={{ base: '0', sm: '12' }}
        px={{ base: '4', sm: '12' }}
      >
        <Box
          sx={{
            marginBottom: '10px',
          }}
          fontWeight="600"
          fontSize="35px"
          color={TEXT_PURPLE}
        >
          {t(messages.signin())}
        </Box>
        <Box
          sx={{
            marginBottom: '35px',
          }}
        >
          <Text color={PRI_TEXT_COLOR}>{t(messages.welcome())}</Text>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="2">
            <FormControl>
              <InputGroup>
                <Input
                  id="email"
                  type="text"
                  size="lg"
                  bg="transparent"
                  color={TEXT_GREEN}
                  border={`1px solid ${THIRD_TEXT_COLOR}`}
                  placeholder="Enter your email"
                  {...register('username', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <InputLeftElement sx={{ marginTop: '5px' }}>
                  <EmailIcon />
                </InputLeftElement>
              </InputGroup>
            </FormControl>
            <Text color={RED_COLOR}>
              {errors.username && errors.username.message}
            </Text>
            <PasswordField
              {...register('password', {
                required: 'This is required',
                minLength: {
                  value: 4,
                  message: 'Minimum length should be 4',
                },
              })}
            />
            <Text color={RED_COLOR}>
              {errors.password && errors.password.message}
            </Text>
          </Stack>
          <HStack justify="space-between" my={4}>
            <Checkbox
              id="check-box-remember"
              defaultChecked
              color={PRI_TEXT_COLOR}
              {...register('checkBoxRemember')}
            >
              {t(messages.remember())}
            </Checkbox>
            <Button variant="link" color={TEXT_PURPLE} size="sm">
              <Link href={ROUTE_FORGOTPASSWORD}>
                {t(messages.forgotPassword())}
              </Link>
            </Button>
          </HStack>
          <Stack spacing="6">
            <Button
              variant="primary"
              bg={TEXT_PURPLE}
              color={SEC_TEXT_COLOR}
              isLoading={isSubmitting}
              type="submit"
            >
              {t(messages.signin())}
            </Button>
            {/* eslint-disable-next-line no-console */}
            {errors.password && console.log(errors.password.message)}
            <OAuthButtonGroup />
            <HStack spacing="1" justify="center">
              <Text color={PRI_TEXT_COLOR}>{t(messages.haveAccount())}</Text>
              <Button variant="link" color={TEXT_GREEN}>
                <Link href={ROUTE_REGISTER}>{t(messages.signup())}</Link>
              </Button>
            </HStack>
          </Stack>
        </form>
      </Box>
    </SimpleGrid>
  );
}

LoginPageV2.propTypes = { role: PropTypes.any };

export default LoginPageV2;
