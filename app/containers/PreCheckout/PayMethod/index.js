import React, { memo } from 'react';
import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { TEXT_PURPLE } from 'constants/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { H1 } from 'components/Elements';
import { choosePaymentType } from '../actions';
import { messages } from '../messages';
import { makeSelectPayType } from '../selectors';
import PayLater from './PayLater';
import PayInstant from './PayInstant';
function PayMethod({ payMethod }) {
  const { t } = useTranslation();
  return (
    <div style={{ width: '80%' }}>
      <H1 color={TEXT_PURPLE} py={0} fontSize="30" whiteSpace="nowrap">
        {payMethod === 'payLater'
          ? t(messages.method())
          : t(messages.methodPay())}
      </H1>
      <Text
        fontWeight={400}
        lineHeight="18px"
        style={{ marginTop: '0px' }}
        fontSize={15}
      >
        {payMethod === 'payLater'
          ? t(messages.methodDesc())
          : t(messages.methodDescPay())}
      </Text>
      {payMethod === 'payLater' ? <PayLater /> : <PayInstant />}
    </div>
  );
}
PayMethod.propTypes = {
  payMethod: PropTypes.string,
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
)(PayMethod);
