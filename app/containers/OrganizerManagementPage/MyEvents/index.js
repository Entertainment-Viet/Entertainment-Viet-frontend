/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { memo, useEffect, useState } from 'react';
import { HStack, Text, Flex, Box, Link, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import PageSpinner from 'components/PageSpinner';
import { PRI_TEXT_COLOR, TEXT_GREEN, RED_COLOR } from 'constants/styles';
import styled from 'styled-components';
import AdvancedTable from 'components/AdvancedTable';
import SliderRange from 'components/SliderRange';
import SearchLocation from 'components/SearchLocation';
import { connect } from 'react-redux';
import { DateTimeCustom } from 'components/Controls';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import CategoriesFilter from 'components/CategoriesFilter';
import { ENUM_BOOKING_STATUS } from 'constants/enums';
import {
  numberWithCommas,
  handleAddress,
  toIsoString,
  classifyCategories,
} from 'utils/helpers';
import { messages } from '../messages';
import { CustomButton } from '../styles';
import {
  changePage,
  loadEvents,
  changeMode,
  changeLimit,
  loadEventInfo,
  loadCategories,
  // changeCategory,
  changeStart,
  changeEnd,
  loadLocation,
  loadData,
  changeCity,
  changeDistrict,
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
  makeSelectCategory,
  makeSelectCategories,
  makeSelectCity,
  makeSelectLocationData,
  makeSelectEventInfo,
} from './slice/selectors';
import EventDetailCard from './EventDetailCard';
import { globalMessages } from '../../App/globalMessage';
import PositionDetailCard from './PositionDetailCard';

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
    Header: 'Địa chỉ',
    accessor: 'address',
  },
  {
    Header: 'Thời gian',
    accessor: 'time',
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
const positionsColumns = [
  {
    Header: 'Categories',
    accessor: 'categories',
  },
  {
    Header: 'Số lượt apply',
    accessor: 'totalApply',
  },
  {
    Header: 'Số lượng slot',
    accessor: 'totalSlot',
  },
  {
    Header: 'Thời gian',
    accessor: 'time',
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
    Header: 'Talent apply',
    accessor: 'applicant',
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
  onLoadTableData,
  handleModeChange,
  paging,
  handlePageChange,
  handleLimitChange,
  onLoadDetailData,
  eventInfo,
  handleCityChange,
  handleDistrictChange,
  categories,
  onLoadCategory,
  locationData,
  city,
  handleStartChange,
  handleEndChange,
  onLoadLocation,
  handleBudgetChange,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const [categoriesFiltered, setCategoriesFiltered] = useState([]);
  const cityData =
    locationData &&
    locationData.filter(item => item.locationType.type === 'city');

  const districtData =
    locationData &&
    city &&
    locationData.filter(
      item => item.locationType.type === 'district' && item.parentUid === city,
    );
  useEffect(() => {
    if (mode === 0) {
      onLoadTableData();
      onLoadLocation();
      onLoadCategory();
    }
  }, []);
  useEffect(() => {
    const categoriesClassified = classifyCategories(categories);
    setCategoriesFiltered(categoriesClassified);
  }, [categories]);
  const userId = localStorage.getItem('uid');
  // const cityData = locationData && locationData.map(item => item.parentName);
  // const cityNameList = cityData && Array.from(new Set(cityData));
  // const districtData =
  //   locationData &&
  //   city &&
  //   locationData.filter(
  //     item =>
  //       item.locationType.type === 'district' &&
  //       item.locationType.level === 2 &&
  //       item.parentName === city,
  //   );
  // function handleDelete(id) {
  //   del(`${API_EVENT_DETAIL}/${id}`, {}, userId).then(res1 => {
  //     console.log(res1);
  //     if (res1 > 300) {
  //       console.log('error');
  //     } else {
  //       onLoadTableData(userId);
  //     }
  //   });
  // }
  let tableEvent;
  let tablePositions;
  let tableBooking;
  if (data) {
    if (mode === 0)
      tableEvent = data.map(event => ({
        eventName: (
          <Text
            onClick={() => {
              handleModeChange(1);
              onLoadTableData(event.uid);
              handlePageChange(0);
              onLoadDetailData(event.uid, userId);
            }}
          >
            {event.name}
          </Text>
        ),
        address: handleAddress(event.occurrenceAddress),
        time: (
          <Text>
            {new Date(event.occurrenceStartTime).toLocaleString()} -{' '}
            {new Date(event.occurrenceEndTime).toLocaleString()}
          </Text>
        ),
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
              // onClick={() => handleDelete(event.uid)}
            >
              {t(messages.delete())}
            </Button>
          </HStack>
        ),
      }));
    else if (mode === 1)
      tablePositions = data.map(position => ({
        categories: (
          <Text
            onClick={() => {
              handleModeChange(2);
              onLoadTableData(position.eventId, position.uid);
              handlePageChange(0);
              onLoadDetailData(position.eventId, position.uid);
            }}
          >
            {position.jobOffer.jobDetail.category &&
              position.jobOffer.jobDetail.category.name}
          </Text>
        ),
        totalSlot: position.quantity,
        totalApply: position.applicantCount,
        time: (
          <Text>
            {new Date(
              position.jobOffer.jobDetail.performanceStartTime,
            ).toLocaleString()}{' '}
            -{' '}
            {new Date(
              position.jobOffer.jobDetail.performanceEndTime,
            ).toLocaleString()}
          </Text>
        ),
        status: (
          <StatusCell type={position.isActive ? 'active' : 'disable'}>
            {position.isActive ? 'Active' : 'Disable'}
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
              // onClick={() => handleDelete(position.uid)}
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
          applicant: booking.talentName,
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
    handleModeChange(mode - 1);
    handlePageChange(0);
  }
  return (
    <Box color={PRI_TEXT_COLOR}>
      <Flex justifyContent="space-between" mb={2}>
        {mode === 1 || mode === 2 ? (
          <CustomButton onClick={handleBack}>{t(messages.back())}</CustomButton>
        ) : null}
        {mode === 0 ? (
          <HStack maxW="100%" mb="6">
            <CategoriesFilter
              placeholder="Categories"
              typePage="manager"
              listOptions={categoriesFiltered}
            />
            <SearchLocation
              placeholder={t(messages.locationCity())}
              optionList={cityData}
              handleChangeLocation={handleCityChange}
            />
            {city && (
              <SearchLocation
                placeholder={t(messages.locationDistrict())}
                handleChangeLocation={handleDistrictChange}
                optionList={districtData}
              />
            )}
            <SliderRange
              titleRange={t(messages.incomeRange())}
              loadDataAction={handleBudgetChange}
            />
            <Text>Start time</Text>
            <Box>
              <DateTimeCustom
                template="datetime-picker right"
                name="end_vip_date"
                type="hm"
                message="Start date"
                handleDateChange={handleStartChange}
              />
            </Box>
            <Text>End time</Text>
            <Box>
              <DateTimeCustom
                template="datetime-picker right"
                name="end_vip_date"
                type="hm"
                message="End date"
                handleDateChange={handleEndChange}
              />
            </Box>
            <Link href="/event/create">
              <CustomButton>{t(messages.createEvent())}</CustomButton>
            </Link>
          </HStack>
        ) : (
          <Link href={`/create-position/${eventInfo.uid}`}>
            <CustomButton>{t(messages.createPosition())}</CustomButton>
          </Link>
        )}
      </Flex>
      {!data ? (
        <PageSpinner />
      ) : (
        <Flex zIndex={1} position="relative" gap={4}>
          {mode === 1 ? (
            <EventDetailCard data={eventInfo} />
          ) : mode === 2 ? (
            <PositionDetailCard data={eventInfo} />
          ) : null}
          <Box w={mode === 1 || mode === 2 ? 'auto' : '100%'} flexGrow={1}>
            <AdvancedTable
              columns={
                mode === 0
                  ? eventColumns
                  : mode === 1
                  ? positionsColumns
                  : bookingColumns
              }
              data={
                mode === 0
                  ? tableEvent
                  : mode === 1
                  ? tablePositions
                  : tableBooking
              }
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

MyEvents.propTypes = {
  match: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  mode: PropTypes.number,
  onLoadTableData: PropTypes.func,
  onLoadDetailData: PropTypes.func,
  handleModeChange: PropTypes.func,
  paging: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handlePageChange: PropTypes.func,
  handleLimitChange: PropTypes.func,
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  eventInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  locationData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  city: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onLoadCategory: PropTypes.func,
  onLoadLocation: PropTypes.func,
  handleCityChange: PropTypes.func,
  handleDistrictChange: PropTypes.func,
  handleStartChange: PropTypes.func,
  handleEndChange: PropTypes.func,
  handleBudgetChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  data: makeSelectDetail(),
  eventId: makeSelectEvent(),
  mode: makeSelectMode(),
  category: makeSelectCategory(),
  paging: makeSelectPaging(),
  categories: makeSelectCategories(),
  city: makeSelectCity(),
  locationData: makeSelectLocationData(),
  eventInfo: makeSelectEventInfo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadTableData: (eventId, positionId) => {
      dispatch(loadEvents(eventId, positionId));
    },
    handlePageChange: page => {
      dispatch(changePage(page));
      dispatch(loadEvents());
    },
    handleBudgetChange: () => {
      dispatch(loadData());
    },
    handleModeChange: mode => {
      dispatch(changeMode(mode));
    },
    handleLimitChange: limit => {
      dispatch(changeLimit(limit));
      dispatch(loadEvents());
    },
    onLoadDetailData: (eventId, positionId) => {
      dispatch(loadEventInfo(eventId, positionId));
    },
    handleStartChange: start => {
      dispatch(changeStart(toIsoString(start)));
      dispatch(loadData());
    },
    handleEndChange: end => {
      dispatch(changeEnd(toIsoString(end)));
      dispatch(loadData());
    },
    handleCategoryChange: () => {
      // dispatch(changeCategory(category));
      dispatch(loadData());
    },
    onLoadCategory: () => {
      dispatch(loadCategories());
    },
    handleCityChange: city => {
      dispatch(changeCity(city));
      dispatch(loadData());
    },
    handleDistrictChange: district => {
      dispatch(changeDistrict(district));
      dispatch(loadData());
    },
    onLoadLocation: () => {
      dispatch(loadLocation());
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
