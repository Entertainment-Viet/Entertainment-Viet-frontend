import React, { memo } from 'react';
import { numberWithCommas, calculateTotalPrice } from 'utils/helpers';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';
import { Text, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { TotalTrayWrapper, WrapperTitleTotal } from '../styles';
import { choosePaymentType } from '../actions';
import { messages } from '../messages';
import { makeSelectPayType } from '../selectors';

const TotalTray = ({ content, payMethod }) => {
  const { t } = useTranslation();
  return (
    <TotalTrayWrapper payMethod={payMethod}>
      <WrapperTitleTotal>
        <Text
          style={{
            marginTop: '0px',
            color: TEXT_PURPLE,
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          {t(messages.packageBoxTotal())}&nbsp;
        </Text>
        <Text
          style={{
            marginTop: '0px',
            color: TEXT_GREEN,
            fontWeight: 400,
            fontSize: 15,
          }}
        >
          &#40;{t(messages.packageBoxSelected())}&nbsp;
          {content.length > 1
            ? `${content.length} packages`
            : `${content.length} package`}
          &#41;
        </Text>
      </WrapperTitleTotal>
      <Box>
        <Text
          style={{
            marginTop: '0px',
            color: TEXT_GREEN,
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          {numberWithCommas(calculateTotalPrice(content))}&nbsp;VND
        </Text>
      </Box>
    </TotalTrayWrapper>
  );
};
TotalTray.propTypes = {
  content: PropTypes.any,
  payMethod: PropTypes.string,
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
export default compose(
  withConnect,
  memo,
)(TotalTray);
