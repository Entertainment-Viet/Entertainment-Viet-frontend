import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TEXT_PURPLE, TEXT_GREEN, SUB_BLU_COLOR } from 'constants/styles';
import { Text, HStack } from '@chakra-ui/react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { BodyPackageCheckout } from '../styles';
import { makeSelectPayType } from '../selectors';
import { choosePaymentType } from '../actions';
import DetailPackage from './DetailPackage';
function PackageCheckout({ data, payMethod }) {
  const distinctTalentName =
    data &&
    data.reduce((acc, current) => {
      const x = acc.find(item => item.talentName === current.talentName);
      if (!x) {
        return acc.concat([current]);
      }
      return acc;
    }, []);
  const distinctTalentId =
    data &&
    data.reduce((acc, current) => {
      const x = acc.find(item => item.talentId === current.talentId);
      if (!x) {
        return acc.concat([current]);
      }
      return acc;
    }, []);
  return (
    <BodyPackageCheckout>
      <HStack
        justifyContent="space-between"
        style={{ padding: '1rem', paddingLeft: '3rem' }}
      >
        <HStack>
          <Text
            style={{ marginTop: '0px', fontWeight: 600 }}
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
              marginLeft: '1rem',
              color: TEXT_PURPLE,
              textDecoration: 'underline',
            }}
            fontWeight={600}
            fontSize={15}
          >
            {distinctTalentName[0].talentName}
          </Text>
        </HStack>
        {payMethod === 'payInstant' && (
          <Text
            style={{
              marginTop: '0px',
              color: TEXT_GREEN,
            }}
            fontWeight={600}
            fontSize={15}
          >
            ID:&nbsp;{distinctTalentId[0].talentId}
          </Text>
        )}
      </HStack>
      {data &&
        data.map(dataPackage => (
          <DetailPackage key={dataPackage.uid} dataPackage={dataPackage} />
        ))}
    </BodyPackageCheckout>
  );
}
PackageCheckout.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  payMethod: PropTypes.string,
};
const mapStateToProps = createStructuredSelector({
  payMethod: makeSelectPayType(),
});

export function mapDispatchToProps(dispatch) {
  return {
    choosePayMethod: paymentType => dispatch(choosePaymentType(paymentType)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(PackageCheckout);
