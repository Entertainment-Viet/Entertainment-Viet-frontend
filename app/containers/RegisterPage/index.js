/*
 * LoginPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// import cRequest from 'utils/server';
// import {
//   redirectHome,
//   getResErrorCode,
//   getResStatus,
//   cacthError,
//   cacthResponse,
// } from 'utils/helpers';
// import { setUserData, setUserLoginStat } from 'utils/auth';
// import * as Noti from 'utils/notification';
// import { ERROR_PARAMETERS, ERROR_USER_NOT_ACTIVE } from 'constants/errors';

// import { API_LOGIN } from 'constants/api';
import { ROUTE_LOGIN } from 'constants/routes';
// import { ENUM_USER_ROLE, ENUM_LOGINSTATE } from 'constants/enums';

import Metadata from 'components/Metadata';
// import { H1 } from 'components/Elements';
import {
  SimpleGrid,
  Box,
  Image,
  FormLabel,
  Stack,
  HStack,
  FormControl,
  Input,
  Button,
  Divider,
  Text,
  Center,
  Link,
  Select,
  chakra,
} from '@chakra-ui/react';
import { RED_COLOR } from 'constants/styles';
import { useForm } from 'react-hook-form';
import OAuthButtonGroup from './OAuthButtonGroup';
import PasswordField from './PasswordField';
import { messages } from './messages';
// import { getToken } from '../../firebaseInit';
import background from './image/register-background.png';
const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});
function RegisterPage() {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();
  // const [isTokenFound, setTokenFound] = useState(false);

  const onSubmit = values => {
    console.log(values);
    alert(values);
    // return cRequest
    //   .post(API_LOGIN, data)
    //   .then(async res => {
    //     const status = getResStatus(res);
    //     if (status === 200) {
    //       setUserData(res);
    //       // Noti.showNotiSuccess(t(messages.success()), {
    //       //   onClose: () => redirectHome(),
    //       // });
    //       // const deviceToken = await getToken(setTokenFound);
    //       // if (deviceToken) {
    //       //   const formData1 = new FormData();
    //       //   formData1.append('firebase_register_token', deviceToken);
    //       //   const fData = Object.fromEntries(formData1.entries());
    //       //   cRequest.post(API_SEND_DEVICE_TOKEN, fData).then(res1 => {
    //       //     const status1 = getResStatus(res1);
    //       //     if (status1 === '200') {
    //       //       console.log('sent');
    //       //     } else if (status1 === '400') {
    //       //       console.log('fail');
    //       //     } else {
    //       //       cacthResponse(res1);
    //       //     }
    //       //   });
    //       // }
    //     } else if (status === 400) {
    //       if (getResErrorCode(res) === ERROR_PARAMETERS) {
    //         Noti.showNotiError(t(messages.error()));
    //       }
    //       if (getResErrorCode(res) === ERROR_USER_NOT_ACTIVE) {
    //         Noti.showNotiError(t(messages.errorUser()));
    //       }
    //     } else {
    //       cacthResponse(res);
    //     }
    //   })
    //   .catch(err => cacthError(err));
  };

  return (
    <SimpleGrid columns={2}>
      <Metadata />
      <Box>
        <Image
          // boxSize="100%"
          width="100%"
          height="100vh"
          objectFit="cover"
          src={background}
          alt="Dan Abramov"
        />
      </Box>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        position="relative"
      >
        <Stack
          spacing="6"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="50%"
        >
          <Center>
            <Box color={RED_COLOR} fontWeight="700" fontSize="36px">
              Entertainment Viet
            </Box>
          </Center>
          <Center>
            <Text color="gray.200">{t(messages.welcome())}</Text>
          </Center>
          <Stack spacing="5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired>
                <CustomFormLabel htmlFor="name">
                  {t(messages.name())}
                </CustomFormLabel>
                <Select
                  placeholder="Select your role"
                  {...register('subcategory')}
                >
                  <option value="option1">
                    Organizer (Restaurant, Event organizer, etc...)
                  </option>
                  <option value="option2">
                    Talent (Singer, DJ, Dancer, etc...)
                  </option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <CustomFormLabel htmlFor="name">
                  {t(messages.name())}
                </CustomFormLabel>
                <Input
                  id="displayName"
                  type="displayName"
                  placeholder="Enter your name"
                  {...register('displayName', {
                    required: 'This is required',
                    minLength: {
                      value: 3,
                      message: 'Minimum length should be 3',
                    },
                  })}
                />
              </FormControl>
              <FormControl isRequired>
                <CustomFormLabel htmlFor="email">
                  {t(messages.email())}
                </CustomFormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'This is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address',
                    },
                  })}
                />
              </FormControl>
              <PasswordField
                {...register('password', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                })}
              />
              <HStack justify="space-between">
                <Button variant="link" colorScheme="red" size="sm">
                  {t(messages.forgotPassword())}
                </Button>
              </HStack>
              <Button
                variant="primary"
                width="100%"
                mt={4}
                bg={RED_COLOR}
                isLoading={isSubmitting}
                type="submit"
              >
                {t(messages.signup())}
              </Button>
            </form>
          </Stack>
          <Stack spacing="6">
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap">
                {t(messages.continueWith())}
              </Text>
              <Divider />
            </HStack>
            <OAuthButtonGroup />
            <HStack spacing="1" justify="center">
              <Text>{t(messages.haveAccount())}</Text>
              <Button variant="link" color={RED_COLOR}>
                <Link href={ROUTE_LOGIN}>{t(messages.signin())}</Link>
              </Button>
            </HStack>
          </Stack>
        </Stack>
      </Box>
    </SimpleGrid>
  );
}

RegisterPage.propTypes = { role: PropTypes.any };

export default RegisterPage;
