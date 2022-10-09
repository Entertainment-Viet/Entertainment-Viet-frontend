import React from 'react';
import {
  AspectRatio,
  Box,
  Container,
  createIcon,
  Input,
} from '@chakra-ui/react';
import { useAnimation } from 'framer-motion';
import { SUB_BLU_COLOR, TEXT_PURPLE } from '../../constants/styles';

export default function UploadFileCustom(props) {
  const controls = useAnimation();
  const startAnimation = () => controls.start('hover');
  const stopAnimation = () => controls.stop();
  return (
    <Container>
      <AspectRatio width="300px" height="42px" ratio={1}>
        <Box
          sx={{
            marginLeft: '-110px',
          }}
        >
          <Box
            rounded="md"
            sx={{
              backgroundColor: TEXT_PURPLE,
              marginRight: '5px',
            }}
            width="142px"
          >
            <Box position="relative" height="100%" width="100%">
              <Box position="absolute">
                <Box
                  textAlign="center"
                  spacing="1"
                  sx={{
                    display: 'flex',
                  }}
                  p={2.5}
                >
                  <AttachIcon
                    sx={{
                      marginTop: '5px',
                    }}
                  />
                  <Box
                    color={SUB_BLU_COLOR}
                    sx={{
                      marginLeft: '2px',
                    }}
                    fontWeight="500"
                    fontSize="15px"
                  >
                    Attach file
                  </Box>
                </Box>
              </Box>
              <Input
                type="file"
                top="0"
                left="0"
                opacity="0"
                onDragEnter={startAnimation}
                onDragLeave={stopAnimation}
                {...props}
              />
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: '30px',
            }}
            fontWeight="400"
            fontSize="10px"
          >
            *This file should be less than 5MB
          </Box>
        </Box>
      </AspectRatio>
    </Container>
  );
}

export const AttachIcon = createIcon({
  displayName: 'AttachIcon',
  path: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6271 8.0829L9.1141 15.5959C7.40556 17.3045 4.63546 17.3045 2.92692 15.5959C1.21837 13.8874 1.21837 11.1173 2.92692 9.40872L10.4399 1.89571C11.579 0.756686 13.4257 0.756686 14.5647 1.89571C15.7037 3.03474 15.7037 4.88147 14.5647 6.0205L7.34633 13.2389C6.77682 13.8084 5.85345 13.8084 5.28394 13.2389C4.71442 12.6694 4.71442 11.746 5.28394 11.1765L11.6184 4.84199"
        stroke="#1D1C4C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
});
