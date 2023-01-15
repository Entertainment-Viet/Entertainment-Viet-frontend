import { chakra, Box, Text } from '@chakra-ui/react';
import { PRI_BACKGROUND } from 'constants/styles';
export const CustomBox = chakra(Box, {
  baseStyle: {
    backgroundColor: PRI_BACKGROUND,
    marginTop: '1rem',
    // width: '810px',
    borderRadius: '10px',
    py: { base: '0', sm: '12' },
    px: { base: '4', sm: '12' },
  },
});

export const Title = chakra(Text, {
  baseStyle: {
    fontWeight: 'bolder',
    display: 'inline-block',
  },
});
export const Content = chakra(Text, {
  baseStyle: {
    display: 'inline-block',
  },
});
