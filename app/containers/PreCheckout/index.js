import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { H1 } from 'components/Elements';
import PageSpinner from 'components/PageSpinner';
import { TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';
import { makeSelectCartData } from 'components/Header/selectors';
import { messages } from './messages';
import { loadInfo } from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
} from './selectors';
import PackageCheckout from './PackageCheckout/index';
import PayMethod from './PayMethod/index';
import TotalTray from './PackageCheckout/TotalTray';

const key = 'PreCheckout';
export function PreCheckout({ loading, error, data, onLoadData, cartData }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onLoadData();
  }, []);

  const { t } = useTranslation();
  const { content } = cartData;
  const sortedPackage =
    content && content.sort((a, b) => a.talentName.localeCompare(b.talentName));

  return sortedPackage ? (
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
            {sortedPackage.map(item => (
              <PackageCheckout key={item.uid} data={item} />
            ))}
          </Box>
          {<TotalTray content={content} />}
        </GridItem>
        <GridItem mt={20} colStart={5} colEnd={7}>
          <PayMethod isPayLater={false} />
        </GridItem>
      </Grid>
    </div>
  ) : (
    <PageSpinner />
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
