import React from 'react';
import { Box, Flex, Container } from '@chakra-ui/react';
import { PRI_BACKGROUND } from 'constants/styles';

import PropTypes from 'prop-types';
import { ProfileCard } from 'components/Cards';
import parserHtml from 'utils/html';

// If you want to use your own Selectors look up the Advancaed Story book examples
const NormalProfile = ({ profile }) => (
  <Container p={0} w="100%" maxWidth="inherit">
    <Flex direction={{ sm: 'column', md: 'row' }} w="100%" height="25rem">
      <ProfileCard data={profile.organizer} avatar={profile.organizer.avatar} />
      <Box bg={PRI_BACKGROUND} w="100%" p={4} mt={{ sm: '1rem', lg: 0 }}>
        {parserHtml(profile.organizer.bio)}
      </Box>
    </Flex>
  </Container>
);

NormalProfile.propTypes = {
  profile: PropTypes.any,
};
export default NormalProfile;
