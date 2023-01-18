import React, { memo, useEffect, useState } from 'react';
import { HStack, Text, Flex, Box, Link, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import PageSpinner from 'components/PageSpinner';
import { PRI_TEXT_COLOR, TEXT_GREEN, RED_COLOR } from 'constants/styles';
import styled from 'styled-components';
import AdvancedTable from 'components/AdvancedTable';
import SliderRange from 'components/SliderRange';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { API_GET_PACKAGE_INFO } from 'constants/api';
import SearchLocation from 'components/SearchLocation';
import { del } from 'utils/request';
import { ENUM_BOOKING_STATUS } from 'constants/enums';
import { DateTimeCustom } from 'components/Controls';
import CategoriesFilter from 'components/CategoriesFilter';
import {
  numberWithCommas,
  toIsoString,
  classifyCategories,
} from 'utils/helpers';
import { messages } from '../messages';
import { CustomButton } from '../styles';
import {
  changePage,
  loadPackages,
  changeMode,
  changeLimit,
  changeEnd,
  changeStart,
  // changeCategory,
  loadCategories,
  loadPackageInfo,
  loadData,
  changeCity,
  loadLocation,
  changeDistrict,
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
  makeSelectCategory,
  makeSelectCategories,
  makeSelectCity,
  makeSelectLocationData,
} from './slice/selectors';
import PackageDetailCard from './PackageDetailCard';
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
  handleLimitChange,
  loadPackage,
  onLoadCategory,
  packageInfo,
  categories,
  handleStartChange,
  handleEndChange,
  locationData,
  city,
  onLoadLocation,
  handleCityChange,
  handleBudgetChange,
  handleDistrictChange,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const [categoriesFiltered, setCategoriesFiltered] = useState([]);

  useEffect(() => {
    onLoadData();
    onLoadLocation();
    onLoadCategory();
  }, []);
  useEffect(() => {
    const categoriesClassified = classifyCategories(categories);
    setCategoriesFiltered(categoriesClassified);
  }, [categories]);
  const userId = window.localStorage.getItem('uid');
  const cityData =
    locationData &&
    locationData.filter(item => item.locationType.type === 'city');
  // const cityNameList = cityData && Array.from(new Set(cityData));
  const districtData =
    locationData &&
    city &&
    locationData.filter(
      item => item.locationType.type === 'district' && item.parentUid === city,
    );
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
        totalBooking: user.orderNum,
        price: `${numberWithCommas(
          user.jobDetail.price.min,
        )} - ${numberWithCommas(user.jobDetail.price.max)}`,
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
        ) : (
          <Flex
            direction={{ sm: 'column', xl: 'row' }}
            alignItems="center"
            mb="6"
            w="100%"
          >
            <Flex
              direction={{ sm: 'column', md: 'row' }}
              w={{ sm: '100%', xl: 'auto' }}
            >
              <CategoriesFilter
                placeholder="Categories"
                listOptions={categoriesFiltered}
              />
              <SearchLocation
                placeholder={t(messages.locationCity())}
                optionList={cityData}
                handleChangeLocation={handleCityChange}
              />
              {city && districtData.length > 0 && (
                <SearchLocation
                  placeholder={t(messages.locationDistrict())}
                  handleChangeLocation={handleDistrictChange}
                  optionList={districtData}
                />
              )}
              <SliderRange
                typePage="package-manager"
                titleRange={t(messages.incomeRange())}
                loadDataAction={handleBudgetChange}
              />
            </Flex>
            <Flex
              mt={{ sm: 8, xl: 0 }}
              ml={{ xl: 8 }}
              direction={{ sm: 'column', md: 'row' }}
              alignItems={{ md: 'center' }}
              w={{ sm: '100%', xl: 'auto' }}
            >
              <Flex
                alignItems="center"
                my={2}
                justifyContent={{ sm: 'space-between', md: 'flex-start' }}
              >
                <Text mr={{ md: 2 }} whiteSpace="nowrap">
                  Start time
                </Text>
                <Box>
                  <DateTimeCustom
                    template="datetime-picker right"
                    name="end_vip_date"
                    type="hm"
                    message="Start date"
                    handleDateChange={handleStartChange}
                  />
                </Box>
              </Flex>
              <Flex
                alignItems="center"
                my={2}
                mx={{ md: 5, lg: 8 }}
                justifyContent={{ sm: 'space-between', md: 'flex-start' }}
              >
                <Text mr={{ md: 2 }} whiteSpace="nowrap">
                  End time
                </Text>
                <Box>
                  <DateTimeCustom
                    template="datetime-picker right"
                    name="end_vip_date"
                    type="hm"
                    message="End date"
                    handleDateChange={handleEndChange}
                  />
                </Box>
              </Flex>
              <Box w={{ sm: '100%', md: 'auto' }}>
                <Link href="/create-package">
                  <CustomButton>{t(messages.createPackage())}</CustomButton>
                </Link>
              </Box>
            </Flex>
          </Flex>
        )}
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
              setLimit={handleLimitChange}
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
  handleLimitChange: PropTypes.func,
  handleStartChange: PropTypes.func,
  handleEndChange: PropTypes.func,
  onLoadCategory: PropTypes.func,
  onLoadLocation: PropTypes.func,
  handleCityChange: PropTypes.func,
  handleDistrictChange: PropTypes.func,
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  packageInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  locationData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handleBudgetChange: PropTypes.func,
  city: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  data: makeSelectDetail(),
  packageId: makeSelectPackage(),
  mode: makeSelectMode(),
  paging: makeSelectPaging(),
  categories: makeSelectCategories(),
  category: makeSelectCategory(),
  packageInfo: makeSelectPackageInfo(),
  city: makeSelectCity(),
  locationData: makeSelectLocationData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: id => {
      dispatch(loadPackages(id));
    },
    handleBudgetChange: () => {
      dispatch(loadData());
    },
    handlePageChange: page => {
      dispatch(changePage(page));
      dispatch(loadPackages());
    },
    handleModeChange: mode => {
      dispatch(changeMode(mode));
    },
    handleLimitChange: limit => {
      dispatch(changeLimit(limit));
      dispatch(loadPackages());
    },
    loadPackage: (id, talentId) => {
      dispatch(loadPackageInfo(id, talentId));
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
    handleCityChange: city => {
      dispatch(changeCity(city));
      dispatch(loadData());
    },
    handleDistrictChange: district => {
      dispatch(changeDistrict(district));
      dispatch(loadData());
    },
    onLoadCategory: () => {
      dispatch(loadCategories());
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
)(MyPackage);
