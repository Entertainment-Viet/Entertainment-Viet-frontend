import React, { useState } from 'react';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import {
  PRI_BACKGROUND,
  PRI_TEXT_COLOR,
  TEXT_PURPLE,
  WHITE_COLOR,
} from '../../constants/styles';
import PasswordField from './PasswordField';

const PASSWORD_REQUIRED_LENGTH = 8;
const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState('');

  const validate = (
    passwordValue = password,
    confirmPasswordValue = confirmPassword,
  ) => {
    setPasswordError('');
    setConfirmPasswordError('');
    if (passwordValue.length < PASSWORD_REQUIRED_LENGTH) {
      setPasswordError(
        `Password length must be more than ${PASSWORD_REQUIRED_LENGTH}`,
      );
    }
    if (confirmPasswordValue !== '' && passwordValue !== confirmPasswordValue) {
      setConfirmPasswordError(
        'Confirm password is not the same with password field',
      );
    }
  };

  const handleOnPasswordChange = e => {
    setPassword(e.target.value);
    validate(e.target.value, confirmPassword);
  };

  const handleOnPasswordBlur = () => {
    validate();
  };

  const handleOnConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
    validate(password, e.target.value);
  };

  const handleConfirmPasswordBlur = () => {
    validate();
  };

  const passwordConfigs = () => ({
    value: password,
    onChange: handleOnPasswordChange,
    onBlur: handleOnPasswordBlur,
    error: passwordError,
    placeHolder: t(messages.placeHolderEnterPassword()),
  });

  const confirmPasswordConfigs = () => ({
    value: confirmPassword,
    onChange: handleOnConfirmPasswordChange,
    onBlur: handleConfirmPasswordBlur,
    error: confirmPasswordError,
    placeHolder: t(messages.placeHolderConfirmPassword()),
  });

  const isDisabled = () =>
    !(
      passwordError === '' &&
      confirmPasswordError === '' &&
      password !== '' &&
      password === confirmPassword
    );

  const handleSubmit = () => {
    setIsSubmitting(true);
    console.log([password, confirmPassword]);
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <Flex justify="center">
      <Box
        bgColor={PRI_BACKGROUND}
        width="545px"
        borderRadius="10px"
        py={{ base: '0', sm: '12' }}
        px={{ base: '4', sm: '12' }}
      >
        <Box mb="10px" fontWeight="600" fontSize="35px" color={TEXT_PURPLE}>
          {t(messages.resetPassword())}
        </Box>
        <Box mb="35px" fontSize="18px" fontWeight="500" color={PRI_TEXT_COLOR}>
          {t(messages.enterNewPassword())}
        </Box>
        <Stack spacing={2} mb={6}>
          <PasswordField configs={passwordConfigs()} />
          <PasswordField configs={confirmPasswordConfigs()} />
        </Stack>
        <Box mb="35px" fontSize="10px" fontWeight="400" color={PRI_TEXT_COLOR}>
          {t(messages.passwordRequirement())}
        </Box>
        <Button
          my="18px"
          fontSize="15px"
          h="54px"
          w="100%"
          variant="primary"
          bg={TEXT_PURPLE}
          color={WHITE_COLOR}
          onClick={handleSubmit}
          isLoading={isSubmitting}
          _hover={{ bg: TEXT_PURPLE }}
          disabled={isDisabled()}
        >
          {t(messages.reset())}
        </Button>
      </Box>
    </Flex>
  );
};

export default ResetPasswordPage;
