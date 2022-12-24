import React from 'react';
import { Box, Flex, Container } from '@chakra-ui/react';
import { PRI_BACKGROUND } from 'constants/styles';

import PropTypes from 'prop-types';
import { ProfileCard } from 'components/Cards';
import parserHtml from 'utils/html';

// If you want to use your own Selectors look up the Advancaed Story book examples
const NormalProfile = ({ profile }) => (
  <Container p={0}>
    <Flex direction={{ sm: 'column', md: 'row' }} justifyContent="flex-start">
      <ProfileCard data={{ displayName: profile.organizerName }} />
      <Box bg={PRI_BACKGROUND} h="26rem" w="100%" p={4} mt={{ sm: 4, md: 0 }}>
        {parserHtml(profile.organizer.bio)}
      </Box>
    </Flex>
  </Container>
);

NormalProfile.propTypes = {
  profile: PropTypes.any,
};
export default NormalProfile;
