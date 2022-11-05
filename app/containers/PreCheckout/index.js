/*
 * NFTPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { Box, Grid, GridItem, Text, HStack } from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
// import PackagesBox from 'components/PackageBox';
import Metadata from 'components/Metadata';
import { H1 } from 'components/Elements';
import {
  BOX_SHADOW_CHECKOUT,
  TEXT_PURPLE,
  TEXT_GREEN,
  SUB_BLU_COLOR,
} from 'constants/styles';
import { makeSelectCartData } from 'components/Header/selectors';
import Arrow from 'components/Icon/Arrow';
import Wallet from 'components/Icon/Wallet';

// import { loadNFTFilter } from 'containers/NFTFilterProvider/actions';

// import { isAuthor } from 'utils/auth';

// import { InputCustom, SelectCustom, ButtonCustom } from 'components/Controls';

import {} from 'constants/routes';
import {} from './styles';
import { post } from 'utils/request';
import { API_ORG_ACTION_SHOPPINGCART } from 'constants/api';
import { messages } from './messages';

import { loadInfo } from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
} from './selectors';
import CheckoutTable from './CheckoutTable';

const key = 'PreCheckout';
export function PreCheckout({ loading, error, data, onLoadData, cartData }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onLoadData();
  }, []);
  const orgId = window.localStorage.getItem('uid');
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
  const { t } = useTranslation();
  console.log(data, loading, error);
  const { content } = cartData;
  console.log('content', content);
  return (
    <div style={{ width: '100%' }}>
      <Metadata />
      <Grid templateColumns="repeat(6,1fr)" my={6} gap={12}>
        <GridItem colSpan={3}>
          <H1 color={TEXT_GREEN} fontWeight={600} fontSize={25}>
            {t(messages.overview())}
          </H1>
          <Text color={TEXT_PURPLE} fontWeight={600} fontSize={30}>
            {t(messages.overviewDesc())}
          </Text>
          <Box py={4} my={6}>
            {/* {content && content.map(item => <PackagesBox data={item} />)} */}
            <CheckoutTable />
          </Box>
        </GridItem>
        <GridItem mt={20} colStart={5} colEnd={7}>
          <H1 color={TEXT_PURPLE} py={0} fontWeight={600} fontSize={30}>
            {t(messages.method())}
          </H1>
          <Text fontWeight={400} style={{ marginTop: '0px' }} fontSize={15}>
            {t(messages.methodDesc())}
          </Text>
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
            >
              <HStack justifyContent="space-between" width="50%">
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
              <Arrow size={15} colorIcon={TEXT_GREEN} onClick={instantPay} />
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
            >
              <HStack justifyContent="space-between" width="55%">
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
              <Arrow size={15} colorIcon={TEXT_PURPLE} onClick={laterPay} />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </div>
  );
}

PreCheckout.propTypes = {
  onLoadData: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  cartData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  data: makeSelectDetail(),
  cartData: makeSelectCartData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      dispatch(loadInfo());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PreCheckout);
