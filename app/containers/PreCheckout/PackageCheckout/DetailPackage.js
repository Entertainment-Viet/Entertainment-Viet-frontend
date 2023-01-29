import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
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
import {
  numberWithCommas,
  convertReadableTime,
  handleAddress,
} from 'utils/helpers';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { getFileFromAWS } from 'utils/request';
import { choosePaymentType } from '../actions';
import { messages } from '../messages';
import { makeSelectPayType } from '../selectors';
import { PAY_METHOD_VIEW } from '../constants';
const DetailPackage = ({ dataPackage, payMethod }) => {
  const { t } = useTranslation();
  const { jobDetail, suggestedPrice, name, talent } = dataPackage;
  const isMobile = useIsMobileView();
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    if (talent.avatar) {
      getFileFromAWS(talent.avatar).then(res => {
        setAvatar(res);
      });
    }
  });
  return (
    <>
      <Divider my={5} w="100%" style={{ padding: '0' }} />
      <Box ps={4} style={{ paddingLeft: '3rem', paddingRight: '2.5rem' }}>
        <HStack align="center" justifyContent="space-between">
          <HStack w="60%">
            <Image
              src={avatar}
              alt="avatar"
              boxSize="4rem"
              borderRadius="10%"
            />
            <VStack alignItems="flex-start" w="60%">
              <Text color={TEXT_PURPLE} fontWeight={600} fontSize="20px">
                {name}
              </Text>
              <Text
                color={PRI_TEXT_COLOR}
                fontWeight={400}
                fontSize={isMobile ? '12px' : '15px'}
              >
                {t(messages.packageBoxTime())}:&nbsp;
                {convertReadableTime(jobDetail.performanceStartTime)}
              </Text>
              <Text
                color={PRI_TEXT_COLOR}
                fontWeight={400}
                fontSize={isMobile ? '12px' : '15px'}
                // whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {t(messages.packageBoxLocation())}:&nbsp;
                {handleAddress(dataPackage.jobDetail.location)}
              </Text>
            </VStack>
          </HStack>
          <HStack
            style={
              payMethod === PAY_METHOD_VIEW.LATER
                ? {
                    justifyContent: 'space-between',
                    width: '40%',
                  }
                : { marginRight: '2%' }
            }
          >
            <Text
              color={TEXT_GREEN}
              fontWeight={600}
              fontSize={isMobile ? '12px' : '15px'}
              lineHeight="18px"
              whiteSpace="nowrap"
            >
              {numberWithCommas(suggestedPrice)}&nbsp;VND
            </Text>
            {payMethod === PAY_METHOD_VIEW.LATER && (
              <VStack justify="space-between">
                <Button
                  bg="transparent"
                  color={PRI_TEXT_COLOR}
                  fontWeight={400}
                  fontSize={isMobile ? '12px' : '15px'}
                >
                  {t(messages.packageBoxEdit())}
                </Button>
                <Button
                  bg="transparent"
                  color={RED_COLOR}
                  fontSize={isMobile ? '12px' : '15px'}
                  fontWeight={400}
                >
                  {t(messages.packageBoxDelete())}
                </Button>
              </VStack>
            )}
          </HStack>
        </HStack>
      </Box>
    </>
  );
};

export function mapDispatchToProps(dispatch) {
  return {
    choosePayMethod: paymentType => dispatch(choosePaymentType(paymentType)),
  };
}
const mapStateToProps = createStructuredSelector({
  payMethod: makeSelectPayType(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

DetailPackage.propTypes = {
  dataPackage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  payMethod: PropTypes.string,
};
export default compose(
  withConnect,
  memo,
)(DetailPackage);
