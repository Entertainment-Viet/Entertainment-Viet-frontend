/*
 * LoginPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';

import {
  PRI_BACKGROUND,
  PRI_TEXT_COLOR,
  RED_COLOR,
  TEXT_GREEN,
  TEXT_PURPLE,
  THIRD_TEXT_COLOR,
  WHITE_COLOR,
} from 'constants/styles';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { sha512 } from 'js-sha512';
import { useNotification } from '../../hooks/useNotification';
import OAuthButtonGroup from './OAuthButtonGroup';
import PasswordField from './PasswordField';
import { messages } from './messages';
import { EmailIcon } from '../LoginPageV2/ProviderIcons';

import { ROUTE_LOGIN } from '../../constants/routes';
import {
  API_ORG_REGISTER,
  API_TAL_REGISTER,
  API_VERIFY_EMAIL,
} from '../../constants/api';
import { AccountIcon } from './ProviderIcons';
import Metadata from '../../components/Metadata';
import SelectCustom from '../../components/Controls/SelectCustom';
import { ENUM_ROLES } from '../../constants/enums';

import EntertainmentViet from '../../images/entertainment_viet.png';
import { deploymentUrl } from '../../constants/deployment';

function RegisterPageV2() {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { notify } = useNotification();

  const onSubmit = async values => {
    try {
      let res;
      const password = sha512(values.password);
      const data = {
        username: values.username,
        email: values.email,
        password,
      };
      if (values.role === ENUM_ROLES.ORG) {
        res = await axios.post(
          `${process.env.REACT_APP_API}${API_ORG_REGISTER}`,
          data,
        );
        notify('Thành công');
      } else if (values.role === ENUM_ROLES.TAL) {
        res = await axios.post(
          `${process.env.REACT_APP_API}${API_TAL_REGISTER}`,
          data,
        );
        notify('Thành công');
      } else {
        notify('Role không tồn tại');
        return;
      }
      await axios.post(
        `${
          process.env.REACT_APP_API
        }${API_VERIFY_EMAIL}?redirectUrl=${deploymentUrl}`,
        {
          uid: res.data,
        },
      );
    } catch (e) {
      if (e.response.data.description) notify(e.response.data.description);
      else if (e.response.data.error) notify(e.response.data.error);
      else notify('Error while register account, please contact administrator');
    }
  };

  const optionsRole = [
    { label: 'Organizer', value: 'organizer' },
    { label: 'Talent', value: 'talent' },
  ];

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
        ml="auto"
        mr="auto"
        w={{ sm: '100%', md: '545px' }}
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
          {t(messages.signup())}
        </Box>
        <Box
          sx={{
            marginBottom: '35px',
          }}
        >
          <Text fontSize="18px" fontWeight="500" color={PRI_TEXT_COLOR}>
            {t(messages.welcome())}
          </Text>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="2">
            <FormControl>
              <InputGroup>
                <Input
                  id="name"
                  type="text"
                  size="lg"
                  bg="transparent"
                  color={TEXT_GREEN}
                  border={`1px solid ${THIRD_TEXT_COLOR}`}
                  fontSize="15px"
                  fontWeight="400"
                  placeholder="Enter your display name"
                  {...register('username', {
                    required: 'This is required',
                    minLength: {
                      value: 2,
                      message: 'Minimum length should be 2',
                    },
                  })}
                />
                <InputLeftElement sx={{ marginTop: '5px' }}>
                  <AccountIcon />
                </InputLeftElement>
              </InputGroup>
            </FormControl>
            <Text color={RED_COLOR}>{errors.name && errors.name.message}</Text>
            <FormControl>
              <InputGroup>
                <Input
                  id="email"
                  type="text"
                  size="lg"
                  bg="transparent"
                  color={TEXT_GREEN}
                  border={`1px solid ${THIRD_TEXT_COLOR}`}
                  fontSize="15px"
                  fontWeight="400"
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'This is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address',
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
              id="check-box-remember"
              fontSize="15px"
              fontWeight="400"
              color={PRI_TEXT_COLOR}
              {...register('checkBoxRemember')}
            >
              {t(messages.remember())}
            </Checkbox>
          </HStack>
          <FormControl>
            <SelectCustom
              fontSize="15px"
              fontWeight="400"
              {...register('role')}
              sx={{
                marginBottom: '20px',
              }}
            >
              {optionsRole.map((option, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectCustom>
          </FormControl>
          <Stack spacing="6">
            <Button
              variant="primary"
              bg={TEXT_PURPLE}
              color={WHITE_COLOR}
              isLoading={isSubmitting}
              type="submit"
            >
              {t(messages.signup())}
            </Button>
            {/* eslint-disable-next-line no-console */}
            {errors.password && console.log(errors.password.message)}
            <OAuthButtonGroup />
            <HStack spacing="1" justify="center">
              <Text color={PRI_TEXT_COLOR} fontSize="15px" fontWeight="400">
                {t(messages.haveAccount())}
              </Text>
              <Button variant="link" color={TEXT_GREEN}>
                <Link href={ROUTE_LOGIN} fontSize="15px" fontWeight="400">
                  {t(messages.signin())}
                </Link>
              </Button>
            </HStack>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

RegisterPageV2.propTypes = { role: PropTypes.any };

export default RegisterPageV2;
