import React, { memo, useRef } from 'react';
import { Box, Text, HStack } from '@chakra-ui/react';
import {
  BOX_SHADOW_CHECKOUT,
  PRI_BACKGROUND,
  TEXT_PURPLE,
  TEXT_GREEN,
  PRI_TEXT_COLOR,
} from 'constants/styles';
import { useTranslation } from 'react-i18next';
import CopyToClipboard from 'components/Icon/CopyToClipboard';
import { messages } from '../messages';

function PayInstant() {
  const { t } = useTranslation();
  const accountNumberRef = useRef(null);
  const contentTransacRef = useRef(null);
  const copyToCLipBoard = refText => {
    const refTextValue = refText.current.innerHTML;
    navigator.clipboard.writeText(refTextValue);
  };
  return (
    <Box
      p={6}
      mt={6}
      style={{
        boxShadow: `-1px 5px ${BOX_SHADOW_CHECKOUT}`,
        backgroundColor: PRI_BACKGROUND,
      }}
      borderRadius={10}
    >
      <HStack my={4} justifyContent="space-between">
        <Text
          style={{ marginTop: '0px' }}
          color={TEXT_PURPLE}
          fontSize="18px"
          fontWeight={500}
        >
          {t(messages.accountNumber())}
        </Text>
        <HStack
          style={{
            border: `1px solid ${PRI_TEXT_COLOR}`,
            borderRadius: '5px',
            marginRight: '10%',
            padding: '0.5rem 1.5rem',
          }}
        >
          <Text
            style={{ marginTop: '0px' }}
            color={TEXT_GREEN}
            fontSize="18px"
            ref={accountNumberRef}
            fontWeight={500}
          >
            8888888888
          </Text>
          <CopyToClipboard
            size={24}
            handleCopyClipboard={() => copyToCLipBoard(accountNumberRef)}
          />
        </HStack>
      </HStack>
      <HStack my={10} justifyContent="space-between">
        <Text
          style={{ marginTop: '0px' }}
          color={TEXT_PURPLE}
          fontSize="18px"
          fontWeight={500}
        >
          {t(messages.accountName())}
        </Text>
        <Text
          style={{ marginTop: '0px', marginRight: '10%' }}
          color={TEXT_GREEN}
          fontSize="18px"
          fontWeight={500}
        >
          DANG KIM BAO
        </Text>
      </HStack>
      <HStack my={4} justifyContent="space-between">
        <Text
          style={{ marginTop: '0px' }}
          color={TEXT_PURPLE}
          fontSize="18px"
          fontWeight={500}
        >
          {t(messages.contentTransaction())}
        </Text>
        <HStack
          style={{
            border: `1px solid ${PRI_TEXT_COLOR}`,
            borderRadius: '5px',
            marginRight: '10%',
            padding: '0.5rem 1.5rem',
          }}
        >
          <Text
            style={{ marginTop: '0px' }}
            color={TEXT_GREEN}
            fontSize="18px"
            fontWeight={500}
            ref={contentTransacRef}
          >
            RPTMCK221010
          </Text>
          <CopyToClipboard
            size={24}
            handleCopyClipboard={() => copyToCLipBoard(contentTransacRef)}
          />
        </HStack>
      </HStack>
    </Box>
  );
}

export default memo(PayInstant);
