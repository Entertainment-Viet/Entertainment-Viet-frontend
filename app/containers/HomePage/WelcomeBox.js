import * as React from 'react';
import { Box, Link, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
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
        height="26.7rem"
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
            {t(messages.welcomeBox1())}
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
            {t(messages.welcomeBox2())}
          </Box>
        </Box>
      </Box>
      <Box
        w="90%"
        paddingInlineStart="0"
        maxW="90%"
        bg={TEXT_PURPLE}
        px={5}
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        ml="5%"
        mt="-70px"
        borderRadius="5px"
      >
        <Button>
          <Link href={ROUTE_CREATE_EVENT}>{t(messages.postJob())}</Link>
        </Button>
      </Box>
    </Box>
  );
}
