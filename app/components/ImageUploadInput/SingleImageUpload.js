import React from 'react';
import { Flex } from '@chakra-ui/react';
import PropsTypes from 'prop-types';

import ImageUploadIcon from '../Icon/ImageUpload';
const SingleImageUpload = ({ iconSize }) => (
  <Flex
    h="100%"
    w="100%"
    justify="center"
    align="center"
    bg="#BDC1EA"
    borderRadius="5px"
  >
    <ImageUploadIcon boxSize={iconSize} />
  </Flex>
);

SingleImageUpload.propTypes = {
  iconSize: PropsTypes.number,
};

export default SingleImageUpload;
