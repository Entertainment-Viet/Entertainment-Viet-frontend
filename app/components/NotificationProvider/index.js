import React from 'react';
import { Box } from '@chakra-ui/react';

import PropTypes from 'prop-types';
import { TEXT_GREEN, TEXT_PURPLE } from '../../constants/styles';

const NotificationProvider = ({ title }) => (
  <Box
    color={TEXT_GREEN}
    fontWeight="600"
    fontSize="30px"
    px={20}
    py={8}
    sx={{
      textAlign: 'center',
    }}
    bg={TEXT_PURPLE}
    borderRadius="5px"
  >
    {title}
  </Box>
);

NotificationProvider.propTypes = {
  title: PropTypes.string,
};

export default NotificationProvider;
