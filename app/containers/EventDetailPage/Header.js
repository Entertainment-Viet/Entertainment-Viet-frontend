import React from 'react';
import { HStack, Avatar, Container, VStack, Text } from '@chakra-ui/react';
import { TEXT_PURPLE } from 'constants/styles';

import PropTypes from 'prop-types';
// If you want to use your own Selectors look up the Advancaed Story book examples
const Header = ({ profile }) => (
  <Container marginInlineStart="inherit" paddingInlineStart="inherit" mb={6}>
    <VStack align="flex-start" spacing={4} w="max-content">
      <Text as="h1" fontWeight={700} fontSize="30px" color={TEXT_PURPLE}>
        {profile.name}
      </Text>
      <HStack>
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          size="sm"
        />
        <Text color={TEXT_PURPLE} as="h1">
          {profile.organizerName}
        </Text>
      </HStack>
    </VStack>
  </Container>
);
Header.propTypes = {
  profile: PropTypes.any,
};
export default Header;
