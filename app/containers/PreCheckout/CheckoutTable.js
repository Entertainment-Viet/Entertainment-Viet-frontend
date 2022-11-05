import React, { memo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  BOX_SHADOW_CHECKOUT,
  TEXT_PURPLE,
  TEXT_GREEN,
  SUB_BLU_COLOR,
  PRI_TEXT_COLOR,
  RED_COLOR,
} from 'constants/styles';
import {
  VStack,
  Text,
  Divider,
  Button,
  Image,
  Container,
  HStack,
} from '@chakra-ui/react';
import { messages } from './messages';
function CheckoutTable() {
  const { t } = useTranslation();
  const HeaderCheckout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-radius: 10px;
    color: ${TEXT_PURPLE};
    background-color: ${SUB_BLU_COLOR};
    box-shadow: -1px 2px ${BOX_SHADOW_CHECKOUT};
  `;

  const CheckoutPackage = styled.div`
    margin-top: 2%;
    border-radius: 10px;
    color: ${TEXT_PURPLE};
    padding-top: 0.5rem;
    padding-bottom: 2rem;
    background-color: ${SUB_BLU_COLOR};
    box-shadow: -1px 2px ${BOX_SHADOW_CHECKOUT};
  `;
  const DetailPackage = () => (
    <>
      <Divider my={5} w="100%" />
      <Container>
        <HStack align="center" justifyContent="space-between">
          <HStack>
            <Image
              src="https://bit.ly/2Z4KKcF"
              alt="demo"
              boxSize="2rem"
              borderRadius="10%"
            />
            <VStack alignItems="flex-start">
              <Text color={TEXT_PURPLE} fontWeight={600} fontSize="20px">
                {/* {name} */} name
              </Text>
              <Text color={PRI_TEXT_COLOR} fontWeight={400} fontSize="15px">
                {/* {t(messages.packageBoxTime())}:&nbsp;
              {new Date(jobDetail.performanceStartTime).toLocaleString()} */}
                Thời gian: 23/08/2022 3:00 PM
              </Text>
              <Text
                color={PRI_TEXT_COLOR}
                fontWeight={400}
                fontSize="15px"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
                width="60%"
              >
                {/* {t(messages.packageBoxLocation())}:&nbsp;{jobDetail.location} */}
                Địa điểm: 123 Hoàng Văn Thụ P9, Quan 3, TPHCM
              </Text>
            </VStack>
          </HStack>
          <HStack
            justifyContent="space-between"
            border="1px solid yellow"
            w="100%"
          >
            <Text
              color={TEXT_GREEN}
              fontWeight={600}
              fontSize="15px"
              lineHeight="18px"
              whiteSpace="nowrap"
            >
              {/* {numberWithCommas(suggestedPrice)}&nbsp;VND */}
              4,000,000&nbsp;VND
            </Text>
            <VStack justify="space-between">
              <Button
                bg="transparent"
                color={PRI_TEXT_COLOR}
                fontWeight={400}
                fontSize="14px"
              >
                {t(messages.packageBoxEdit())}
              </Button>
              <Button
                bg="transparent"
                color={RED_COLOR}
                fontSize="14px"
                fontWeight={400}
                // onClick={() => handleDeletePackage()}
              >
                {t(messages.packageBoxDelete())}
              </Button>
            </VStack>
          </HStack>
        </HStack>
      </Container>
    </>
  );
  return (
    <div>
      <HeaderCheckout>
        <p>{t(messages.packageTitle())}</p>
        <VStack flexDir="row" justifyContent="space-between" width="35%">
          <Text style={{ marginTop: '0px', color: TEXT_PURPLE }}>
            {t(messages.packagePrice())}
          </Text>
          <Text style={{ marginTop: '0px', color: TEXT_PURPLE }}>
            {t(messages.packageAction())}
          </Text>
        </VStack>
      </HeaderCheckout>
      <CheckoutPackage>
        <VStack
          flexDir="row"
          justifyContent="space-between"
          width="22%"
          margin="1rem"
        >
          <Text
            style={{ marginTop: '0px' }}
            color={SUB_BLU_COLOR}
            backgroundColor={TEXT_GREEN}
            padding="5px 10px"
            borderRadius="2px"
          >
            Talent
          </Text>
          <Text
            style={{
              marginTop: '0px',
              color: TEXT_PURPLE,
              textDecoration: 'underline',
            }}
            fontWeight={600}
            fontSize={15}
          >
            RPT MCK
          </Text>
        </VStack>
        <DetailPackage />
        <DetailPackage />
      </CheckoutPackage>
      <CheckoutPackage>
        <VStack
          flexDir="row"
          justifyContent="space-between"
          width="20%"
          margin="1rem"
        >
          <Text style={{ marginTop: '0px', color: TEXT_PURPLE }}>Talent</Text>
          <Text
            style={{
              marginTop: '0px',
              color: TEXT_PURPLE,
              textDecoration: 'underline',
            }}
          >
            RPT MCK
          </Text>
        </VStack>
        <DetailPackage />
        <DetailPackage />
      </CheckoutPackage>
    </div>
  );
}

export default memo(CheckoutTable);
