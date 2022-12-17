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
import { useTranslation } from 'react-i18next';
import { createStructuredSelector } from 'reselect';

import {
  Container,
  VStack,
  HStack,
  Grid,
  GridItem,
  Text,
  Box,
  Image,
  Divider,
  Flex,
} from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import parserHtml from 'utils/html';
import Metadata from 'components/Metadata';
import { PRI_TEXT_COLOR, RED_COLOR } from 'constants/styles';

import PageSpinner from 'components/PageSpinner';
import styled from 'styled-components';
import BookingGeneralCard from './BookingGeneralCard';
import Arrow from './assets/arrow.svg';
import { loadData } from './actions';

import {} from 'constants/routes';
import {} from './styles';
import { messages } from './messages';

import saga from './saga';
import reducer from './reducer';
import { makeSelectData, makeSelectBookingSuccess } from './selectors';
import BookingDetailCard from './BookingDetailCard';

const key = 'BookingDetail';
export function BookingDetailPage({ match, onLoadData, data, loading }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();

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
        <Flex zIndex={1} position="relative" gap={4}>
          <BookingGeneralCard data={data} />
          <Box w="65%" flexGrow={1}>
            <BookingDetailCard data={data} />
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
