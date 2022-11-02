import React, { memo } from 'react';
import {
  VStack,
  Text,
  Divider,
  Box,
  Button,
  Image,
  HStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  TEXT_PURPLE,
  TEXT_GREEN,
  PRI_TEXT_COLOR,
  RED_COLOR,
} from 'constants/styles';
import PropTypes from 'prop-types';
import { numberWithCommas, convertReadableTime } from 'utils/helpers';
import { messages } from '../messages';

const DetailPackage = ({ detailPackage, name, suggestedPrice }) => {
  const { t } = useTranslation();
  return (
    <>
      <Divider my={5} w="100%" />
      <Box ps={4}>
        <HStack align="center" justifyContent="space-between">
          <HStack w="60%">
            <Image
              src="https://bit.ly/2Z4KKcF"
              alt="demo"
              boxSize="4rem"
              borderRadius="10%"
            />
            <VStack alignItems="flex-start">
              <Text color={TEXT_PURPLE} fontWeight={600} fontSize="20px">
                {name}
              </Text>
              <Text color={PRI_TEXT_COLOR} fontWeight={400} fontSize="15px">
                {t(messages.packageBoxTime())}:&nbsp;
                {convertReadableTime(detailPackage.performanceStartTime)}
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
                {t(messages.packageBoxLocation())}:&nbsp;
                {detailPackage.location}
              </Text>
            </VStack>
          </HStack>
          <HStack justifyContent="space-between" w="40%">
            <Text
              color={TEXT_GREEN}
              fontWeight={600}
              fontSize="15px"
              lineHeight="18px"
              whiteSpace="nowrap"
            >
              {numberWithCommas(suggestedPrice)}&nbsp;VND
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
              >
                {t(messages.packageBoxDelete())}
              </Button>
            </VStack>
          </HStack>
        </HStack>
      </Box>
    </>
  );
};

DetailPackage.propTypes = {
  detailPackage: PropTypes.any,
  name: PropTypes.string,
  suggestedPrice: PropTypes.number,
};
export default memo(DetailPackage);
