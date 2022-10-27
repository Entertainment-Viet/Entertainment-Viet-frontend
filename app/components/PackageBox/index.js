import React from 'react';
import {
  Box,
  Container,
  HStack,
  Image,
  Text,
  VStack,
  Button,
  Divider,
} from '@chakra-ui/react';
import { PRI_TEXT_COLOR, TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';
import { numberWithCommas, getResStatus, cacthResponse } from 'utils/helpers';
import PropTypes from 'prop-types';
import { del } from 'utils/request';
import { API_ORG_ACTION_SHOPPINGCART } from 'constants/api';
import { useTranslation } from 'react-i18next';
import { messages } from '../Header/messages';

// If you want to use your own Selectors look up the Advancaed Story book examples
const PackagesBox = ({ data }) => {
  const { t } = useTranslation();
  const orgId = window.localStorage.getItem('uid');
  const { name, displayName, suggestedPrice, jobDetail } = data;
  function handleDeletePackage() {
    del(`${API_ORG_ACTION_SHOPPINGCART}/${data.uid}`, {}, orgId).then(res1 => {
      const status1 = getResStatus(res1);
      if (status1 === '201') {
        console.log('sent');
      } else if (status1 === '400') {
        console.log('fail');
      } else {
        cacthResponse(res1);
      }
    });
  }

  return (
    <Container>
      <HStack align="flex-start">
        <Box>
          <Image
            src="https://bit.ly/2Z4KKcF"
            alt="demo"
            boxSize="2rem"
            borderRadius="10%"
            // zIndex={99}
          />
        </Box>
        <Box>
          <Text color={PRI_TEXT_COLOR} fontWeight={600} fontSize="20px">
            {name}
          </Text>
          <Text color={TEXT_PURPLE} fontWeight={400} fontSize="15px">
            {displayName}
          </Text>
          <Text color={PRI_TEXT_COLOR} fontWeight={400} fontSize="15px">
            {t(messages.packageBoxTime())}:&nbsp;
            {new Date(jobDetail.performanceStartTime).toLocaleString()}
          </Text>
          <Text
            color={PRI_TEXT_COLOR}
            fontWeight={400}
            fontSize="15px"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {t(messages.packageBoxLocation())}:&nbsp;{jobDetail.location}
          </Text>
        </Box>
        <VStack
          justify="space-between"
          height="7rem"
          style={{ marginLeft: 'auto' }}
        >
          <Text color={TEXT_GREEN}>
            {numberWithCommas(suggestedPrice)}&nbsp;VND
          </Text>
          <HStack justify="space-between">
            <Button
              bg="transparent"
              color={PRI_TEXT_COLOR}
              fontWeight={400}
              fontSize="14px"
            >
              {t(messages.packageBoxEdit())}
            </Button>
            <Divider orientation="vertical" height="14px" />
            <Button
              bg="transparent"
              color={PRI_TEXT_COLOR}
              fontSize="14px"
              fontWeight={400}
              onClick={() => handleDeletePackage()}
            >
              {t(messages.packageBoxDelete())}
            </Button>
          </HStack>
        </VStack>
      </HStack>
      <Divider w="100%" ml="auto" mr="auto" mb="0.5rem" />
    </Container>
  );
};

PackagesBox.propTypes = {
  data: PropTypes.any,
};
export default PackagesBox;
