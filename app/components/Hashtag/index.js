import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getRandomInt } from '../../utils/helpers';

const Hashtag = ({ text }) => {
  const defaultSetColor = [
    ['#F0FFF4', '#319795'],
    ['#FED7D7', '#E53E3E'],
    ['#FFFAF0', '#DD6B20'],
    ['#EBF8FF', '#3182CE'],
    ['#FAF5FF', '#805AD5'],
  ];
  const [colorSet, setColorSet] = useState(0);
  function chooseRandomSet() {
    setColorSet(getRandomInt(0, defaultSetColor.length - 1));
  }
  useEffect(() => chooseRandomSet(), []);
  return (
    <Box bgColor={defaultSetColor[colorSet][0]} borderRadius="6px" p="2">
      <Text color={defaultSetColor[colorSet][1]}>{text}</Text>
    </Box>
  );
};

export default Hashtag;
