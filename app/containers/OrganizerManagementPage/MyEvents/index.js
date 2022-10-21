import React, { memo, useEffect } from 'react';
import { HStack, Text, Flex, Box, Link, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import PageSpinner from 'components/PageSpinner';
import { PRI_TEXT_COLOR, TEXT_GREEN, RED_COLOR } from 'constants/styles';
import styled from 'styled-components';
import AdvancedTable from 'components/AdvancedTable';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { API_EVENT_DETAIL } from 'constants/api';
import { del } from 'utils/request';
import { ENUM_BOOKING_STATUS } from 'constants/enums';
import { messages } from '../messages';
import { CustomButton } from '../styles';
import {
  changePage,
  loadEvents,
  changeMode,
  changeLimit,
  loadEventInfo,
} from './slice/actions';
import saga from './slice/saga';
import reducer from './slice/reducer';
import {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
  makeSelectEvent,
  makeSelectMode,
  makeSelectPaging,
  makeSelectEventInfo,
} from './slice/selectors';
import EventDetailCard from './EventDetailCard';
import { numberWithCommas } from '../../../utils/helpers';
import { globalMessages } from '../../App/globalMessage';
const StatusCell = styled(Text)`
  text-align: center;
  padding: 5px;
  background: ${props => {
    switch (props.type) {
      case ENUM_BOOKING_STATUS.ARCHIVED:
        return '#DCDCDC';
      case ENUM_BOOKING_STATUS.TALENT_PENDING:
        return '#DBB325';
      case ENUM_BOOKING_STATUS.ORG_PENDING:
        return '#DBB325';
      case ENUM_BOOKING_STATUS.TALENT_FINISHED:
        return '#B6FF6D';
      case ENUM_BOOKING_STATUS.ORG_FINISHED:
        return '#B6FF6D';
      case ENUM_BOOKING_STATUS.FINISHED:
        return '#B6FF6D';
      case ENUM_BOOKING_STATUS.CONFIRMED:
        return '#FFA500';
      case ENUM_BOOKING_STATUS.CANCELLED:
        return '#FF0000';
      default:
        return 'transparent';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'disable':
        return `${RED_COLOR}!important`;
      case 'active':
        return `${TEXT_GREEN}!important`;
      default:
        return 'black !important';
    }
  }};
`;
const eventColumns = [
  {
    Header: 'Event Name',
    accessor: 'eventName',
  },
  {
    Header: 'Số lượt apply',
    accessor: 'totalApply',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Action',
    accessor: 'action',
  },
];
const bookingColumns = [
  {
    Header: 'Ngày đặt',
    accessor: 'bookedDate',
  },
  {
    Header: 'Người đặt',
    accessor: 'booker',
  },
  {
    Header: 'Giá tiền min',
    accessor: 'priceMin',
  },
  {
    Header: 'Giá tiền max',
    accessor: 'priceMax',
  },
  {
    Header: 'Hình thức thanh toán',
    accessor: 'paymentType',
  },
  {
    Header: 'STATUS',
    accessor: 'status',
  },
];
const key = 'MyEvents';
const MyEvents = ({
  data,
  mode,
  onLoadData,
  handleModeChange,
  paging,
  handlePageChange,
  handleLimitchange,
  loadEvent,
  eventInfo,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();

  useEffect(() => {
    onLoadData();
  }, []);
  const userId = localStorage.getItem('uid');
  function handleDelete(id) {
    del(`${API_EVENT_DETAIL}/${id}`, {}, userId).then(res1 => {
      console.log(res1);
      if (res1 > 300) {
        console.log('error');
      } else {
        onLoadData(userId);
      }
    });
  }
  let tableEvent;
  let tableBooking;
  if (data) {
    if (mode === 0)
      tableEvent = data.map(event => ({
        eventName: (
          <Text
            onClick={() => {
              handleModeChange(1);
              onLoadData(event.uid);
              handlePageChange(0);
              loadEvent(event.uid, userId);
            }}
          >
            {event.name}
          </Text>
        ),
        totalApply: 0,
        status: (
          <StatusCell type={event.isActive ? 'active' : 'disable'}>
            {event.isActive ? 'Active' : 'Disable'}
          </StatusCell>
        ),
        action: (
          <HStack>
            <Button colorScheme="purple" size="xs">
              {t(messages.edit())}
            </Button>
            <Button
              colorScheme="red"
              size="xs"
              onClick={() => handleDelete(event.uid)}
            >
              {t(messages.delete())}
            </Button>
          </HStack>
        ),
      }));
    else
      tableBooking = data.map(booking => {
        const { jobDetail } = booking;
        return {
          bookedDate: (
            <Flex align="center">
              <Link href={`/booking/${booking.uid}`}>
                <Text>{new Date(booking.createdAt).toLocaleString()}</Text>
              </Link>
            </Flex>
          ),
          booker: booking.organizerName,
          priceMin: numberWithCommas(jobDetail.price.min),
          priceMax: numberWithCommas(jobDetail.price.max),
          paymentType: booking.paymentType,
          status: (
            <StatusCell type={booking.status}>
              {t(globalMessages[booking.status])}
            </StatusCell>
          ),
        };
      });
  }
  const pageProps = {
    total: paging.totalElements,
    pageNumber: paging.pageNumber, // pageNumber
    limit: paging.pageSize, // pageSize
    isLast: paging.last,
  };

  function handleBack() {
    handleModeChange(0);
    handlePageChange(0);
  }
  return (
    <Box color={PRI_TEXT_COLOR}>
      <Flex justifyContent="space-between" mb={2}>
        {mode === 1 ? (
          <CustomButton onClick={handleBack}>{t(messages.back())}</CustomButton>
        ) : null}
        <Link href="/event/create">
          <CustomButton>{t(messages.createEvent())}</CustomButton>
        </Link>
      </Flex>
      {!data ? (
        <PageSpinner />
      ) : (
        <Flex zIndex={1} position="relative" gap={4}>
          {mode === 1 ? <EventDetailCard data={eventInfo} /> : null}
          <Box w={mode === 1 ? 'auto' : '100%'} flexGrow={1}>
            <AdvancedTable
              columns={mode === 0 ? eventColumns : bookingColumns}
              data={mode === 0 ? tableEvent : tableBooking}
              {...pageProps}
              handlePageChange={handlePageChange}
              setLimit={handleLimitchange}
            />
          </Box>
        </Flex>
      )}
    </Box>
  );
};

MyEvents.propTypes = {
  match: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  mode: PropTypes.number,
  onLoadData: PropTypes.func,
  loadEvent: PropTypes.func,
  handleModeChange: PropTypes.func,
  paging: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handlePageChange: PropTypes.func,
  handleLimitchange: PropTypes.func,
  eventInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  data: makeSelectDetail(),
  eventId: makeSelectEvent(),
  mode: makeSelectMode(),
  paging: makeSelectPaging(),
  eventInfo: makeSelectEventInfo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: id => {
      dispatch(loadEvents(id));
    },
    handlePageChange: page => {
      dispatch(changePage(page));
      dispatch(loadEvents());
    },
    handleModeChange: mode => {
      dispatch(changeMode(mode));
    },
    handleLimitchange: limit => {
      dispatch(changeLimit(limit));
      dispatch(loadEvents());
    },
    loadEvent: (id, orgId) => {
      dispatch(loadEventInfo(id, orgId));
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
)(MyEvents);
