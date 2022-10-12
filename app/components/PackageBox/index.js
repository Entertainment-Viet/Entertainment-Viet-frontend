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
import { PRI_TEXT_COLOR, THIRD_TEXT_COLOR } from 'constants/styles';
import { numberWithCommas, getResStatus, cacthResponse } from 'utils/helpers';
import PropTypes from 'prop-types';
import { del } from 'utils/request';
import { API_ORG_ACTION_SHOPPINGCART } from 'constants/api';

// If you want to use your own Selectors look up the Advancaed Story book examples
const PackagesBox = ({ data }) => {
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
          <Text>{name}</Text>
          <Text color={THIRD_TEXT_COLOR}>{displayName}</Text>
          <Text color={THIRD_TEXT_COLOR}>
            Thời gian:
            {new Date(jobDetail.performanceStartTime).toLocaleString()}
          </Text>
          <Text color={THIRD_TEXT_COLOR}>Địa điểm: {jobDetail.location}</Text>
        </Box>
        <VStack
          justify="space-between"
          height="7rem"
          style={{ marginLeft: 'auto' }}
        >
          <Text color={PRI_TEXT_COLOR}>
            {numberWithCommas(suggestedPrice)} VND
          </Text>
          <HStack justify="space-between">
            <Button bg="transparent" color={PRI_TEXT_COLOR} fontSize="14px">
              Chỉnh sửa
            </Button>
            <Divider orientation="vertical" height="14px" />
            <Button
              bg="transparent"
              color={PRI_TEXT_COLOR}
              fontSize="14px"
              onClick={() => handleDeletePackage()}
            >
              Xóa
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
