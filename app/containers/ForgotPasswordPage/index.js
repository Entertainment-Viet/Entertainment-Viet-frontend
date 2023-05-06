import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { getCookie } from 'utils/cookie';
import {
  SimpleGrid,
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
  WHITE_COLOR,
  TEXT_PURPLE,
  THIRD_TEXT_COLOR,
} from 'constants/styles';
import axios from 'axios';
import { messages } from './messages';
import { EmailIcon } from './ProviderIcons';
import background from './image/image.png';
import Metadata from '../../components/Metadata';

import EntertainmentViet from '../../images/entertainment_viet.png';
import { API_SERVER, API_TRIGGER_RESET_EMAIL } from '../../constants/api';
import { useNotification } from '../../hooks/useNotification';
import { deploymentUrl } from '../../constants/deployment';

function ForgotPasswordPage() {
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
    // eslint-disable-next-line no-console
    try {
      await axios.post(
        `${API_SERVER}${API_TRIGGER_RESET_EMAIL}?redirectUrl=${deploymentUrl}`,
        { email: values.username },
      );
      await notify(
        'Email to reset password has been sent, please check in your registered mail',
      );
    } catch (e) {
      if (e.response) {
        if (e.response.data.description) notify(e.response.data.description);
        else if (e.response.data.error) notify(e.response.data.error);
      } else notify('Error requesting reset password, please recheck');
    }
  };

  return (
    <SimpleGrid
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
          fontSize="35px"
          color={TEXT_PURPLE}
        >
          {t(messages.forgot())}
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
          <Stack spacing="6">
            <FormControl>
              <InputGroup>
                <Input
                  id="email"
                  type="text"
                  size="lg"
                  fontSize="15px"
                  fontWeight="400"
                  bg="transparent"
                  color={TEXT_GREEN}
                  border={`1px solid ${THIRD_TEXT_COLOR}`}
                  placeholder="Enter your email"
                  {...register('username', {
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
          </Stack>
          <Stack spacing="6">
            <Button
              variant="primary"
              bg={TEXT_PURPLE}
              color={WHITE_COLOR}
              fontSize="15px"
              fontWeight="500"
              isLoading={isSubmitting}
              type="submit"
            >
              {t(messages.send())}
            </Button>
            {/* eslint-disable-next-line no-console */}
            {errors.password && console.log(errors.password.message)}
          </Stack>
        </form>
      </Box>
    </SimpleGrid>
  );
}

ForgotPasswordPage.propTypes = { role: PropTypes.any };

export default ForgotPasswordPage;
