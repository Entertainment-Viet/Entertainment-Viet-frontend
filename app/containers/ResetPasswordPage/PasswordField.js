import {
  Input,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/react';
import React from 'react';
import PropsTypes from 'prop-types';
import { TEXT_GREEN, THIRD_TEXT_COLOR } from '../../constants/styles';
import { KeyIcon } from '../LoginPageV2/ProviderIcons';

const PasswordField = ({ configs }) => {
  const { value, onChange, placeHolder, onBlur, error } = configs;
  return (
    <FormControl isInvalid={error !== ''}>
      <InputGroup>
        <Input
          value={value}
          type="password"
          size="lg"
          fontSize="15px"
          fontWeight="400"
          bg="transparent"
          color={TEXT_GREEN}
          border={`1px solid ${THIRD_TEXT_COLOR}`}
          onChange={onChange}
          placeholder={placeHolder}
          onBlur={onBlur}
        />
        <InputLeftElement sx={{ marginTop: '5px' }}>
          <KeyIcon />
        </InputLeftElement>
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

PasswordField.propTypes = {
  configs: PropsTypes.shape({
    value: PropsTypes.string,
    onChange: PropsTypes.func,
    placeHolder: PropsTypes.string,
    onBlur: PropsTypes.func,
    error: PropsTypes.string,
  }),
};

export default PasswordField;
