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
import { API_GET_PACKAGE_INFO } from 'constants/api';
import { del } from 'utils/request';
import { messages } from '../messages';
import { CustomButton } from '../styles';
import {
  changePage,
  loadPackages,
  changeMode,
  changeLimit,
  loadPackageInfo,
} from './slice/actions';
import saga from './slice/saga';
import reducer from './slice/reducer';
import {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
  makeSelectPackage,
  makeSelectMode,
  makeSelectPaging,
  makeSelectPackageInfo,
} from './slice/selectors';
import PackageDetailCard from './PackageDetailCard';

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
const packageColumns = [
  {
    Header: 'Package',
    accessor: 'package',
  },
  {
    Header: 'Số lượt đặt',
    accessor: 'totalBooking',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Giá tiền',
    accessor: 'price',
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
const key = 'MyPackage';
const MyPackage = ({
  data,
  mode,
  onLoadData,
  handleModeChange,
  paging,
  handlePageChange,
  handleLimitchange,
  loadPackage,
  packageInfo,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();

  useEffect(() => {
    onLoadData();
  }, []);
  const userId = window.localStorage.getItem('uid');
  function handleDelete(id) {
    del(`${API_GET_PACKAGE_INFO}/${id}`, {}, userId).then(res1 => {
      console.log(res1);
      if (res1 > 300) {
        console.log('error');
      } else {
        onLoadData(userId);
      }
    });
  }
  let tablePackage;
  let tableBooking;
  if (data) {
    if (mode === 0)
      tablePackage = data.map(user => ({
        package: (
          <Text
            onClick={() => {
              handleModeChange(1);
              onLoadData(user.uid);
              handlePageChange(0);
              loadPackage(user.uid, userId);
            }}
          >
            {user.name}
          </Text>
        ),
        price: `${user.jobDetail.price.max} - ${user.jobDetail.price.max}`,
        status: (
          <StatusCell type={user.isActive ? 'active' : 'disable'}>
            {user.isActive ? 'Active' : 'Disable'}
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
              onClick={() => handleDelete(user.uid)}
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
          priceMin: jobDetail.price.min,
          priceMax: jobDetail.price.max,
          paymentType: booking.paymentType,
          status: (
            <StatusCell type={booking.status}>{booking.status}</StatusCell>
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
        <Link href="/create-package">
          <CustomButton>{t(messages.createPackage())}</CustomButton>
        </Link>
      </Flex>
      {!data ? (
        <PageSpinner />
      ) : (
        <Flex zIndex={1} position="relative" gap={4}>
          {mode === 1 ? <PackageDetailCard data={packageInfo} /> : null}
          <Box w={mode === 1 ? 'auto' : '100%'} flexGrow={1}>
            <AdvancedTable
              columns={mode === 0 ? packageColumns : bookingColumns}
              data={mode === 0 ? tablePackage : tableBooking}
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

MyPackage.propTypes = {
  match: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  mode: PropTypes.number,
  onLoadData: PropTypes.func,
  loadPackage: PropTypes.func,
  handleModeChange: PropTypes.func,
  paging: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handlePageChange: PropTypes.func,
  handleLimitchange: PropTypes.func,
  packageInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  data: makeSelectDetail(),
  packageId: makeSelectPackage(),
  mode: makeSelectMode(),
  paging: makeSelectPaging(),
  packageInfo: makeSelectPackageInfo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: id => {
      dispatch(loadPackages(id));
    },
    handlePageChange: page => {
      dispatch(changePage(page));
      dispatch(loadPackages());
    },
    handleModeChange: mode => {
      dispatch(changeMode(mode));
    },
    handleLimitchange: limit => {
      dispatch(changeLimit(limit));
      dispatch(loadPackages());
    },
    loadPackage: (id, talentId) => {
      dispatch(loadPackageInfo(id, talentId));
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
)(MyPackage);
