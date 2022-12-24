import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { getCookie } from 'utils/cookie';
import {
  Box,
  Stack,
  FormControl,
  Input,
  Button,
  Text,
  InputLeftElement,
  InputGroup,
  Image,
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
import { messages } from './messages';
import { EmailIcon } from './ProviderIcons';
import background from './image/image.png';
import Metadata from '../../components/Metadata';

function ForgotPasswordPage() {
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
    // eslint-disable-next-line no-console
    console.log(values);
  };

  const widthForgotBox = {
    sm: '100%',
    md: '60%',
    xl: '40rem',
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
        Entertainment Viet
      </Box>
      <Box
        sx={{
          backgroundColor: PRI_BACKGROUND,
        }}
        mr="auto"
        ml="auto"
        width={widthForgotBox}
        borderRadius="10px"
        py={{ base: '0', sm: '12' }}
        px={{ base: '4', sm: '12' }}
      >
        <Box
          sx={{
            marginBottom: '40px',
            marginLeft: '155px',
          }}
        >
          <Image objectFit="cover" src={background} />
        </Box>
        <Box
          sx={{
            marginBottom: '10px',
          }}
          fontWeight="600"
          fontSize={{ sm: '2.2rem', lg: '1rem' }}
          color={TEXT_PURPLE}
        >
          {t(messages.forgot())}
        </Box>
        <Box mb={{ sm: '2.2rem', lg: '1rem' }}>
          <Text fontSize={{ sm: '1.3rem', lg: '1rem' }} color={PRI_TEXT_COLOR}>
            {t(messages.welcome())}
          </Text>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="6">
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
          </Stack>
          <Stack spacing="6">
            <Button
              variant="primary"
              bg={TEXT_PURPLE}
              color={SEC_TEXT_COLOR}
              isLoading={isSubmitting}
              type="submit"
              fontSize={{ sm: '1.5rem', md: '1.25rem' }}
            >
              {t(messages.send())}
            </Button>
            {/* eslint-disable-next-line no-console */}
            {errors.password && console.log(errors.password.message)}
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

ForgotPasswordPage.propTypes = { role: PropTypes.any };

export default ForgotPasswordPage;
