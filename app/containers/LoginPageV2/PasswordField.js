import React from 'react';

import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  useMergeRefs,
} from '@chakra-ui/react';
import { TEXT_GREEN, THIRD_TEXT_COLOR } from 'constants/styles';
import { KeyIcon } from './ProviderIcons';

const PasswordField = React.forwardRef((props, ref) => {
  const inputRef = React.useRef < HTMLInputElement > null;

  const mergeRef = useMergeRefs(inputRef, ref);

  return (
    <FormControl>
      <InputGroup>
        <Input
          id="password"
          size="lg"
          ref={mergeRef}
          name="password"
          type="password"
          autoComplete="current-password"
          required
          bg="transparent"
          color={TEXT_GREEN}
          border={`1px solid ${THIRD_TEXT_COLOR}`}
          placeholder="Enter your password"
          {...props}
        />
        <InputLeftElement sx={{ marginTop: '5px' }}>
          <KeyIcon />
        </InputLeftElement>
      </InputGroup>
    </FormControl>
  );
});

PasswordField.displayName = 'PasswordField';

export default PasswordField;
