import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import jwt from 'jwt-decode';
import axios from 'axios';
import qs from 'qs';
import { useForm } from 'react-hook-form';

import { API_LOGIN, API_ORG_DETAIL, API_TALENT_DETAIL } from 'constants/api';
import { ROUTE_REGISTER, ROUTE_FORGOTPASSWORD } from 'constants/routes';
import { ENUM_ROLES } from 'constants/enums';
import { setSecureCookie, getCookie } from 'utils/cookie';
import {
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
  TEXT_PURPLE,
  THIRD_TEXT_COLOR,
  WHITE_COLOR,
} from 'constants/styles';
import { talentRole, orgRole, adminRole } from 'constants/roles';
import { sha512 } from 'js-sha512';
import { get, getFileFromAWS } from 'utils/request';
import OAuthButtonGroup from './OAuthButtonGroup';
import PasswordField from './PasswordField';
import { messages } from './messages';
import { EmailIcon } from './ProviderIcons';
import Metadata from '../../components/Metadata';
import { useNotification } from '../../hooks/useNotification';

import EntertainmentViet from '../../images/entertainment_viet.png';
function LoginPageV2() {
  const { t } = useTranslation();
  const { notify } = useNotification();
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
      password: sha512(values.password),
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
    try {
      const result = await axios(options);
      const { roles } = jwt(result.data.access_token).realm_access;
      if (result.status === 200) {
        notify('Đăng nhập thành công');
        window.localStorage.setItem('exp', jwt(result.data.access_token).exp);
        window.localStorage.setItem('uid', jwt(result.data.access_token).sub);
        setSecureCookie(
          'token',
          result.data.access_token,
          jwt(result.data.access_token).exp,
        );
        if (data.checkBoxRemember === true) {
          // window.localStorage.setItem('refreshToken', result.data.refresh_token);
          setSecureCookie('refreshToken', result.data.refresh_token, 30);
        } else {
          setSecureCookie('refreshToken', result.data.refresh_token, 0);
        }
        roles.every(async element => {
          if (talentRole === element) {
            window.localStorage.setItem('role', ENUM_ROLES.TAL);
            console.log('logging in');
            const personalInfo = await get(
              API_TALENT_DETAIL,
              {},
              jwt(result.data.access_token).sub,
            );
            if (personalInfo.avatar) {
              const res = await getFileFromAWS(personalInfo.avatar);
              localStorage.setItem('userInfo', res);
            }
            window.location.href = '/';
            return false;
          }
          if (orgRole === element) {
            window.localStorage.setItem('role', ENUM_ROLES.ORG);
            const personalInfo = await get(
              API_ORG_DETAIL,
              {},
              jwt(result.data.access_token).sub,
            );
            if (personalInfo.avatar) {
              const res = await getFileFromAWS(personalInfo.avatar);
              localStorage.setItem('userInfo', res);
            }
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
      }
    } catch (err) {
      notify('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin');
    }
  };

  return (
    <Box
      mt="auto"
      mb="auto"
      sx={{
        justifyContent: 'center',
      }}
    >
      <Metadata />
      <Box
        color={TEXT_GREEN}
        fontWeight="700"
        fontSize="36px"
        sx={{
          textAlign: 'center',
          marginBottom: '25px',
        }}
      >
        <img
          src={EntertainmentViet}
          style={{ display: 'inline' }}
          width="230px"
          height="58px"
          alt="entertainment viet"
        />
      </Box>
      <Box
        sx={{
          backgroundColor: PRI_BACKGROUND,
        }}
        width="545px"
        borderRadius="10px"
        mr="auto"
        ml="auto"
        w={{ sm: '100%', md: '545px' }}
        padding={{ base: '0.5' }}
        background="linear-gradient(180deg, rgba(0, 35, 242, 0) 0%, #404B8D 100%);"
      >
        <Box
          sx={{
            backgroundColor: PRI_BACKGROUND,
          }}
          py={{ base: '0', sm: '12' }}
          px={{ base: '4', sm: '12' }}
          borderRadius="10px"
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
            <Text fontSize="18px" color={PRI_TEXT_COLOR} fontWeight="500">
              {t(messages.welcome())}
            </Text>
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
                    fontSize="15px"
                    fontWeight="400"
                    color={TEXT_GREEN}
                    border={`1px solid ${THIRD_TEXT_COLOR}`}
                    placeholder="Enter your username"
                    {...register('username', {
                      required: 'This is required',
                      // pattern: {
                      //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      //   message: 'invalid email address',
                      // },
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
                    value: 8,
                    message: 'Minimum length should be 8',
                  },
                })}
              />
              <Text color={RED_COLOR}>
                {errors.password && errors.password.message}
              </Text>
            </Stack>
            <HStack justify="space-between" my={4}>
              <Checkbox
                fontSize="15px"
                fontWeight="400"
                id="check-box-remember"
                defaultChecked
                color={PRI_TEXT_COLOR}
                {...register('checkBoxRemember')}
              >
                {t(messages.remember())}
              </Checkbox>
              <Button variant="link" color={TEXT_PURPLE} size="sm">
                <Link
                  fontSize="15px"
                  fontWeight="400"
                  href={ROUTE_FORGOTPASSWORD}
                >
                  {t(messages.forgotPassword())}
                </Link>
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button
                fontSize="15px"
                fontWeight="500"
                variant="primary"
                bg={TEXT_PURPLE}
                color={WHITE_COLOR}
                isLoading={isSubmitting}
                type="submit"
              >
                {t(messages.signin())}
              </Button>
              {/* eslint-disable-next-line no-console */}
              {errors.password && console.log(errors.password.message)}
              <OAuthButtonGroup />
              <HStack spacing="1" justify="center">
                <Text fontSize="15px" fontWeight="400" color={PRI_TEXT_COLOR}>
                  {t(messages.haveAccount())}
                </Text>
                <Button variant="link" color={TEXT_GREEN}>
                  <Link fontSize="15px" fontWeight="400" href={ROUTE_REGISTER}>
                    {t(messages.signup())}
                  </Link>
                </Button>
              </HStack>
            </Stack>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

LoginPageV2.propTypes = { role: PropTypes.any };

export default LoginPageV2;
