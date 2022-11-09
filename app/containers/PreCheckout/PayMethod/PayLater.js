import React, { memo } from 'react';
import { Box, Text, HStack } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import {
  BOX_SHADOW_CHECKOUT,
  TEXT_PURPLE,
  TEXT_GREEN,
  SUB_BLU_COLOR,
} from 'constants/styles';
import { useTranslation } from 'react-i18next';
import { post } from 'utils/request';
import { API_ORG_ACTION_SHOPPINGCART } from 'constants/api';
import Arrow from 'components/Icon/Arrow';
import Wallet from 'components/Icon/Wallet';
import { choosePaymentType } from '../actions';
import { messages } from '../messages';
import { makeSelectPayType } from '../selectors';
function PayLater({ chooseMethod }) {
  const { t } = useTranslation();
  const orgId = localStorage.getItem('uid');
  function instantPay() {
    const val = {
      paymentType: 'payment.online',
    };
    post(API_ORG_ACTION_SHOPPINGCART, val, orgId).then(res1 => {
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
  function laterPay() {
    const val = {
      paymentType: 'payment.offline',
    };
    post(API_ORG_ACTION_SHOPPINGCART, val, orgId).then(res1 => {
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
    <Box py={4}>
      <Box
        bg={SUB_BLU_COLOR}
        borderRadius="10px"
        p={6}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        _hover={{
          cursor: 'pointer',
          boxShadow: `-1px 5px ${BOX_SHADOW_CHECKOUT}`,
          transition: 'ease 0.3s',
        }}
        onClick={() => {
          chooseMethod('payInstant');
          // instantPay();
        }}
      >
        <HStack whiteSpace="nowrap">
          <Wallet size={24} colorIcon={TEXT_GREEN} />
          <Text
            style={{ marginTop: '0px' }}
            color={TEXT_GREEN}
            fontSize="18px"
            fontWeight={500}
          >
            {t(messages.instantPay())}
          </Text>
        </HStack>
        <Arrow size={15} colorIcon={TEXT_GREEN} />
      </Box>
      <Box
        bg={SUB_BLU_COLOR}
        borderRadius="10px"
        p={6}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={4}
        _hover={{
          cursor: 'pointer',
          boxShadow: '-1px 5px #404b8d',
          transition: 'ease 0.3s',
        }}
        onClick={() => {
          laterPay();
        }}
      >
        <HStack whiteSpace="nowrap">
          <Wallet size={24} colorIcon={TEXT_PURPLE} />
          <Text
            style={{ marginTop: '0px' }}
            color={TEXT_PURPLE}
            fontSize="18px"
            fontWeight={500}
          >
            {t(messages.laterPay())}
          </Text>
        </HStack>
        <Arrow size={15} colorIcon={TEXT_PURPLE} />
      </Box>
    </Box>
  );
}

PayLater.propTypes = {
  chooseMethod: PropTypes.func,
};
const mapDispatchToProps = dispatch => ({
  chooseMethod: payType => dispatch(choosePaymentType(payType)),
});

const mapStateToProps = createStructuredSelector({
  payMethod: makeSelectPayType(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PayLater);
