import * as React from 'react';
import { Box, Link, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import './Slider/style.css';
import {
  PRI_TEXT_COLOR,
  TEXT_GREEN,
  TEXT_PURPLE,
} from '../../constants/styles';
import { ROUTE_CREATE_EVENT } from '../../constants/routes';

export default function WelcomeBox() {
  const { t } = useTranslation();

  return (
    <Box
      w="100%"
      paddingInlineStart="0"
      maxW="100%"
      mb={{ base: '1rem', lg: '0px' }}
      bg="transparent"
    >
      <Box
        width="100%"
        height="28.5rem"
        borderWidth="1px"
        borderRadius="lg"
        bg="transparent"
        color={PRI_TEXT_COLOR}
        position="relative"
      >
        <Box
          px={6}
          display="flex"
          flexDirection="column"
          alignItems="baseline"
          position="absolute"
          bg="transparent"
          top="25%"
        >
          <Box
            color={TEXT_GREEN}
            mt="-60px"
            fontWeight="600"
            fontSize="20px"
            lineHeight="24px"
            noOfLines={1}
            width="270px"
            height="100px"
          >
            Are you looking for
          </Box>
          <Box
            color={TEXT_GREEN}
            mt="-70px"
            fontWeight="600"
            fontSize="20px"
            lineHeight="24px"
            noOfLines={1}
            width="270px"
            height="100px"
          >
            Talent for your Event?
          </Box>
          <Link href={ROUTE_CREATE_EVENT} width="100%">
            <Button
              mt="200"
              width="60vh"
              mx={5}
              bg={TEXT_PURPLE}
              sx={{
                _hover: {
                  bg: TEXT_PURPLE,
                },
              }}
              fullWidth
            >
              {t(messages.postJob())}
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
