import React from 'react';
import {
  Box,
  Container,
  HStack,
  Flex,
  // Image,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

// If you want to use your own Selectors look up the Advancaed Story book examples
const NotificationBox = ({ item }) => (
  <Container>
    <HStack align="center">
      <Box>
        {/* <Image
          src="https://bit.ly/2Z4KKcF"
          alt="demo"
          boxSize="2rem"
          borderRadius="10%"
          zIndex={99}
        /> */}
      </Box>
      <Flex>
        <Text fontWeight={600} fontSize={15}>
          {item.content}
        </Text>
      </Flex>
    </HStack>
  </Container>
);

NotificationBox.propTypes = {
  item: PropTypes.any,
};
export default NotificationBox;
