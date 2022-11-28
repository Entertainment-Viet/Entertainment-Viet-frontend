import React, { memo } from 'react';
import { Box, Text, HStack, useToast } from '@chakra-ui/react';
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
import NotificationProvider from 'components/NotificationProvider';
import { PAY_METHOD_VIEW } from '../constants';
import { choosePaymentType } from '../actions';
import { messages } from '../messages';
import { makeSelectPayType } from '../selectors';
function PayLater({ choosePayMethod }) {
  const { t } = useTranslation();
  const orgId = localStorage.getItem('uid');
  const toast = useToast();
  const notify = title => {
    toast({
      position: 'top-right',
      duration: 1500,
      render: () => <NotificationProvider title={title} />,
    });
  };
  function laterPay() {
    const val = {
      paymentType: 'payment.offline',
    };
    post(API_ORG_ACTION_SHOPPINGCART, val, orgId).then(res => {
      if (res >= 400 && res < 500) {
        notify('Thất bại, vui lòng kiểm tra lại thông tin và thử lại sau');
      } else if (res >= 500) {
        notify('Thất bại, lỗi hệ thống. Vui lòng thử lại sau!');
      } else {
        notify('Thành công');
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
        onClick={() => choosePayMethod(PAY_METHOD_VIEW.INSTANT)}
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
        onClick={() => laterPay()}
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
  choosePayMethod: PropTypes.func,
};
const mapDispatchToProps = dispatch => ({
  choosePayMethod: payType => dispatch(choosePaymentType(payType)),
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
