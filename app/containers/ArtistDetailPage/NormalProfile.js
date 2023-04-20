import React from 'react';
import { Box, Flex, Container } from '@chakra-ui/react';
import { PRI_BACKGROUND } from 'constants/styles';

import PropTypes from 'prop-types';
import { ProfileCard } from 'components/Cards';
import parseHtml from 'utils/html';

// If you want to use your own Selectors look up the Advancaed Story book examples
const NormalProfile = ({ profile, avatar }) =>
  profile.extensions ? (
    <Container p={0} w="100%" maxWidth="inherit">
      <Flex direction={{ sm: 'column', md: 'row' }} w="100%" height="25rem">
        <ProfileCard data={profile} avatar={avatar} />
        <Box
          bg={PRI_BACKGROUND}
          // h="26rem"
          w="100%"
          p={8}
          mt={{ sm: '1rem', lg: 0 }}
        >
          {parseHtml(JSON.parse(profile.extensions)[1].value)}
        </Box>
      </Flex>
    </Container>
  ) : null;

NormalProfile.propTypes = {
  profile: PropTypes.any,
  avatar: PropTypes.any,
};
export default NormalProfile;
