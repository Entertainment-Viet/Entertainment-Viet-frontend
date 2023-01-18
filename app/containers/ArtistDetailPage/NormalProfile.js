import React from 'react';
import { Box, Flex, Container } from '@chakra-ui/react';
import { PRI_BACKGROUND } from 'constants/styles';

import PropTypes from 'prop-types';
import { ProfileCard } from 'components/Cards';

// If you want to use your own Selectors look up the Advancaed Story book examples
const NormalProfile = ({ profile }) => (
  <Container p={0}>
    <Flex direction={{ sm: 'column', md: 'row' }} w="100%">
      <ProfileCard data={profile} />
      <Box
        bg={PRI_BACKGROUND}
        h="26rem"
        mt={{ sm: '1rem', lg: 0 }}
        w="100%"
        p={4}
      >
        DAWD AWD AWD AWDd awd wa dwa dwad
      </Box>
    </Flex>
  </Container>
);

NormalProfile.propTypes = {
  profile: PropTypes.any,
};
export default NormalProfile;
