import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { Box, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { H1 } from 'components/Elements';
import PageSpinner from 'components/PageSpinner';
import { TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';
import { makeSelectCartData } from 'components/Header/selectors';
import { messages } from './messages';
import { loadInfo } from './actions';
import { HeaderCheckout } from './styles';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
  makeSelectPayType,
} from './selectors';
import PackageCheckout from './PackageCheckout';
import PayMethod from './PayMethod';
import TotalTray from './PackageCheckout/TotalTray';

const key = 'PreCheckout';
export function PreCheckout({ onLoadData, cartData }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    onLoadData();
  }, []);

  const { t } = useTranslation();
  const { content } = cartData;
  const sortedPackage =
    content && content.sort((a, b) => a.talentName.localeCompare(b.talentName));

  // group all the same elements have same talentName into an array of array
  const groupPackage = sortedPackage
    ? sortedPackage.reduce((result, curr) => {
        // eslint-disable-next-line no-param-reassign
        result[curr.talentName] = [...(result[curr.talentName] || []), curr];
        return result;
      }, {})
    : [];

  // get object values is subArray of a big array
  const groupPackageToArray = Object.values(groupPackage);

  return sortedPackage ? (
    <div style={{ width: '100%' }}>
      <Metadata />
      <Grid templateColumns="repeat(6,1fr)" my={6} gap={12}>
        <GridItem colSpan={3}>
          <H1 color={TEXT_GREEN} fontSize="25">
            {t(messages.overview())}
          </H1>
          <Text color={TEXT_PURPLE} fontWeight={600} fontSize={30}>
            {t(messages.overviewDesc())}
          </Text>
          <Box py={4} my={6}>
            {content.length > 0 && (
              <HeaderCheckout>
                <Box w="65%">
                  <Text
                    style={{
                      marginTop: '0px',
                      color: TEXT_PURPLE,
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    {t(messages.packageTitle())}
                  </Text>
                </Box>
                <VStack
                  flexDir="row"
                  justifyContent="space-between"
                  width="35%"
                >
                  <Text style={{ marginTop: '0px', color: TEXT_PURPLE }}>
                    {t(messages.packagePrice())}
                  </Text>
                  <Text style={{ marginTop: '0px', color: TEXT_PURPLE }}>
                    {t(messages.packageAction())}
                  </Text>
                </VStack>
              </HeaderCheckout>
            )}
            {groupPackageToArray &&
              groupPackageToArray.map((item, indexItem) => (
                <PackageCheckout
                  // eslint-disable-next-line react/no-array-index-key
                  key={indexItem}
                  data={item}
                />
              ))}
          </Box>
          {sortedPackage.length > 0 && <TotalTray content={sortedPackage} />}
        </GridItem>
        <GridItem mt={20} colStart={5} colEnd={7}>
          <PayMethod />
        </GridItem>
      </Grid>
    </div>
  ) : (
    <PageSpinner />
  );
}

PreCheckout.propTypes = {
  onLoadData: PropTypes.func,
  cartData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  data: makeSelectDetail(),
  cartData: makeSelectCartData(),
  payMethod: makeSelectPayType(),
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
