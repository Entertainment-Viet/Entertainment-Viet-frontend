import React from 'react';
import { Box, HStack, Container } from '@chakra-ui/react';
import { PRI_BACKGROUND } from 'constants/styles';

import PropTypes from 'prop-types';
import { ProfileCard } from 'components/Cards';
import parserHtml from 'utils/html';

// If you want to use your own Selectors look up the Advancaed Story book examples
const NormalProfile = ({ profile }) => (
  <Container ps={0}>
    <HStack w={{ '2xl': '73rem', xl: '57rem' }}>
      <ProfileCard data={profile.organizer} avatar={profile.organizer.avatar} />
      <Box bg={PRI_BACKGROUND} h="26rem" w="1000%" p={4}>
        {parserHtml(profile.organizer.bio)}
      </Box>
    </HStack>
  </Container>
);

NormalProfile.propTypes = {
  profile: PropTypes.any,
};
export default NormalProfile;
