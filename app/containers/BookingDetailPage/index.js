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

import { Box, Flex } from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';

import PageSpinner from 'components/PageSpinner';
import { useIsMobileView, useIsTabletView } from 'hooks/useIsMobileView';
import BookingGeneralCard from './BookingGeneralCard';
import { loadData } from './actions';

import saga from './saga';
import reducer from './reducer';
import { makeSelectData, makeSelectBookingSuccess } from './selectors';
import BookingDetailCard from './BookingDetailCard';
import TransferInfo from './TransferInfo';
import { ENUM_ROLES } from '../../constants/enums';
const key = 'BookingDetail';
export function BookingDetailPage({ match, onLoadData, data, loading }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const role = localStorage.getItem('role');
  const isTablet = useIsTabletView();
  const isMobile = useIsMobileView();

  const isMobileView = isTablet || isMobile;
  useEffect(() => {
    const talentId = window.localStorage.getItem('uid');
    onLoadData(match.params.id, talentId);
  }, [match.params.id]);

  return (
    <div>
      <Metadata />
      {data || !loading ? (
        /* <Grid templateColumns="repeat(6,1fr)" my={6} gap={12}>
        <GridItem colSpan={2}>
          <VStack
            border="1px solid #718096"
            p={4}
            spacing={6}
            align="flex-start"
          >
            <Text>Khách: </Text>
            <Text>Thời gian biểu diễn: </Text>
            <Text>Địa điểm: </Text>
            <Text>Category: </Text>
          </VStack>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <VStack
            border="1px solid #718096"
            p={4}
            spacing={6}
            align="flex-start"
          >
            <H1>Tiêu đề mô tả: </H1>
            <Container color={PRI_TEXT_COLOR}>
              {parserHtml('<p>dawdawdaw</p>')}
            </Container>
            <Divider />
            <H1>Các yêu cầu cụ thể: </H1>
            <Container color={PRI_TEXT_COLOR}>
              {parserHtml('<p>dawdawdaw</p>')}
            </Container>
            <H1>Hình thức làm việc: </H1>
            <Container color={PRI_TEXT_COLOR}>
              {parserHtml('<p>dawdawdaw</p>')}
            </Container>
            <H1>Hình thức thanh toán: </H1>
            <Container color={PRI_TEXT_COLOR}>
              {parserHtml('<p>dawdawdaw</p>')}
            </Container>
          </VStack>
        </GridItem>
      </Grid> */
        <Flex
          zIndex={1}
          position="relative"
          gap={4}
          flexDirection={isMobileView ? 'column' : 'row'}
        >
          <BookingGeneralCard data={data} />
          <Box w={!isMobileView ? '65%' : '100%'} flexGrow={1}>
            <BookingDetailCard data={data} />

            {role === ENUM_ROLES.ORG && (
              <TransferInfo bookingCode={data.bookingCode} total={data.total} />
            )}
          </Box>
        </Flex>
      ) : (
        <PageSpinner />
      )}
    </div>
  );
}

BookingDetailPage.propTypes = {
  match: PropTypes.object,
  onLoadData: PropTypes.func,
  loading: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectBookingSuccess(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: (id, talentId) => {
      dispatch(loadData(id, talentId));
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
)(BookingDetailPage);
