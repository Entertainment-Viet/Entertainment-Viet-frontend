import { chakra, Textarea } from '@chakra-ui/react';

export default chakra(Textarea, {
  baseStyle: {
    backgroundColor: 'transparent',
    color: '#b6ff6d',
    fontSize: '15px',
    border: '1px solid #a0aec0',
    _hover: { backgroundColor: 'transparent' },
    _focus: {
      color: '#b6ff6d',
      fontSize: '15px',
      border: '1px solid #a0aec0',
      backgroundColor: 'transparent',
    },
    _placeholder: {
      color: '#b6ff6d',
    },
  },
});
