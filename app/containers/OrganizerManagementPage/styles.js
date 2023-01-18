// import styled from 'styled-components';
import { TEXT_PURPLE } from 'constants/styles';
import { chakra, Button } from '@chakra-ui/react';

export const CustomButton = chakra(Button, {
  baseStyle: {
    w: { sm: '100%', md: 'fit-content' },
    color: 'black',
    bg: TEXT_PURPLE,
  },
});
