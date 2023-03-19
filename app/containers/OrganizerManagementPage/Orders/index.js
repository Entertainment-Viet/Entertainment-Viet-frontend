import React, { memo, useEffect, useState } from 'react';
import { HStack, Text, Flex, Box, Button, Link } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import PageSpinner from 'components/PageSpinner';
import {
  PRI_TEXT_COLOR,
  TEXT_GREEN,
  RED_COLOR,
  SUB_BLU_COLOR,
  TEXT_PURPLE,
} from 'constants/styles';
import styled from 'styled-components';
import AdvancedTable from 'components/AdvancedTable';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { ROUTE_BOOKING_DETAIL_MANAGER } from 'constants/routes';
import { messages } from '../messages';
import { changePage, changeLimit, loadBookings } from './slice/actions';
import saga from './slice/saga';
import reducer from './slice/reducer';
import {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectPaging,
  makeSelectData,
  makeSelectUnpaidSum,
  makeSelectPage,
  makeSelectLimit,
} from './slice/selectors';
import { numberWithCommas } from '../../../utils/helpers';
const StatusCell = styled(Text)`
  text-align: center;
  padding: 5px;
  background: ${props => {
    switch (props.type) {
      case 'UPCOMING':
        return '#00C2FF';
      case 'waiting':
        return '#999999';
      case 'booking.status.talent-pending':
        return '#DBB325';
      case 'booking.status.organizer-pending':
        return '#DBB325';
      case 'pendingTransaction':
        return '#4527A0';
      case 'request-user':
        return 'rgb(225 29 72)';
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
const bookingsColumns = [
  {
    Header: 'Booking date',
    accessor: 'createdAt',
  },
  {
    Header: 'Perform date and time',
    accessor: 'date',
  },
  {
    Header: 'Package',
    accessor: 'package',
  },
  {
    Header: 'Organizer',
    accessor: 'organizer',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Price',
    accessor: 'price',
  },
  {
    Header: '',
    accessor: 'action',
  },
];

const key = 'Orders';
const Orders = ({
  data,
  paging,
  handlePageChange,
  handleLimitChange,
  // eslint-disable-next-line no-shadow
  loadBookings,
  unpaidSum,
  page,
  limit,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState('booking.status.talent-pending');
  const [hasFilterStatus, setHasFilterStatus] = useState(false);
  const [isFilterAll, setIsFilterAll] = useState(true);
  const [isFilterUpcoming, setIsFilterUpcoming] = useState(false);

  useEffect(() => {
    loadBookings(status, hasFilterStatus, isFilterAll, isFilterUpcoming);
  }, [status, hasFilterStatus, isFilterAll, isFilterUpcoming, page, limit]);

  const handleChangeStatus = (activeTemp, statusTemp) => {
    setStatus(statusTemp);
    setActive(activeTemp);
    setIsFilterUpcoming(false);
    setIsFilterAll(false);
    setHasFilterStatus(true);
  };

  const handleFilterUpcoming = () => {
    setStatus(null);
    setActive(1);
    setIsFilterUpcoming(true);
    setIsFilterAll(false);
    setHasFilterStatus(false);
  };

  const handleFilterAll = () => {
    setStatus(null);
    setActive(0);
    setIsFilterUpcoming(false);
    setIsFilterAll(true);
    setHasFilterStatus(false);
  };

  let tableBookings;
  if (data) {
    tableBookings = data.map(booking => ({
      createdAt: (
        <Text>{new Date(booking.createdAt).toLocaleDateString()}</Text>
      ),
      date: (
        <Box>
          <Box sx={{ marginBottom: '5px' }}>
            <Text>
              {new Date(
                booking.jobDetail.performanceStartTime,
              ).toLocaleDateString()}
            </Text>
          </Box>
          <Text>
            {`${new Date(
              booking.jobDetail.performanceStartTime,
            ).getHours()}:${new Date(
              booking.jobDetail.performanceStartTime,
            ).getMinutes()}:${new Date(
              booking.jobDetail.performanceStartTime,
            ).getSeconds()}`}{' '}
            -
            {`${new Date(
              booking.jobDetail.performanceEndTime,
            ).getHours()}:${new Date(
              booking.jobDetail.performanceEndTime,
            ).getMinutes()}:${new Date(
              booking.jobDetail.performanceEndTime,
            ).getSeconds()}`}
          </Text>
        </Box>
      ),
      package: <Text>{booking.packageName}</Text>,
      organizer: <Text>{booking.organizerName}</Text>,
      status: (
        <StatusCell type={booking.isPaid ? 'active' : 'disable'}>
          {booking.isPaid ? 'Paid' : 'Unpaid'}
        </StatusCell>
      ),
      price: `${numberWithCommas(
        booking.jobDetail.price.min,
      )} - ${numberWithCommas(booking.jobDetail.price.max)}`,
      action: (
        <HStack>
          <Link
            href={`${ROUTE_BOOKING_DETAIL_MANAGER.replace(':id', booking.uid)}`}
          >
            <Button colorScheme="gray" size="xs">
              {t(messages.detail())}
            </Button>
          </Link>
          <Button colorScheme="red" size="xs">
            {t(messages.delete())}
          </Button>
        </HStack>
      ),
    }));
  }
  const pageProps = {
    total: paging.totalElements,
    pageNumber: paging.pageNumber, // pageNumber
    limit: paging.pageSize, // pageSize
    isLast: paging.last,
  };

  return (
    <Box color={PRI_TEXT_COLOR} w="90vw">
      <Box
        display="d-flex"
        justifyContent="space-between"
        sx={{
          marginBottom: '20px',
        }}
      >
        <Box
          display="flex"
          sx={{
            marginTop: '40px',
          }}
        >
          <Button
            borderBottom="1px solid"
            bg="transparent"
            sx={{
              borderRadius: '0',
              borderColor: active === 0 ? TEXT_GREEN : 'transparent',
              fontWeight: '10px',
            }}
            onClick={() => handleFilterAll()}
            color={active === 0 ? TEXT_PURPLE : 'white'}
          >
            {t(messages.all())}
          </Button>
          <Button
            borderBottom="1px solid"
            bg="transparent"
            sx={{
              borderRadius: '0',
              borderColor: active === 1 ? TEXT_GREEN : 'transparent',
              fontWeight: '10px',
            }}
            onClick={() => handleFilterUpcoming()}
            color={active === 1 ? TEXT_PURPLE : 'white'}
          >
            {t(messages.upcoming())}
          </Button>
          <Button
            borderBottom="1px solid"
            bg="transparent"
            sx={{
              borderRadius: '0',
              borderColor: active === 2 ? TEXT_GREEN : 'transparent',
              fontWeight: '10px',
            }}
            onClick={() =>
              handleChangeStatus(2, 'booking.status.talent-pending')
            }
            color={active === 2 ? TEXT_PURPLE : 'white'}
          >
            {t(messages.pending())}
          </Button>
          <Button
            borderBottom="1px solid"
            bg="transparent"
            sx={{
              borderRadius: '0',
              borderColor: active === 5 ? TEXT_GREEN : 'transparent',
              fontWeight: '10px',
            }}
            onClick={() => handleChangeStatus(5, 'booking.status.confirmed')}
            color={active === 5 ? TEXT_PURPLE : 'white'}
          >
            Pending done
          </Button>
          <Button
            borderBottom="1px solid"
            bg="transparent"
            sx={{
              borderRadius: '0',
              borderColor: active === 6 ? TEXT_GREEN : 'transparent',
              fontWeight: '10px',
            }}
            onClick={() =>
              handleChangeStatus(6, 'booking.status.talent-finished')
            }
            color={active === 6 ? TEXT_PURPLE : 'white'}
          >
            Waiting for you to confirm
          </Button>
          <Button
            borderBottom="1px solid"
            bg="transparent"
            sx={{
              borderRadius: '0',
              borderColor: active === 3 ? TEXT_GREEN : 'transparent',
              fontWeight: '10px',
            }}
            onClick={() => handleChangeStatus(3, 'booking.status.finished')}
            color={active === 3 ? TEXT_PURPLE : 'white'}
          >
            {t(messages.done())}
          </Button>
          <Button
            borderBottom="1px solid"
            bg="transparent"
            sx={{
              borderRadius: '0',
              borderColor: active === 4 ? TEXT_GREEN : 'transparent',
              fontWeight: '10px',
            }}
            onClick={() => handleChangeStatus(4, 'booking.status.cancelled')}
            color={active === 4 ? TEXT_PURPLE : 'white'}
          >
            {t(messages.canceled())}
          </Button>
        </Box>
        <Box>
          <Box
            width="336px"
            height="81px"
            bg={SUB_BLU_COLOR}
            borderRadius="5px"
            p={5}
          >
            <Box display="d-flex" justifyContent="space-between">
              <Box fontWeight="400px" fontSize="15px" lineHeight="18px">
                {t(messages.budget())}
              </Box>
              <Box
                fontWeight="400px"
                fontSize="10px"
                lineHeight="12px"
                color={TEXT_PURPLE}
                sx={{
                  textDecoration: 'underline',
                }}
              >
                {t(messages.detail())}
              </Box>
            </Box>
            <Box
              fontWeight="600px"
              fontSize="30px"
              lineHeight="42px"
              color={TEXT_GREEN}
            >
              ${numberWithCommas(unpaidSum)}
            </Box>
          </Box>
        </Box>
      </Box>
      {!data ? (
        <PageSpinner />
      ) : (
        <Flex zIndex={1} position="relative" gap={4}>
          <Box w="100%" flexGrow={1}>
            <AdvancedTable
              columns={bookingsColumns}
              data={tableBookings || []}
              {...pageProps}
              handlePageChange={handlePageChange}
              setLimit={handleLimitChange}
            />
          </Box>
        </Flex>
      )}
    </Box>
  );
};

Orders.propTypes = {
  match: PropTypes.object,
  paging: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handlePageChange: PropTypes.func,
  handleLimitChange: PropTypes.func,
  loadBookings: PropTypes.func,
  bookings: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  unpaidSum: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  page: PropTypes.number,
  limit: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  paging: makeSelectPaging(),
  data: makeSelectData(),
  unpaidSum: makeSelectUnpaidSum(),
  page: makeSelectPage(),
  limit: makeSelectLimit(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handlePageChange: page => {
      dispatch(changePage(page));
    },
    handleLimitChange: limit => {
      dispatch(changeLimit(limit));
    },
    loadBookings: (status, hasFilterStatus, isFilterAll, isFilterUpcoming) => {
      dispatch(
        loadBookings(status, hasFilterStatus, isFilterAll, isFilterUpcoming),
      );
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
)(Orders);
