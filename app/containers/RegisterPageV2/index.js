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
  Stack,
  HStack,
  FormControl,
  Input,
  Button,
  Text,
  Link,
  InputGroup,
  InputLeftElement,
  Checkbox,
} from '@chakra-ui/react';
import {
  PRI_TEXT_COLOR,
  RED_COLOR,
  PRI_BACKGROUND,
  SEC_TEXT_COLOR,
  TEXT_GREEN,
  TEXT_PURPLE,
  THIRD_TEXT_COLOR,
} from 'constants/styles';
import { useForm } from 'react-hook-form';
import OAuthButtonGroup from './OAuthButtonGroup';
import PasswordField from './PasswordField';
import { messages } from './messages';
import { EmailIcon } from '../LoginPageV2/ProviderIcons';

import { ROUTE_LOGIN } from '../../constants/routes';
import { AccountIcon } from './ProviderIcons';
import Metadata from '../../components/Metadata';
import SelectCustom from '../../components/Controls/SelectCustom';

function RegisterPageV2() {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = values => {
    // eslint-disable-next-line no-alert
    alert(values);
  };

  const optionsRole = [
    { label: 'Organizer', value: 'Organizer' },
    { label: 'Talent', value: 'Talent' },
  ];
  const widthRegisterBox = {
    sm: '100%',
    md: '80%',
    lg: '40rem',
    '2xl': '34rem',
  };
  return (
    <Box mt="auto" mb="auto">
      <Metadata />
      <Box
        color={TEXT_GREEN}
        fontWeight="700"
        fontSize={{ sm: '3.5rem', md: '2.1rem' }}
        sx={{
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}
      >
        Entertainment Viet
      </Box>
      <Box
        sx={{
          backgroundColor: PRI_BACKGROUND,
        }}
        mr="auto"
        ml="auto"
        width={widthRegisterBox}
        borderRadius="10px"
        py={{ base: '0', sm: '12' }}
        px={{ base: '4', sm: '12' }}
      >
        <Box
          sx={{
            marginBottom: '10px',
          }}
          fontWeight="600"
          fontSize={{ sm: '3.5rem', md: '2.1rem', lg: '1.8rem' }}
          color={TEXT_PURPLE}
        >
          {t(messages.signup())}
        </Box>
        <Box
          sx={{
            marginBottom: '35px',
          }}
        >
          <Text
            fontSize={{ sm: '1.5rem', md: '1.2rem', lg: '1.5rem' }}
            color={PRI_TEXT_COLOR}
          >
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
                  placeholder="Enter your name"
                  {...register('name', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
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
              color={PRI_TEXT_COLOR}
              size={{ sm: 'lg', md: 'md' }}
              {...register('checkBoxRemember')}
            >
              <Text fontSize={{ sm: '1.3rem', lg: '1rem' }}>
                {t(messages.remember())}
              </Text>
            </Checkbox>
          </HStack>
          <FormControl>
            <SelectCustom
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
              color={SEC_TEXT_COLOR}
              isLoading={isSubmitting}
              type="submit"
            >
              <Text fontSize="1.3rem">{t(messages.signup())}</Text>
            </Button>
            {/* eslint-disable-next-line no-console */}
            {errors.password && console.log(errors.password.message)}
            <OAuthButtonGroup />
            <HStack spacing="1" justify="center">
              <Text
                fontSize={{ sm: '1.5rem', md: '1.25rem' }}
                color={PRI_TEXT_COLOR}
              >
                {t(messages.haveAccount())}
              </Text>
              <Button
                variant="link"
                fontSize={{ sm: '1.5rem', md: '1.25rem' }}
                color={TEXT_GREEN}
              >
                <Link href={ROUTE_LOGIN}>{t(messages.signin())}</Link>
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
