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
import { messages } from 'containers/PreCheckout/messages';
import styled from 'styled-components';

function TransferInfo({ bookingCode, total }) {
  const { t } = useTranslation();
  const accountNumberRef = useRef(null);
  const contentTransacRef = useRef(null);
  const copyToCLipBoard = refText => {
    const refTextValue = refText.current.innerHTML;
    navigator.clipboard.writeText(refTextValue);
  };
  const CustomText = styled(Text)`
    margin-top: 0;
    color: ${props => (props.color ? props.color : TEXT_PURPLE)};
    font-size: 18px;
    font-weight: 500;
  `;
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
      <Text>Sau khi chốt, Xin vui lòng chuyển khoản theo thông tin sau:</Text>
      <HStack my={4} justifyContent="space-between">
        <CustomText color={TEXT_PURPLE}>
          {t(messages.accountNumber())}
        </CustomText>
        <HStack
          style={{
            border: `1px solid ${PRI_TEXT_COLOR}`,
            borderRadius: '5px',
            marginRight: '10%',
            padding: '0.5rem 1.5rem',
          }}
        >
          <CustomText color={TEXT_GREEN} ref={accountNumberRef}>
            8888888888
          </CustomText>
          <CopyToClipboard
            size={24}
            handleCopyClipboard={() => copyToCLipBoard(accountNumberRef)}
          />
        </HStack>
      </HStack>
      <HStack my={10} justifyContent="space-between">
        <CustomText color={TEXT_PURPLE}>Ngân hàng</CustomText>
        <CustomText
          color={TEXT_GREEN}
          style={{ marginTop: '0px', marginRight: '10%' }}
        >
          Techcombank
        </CustomText>
      </HStack>
      <HStack my={10} justifyContent="space-between">
        <CustomText color={TEXT_PURPLE}>{t(messages.accountName())}</CustomText>
        <CustomText
          color={TEXT_GREEN}
          style={{ marginTop: '0px', marginRight: '10%' }}
        >
          DANG KIM BAO
        </CustomText>
      </HStack>
      <HStack my={4} justifyContent="space-between">
        <CustomText color={TEXT_PURPLE}>
          {t(messages.contentTransaction())}
        </CustomText>
        <HStack
          style={{
            border: `1px solid ${PRI_TEXT_COLOR}`,
            borderRadius: '5px',
            marginRight: '10%',
            padding: '0.5rem 1.5rem',
          }}
        >
          <CustomText color={TEXT_GREEN} ref={contentTransacRef}>
            {bookingCode}
          </CustomText>
          <CopyToClipboard
            size={24}
            handleCopyClipboard={() => copyToCLipBoard(contentTransacRef)}
          />
        </HStack>
      </HStack>
      <HStack my={10} justifyContent="space-between">
        <CustomText color={TEXT_PURPLE}>Total</CustomText>
        <CustomText
          color={TEXT_GREEN}
          style={{ marginTop: '0px', marginRight: '10%' }}
        >
          {total}
        </CustomText>
      </HStack>
    </Box>
  );
}

export default memo(TransferInfo);
