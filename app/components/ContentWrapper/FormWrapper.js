import { Box } from '@chakra-ui/react';
import React from 'react';
import { PRI_TEXT_COLOR, SUB_BLU_COLOR } from '../../constants/styles';
// eslint-disable-next-line react/prop-types
const FormWrapper = ({ children }) => (
  <Box
    color={PRI_TEXT_COLOR}
    bg={SUB_BLU_COLOR}
    width={['90vw', '80vw', '80vw', '53vw']}
    sx={{
      borderRadius: '5px',
    }}
    mt="10px"
    px={['52px', '52px', '52px', '112px']}
    py="74px"
  >
    {children}
  </Box>
);

export default FormWrapper;
