import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Container, Box, SimpleGrid, HStack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { SEC_TEXT_COLOR, TEXT_GREEN } from 'constants/styles';
import CategoriesFilter from 'components/CategoriesFilter';
import SearchLocation from 'components/SearchLocation';
import { CardEvent } from 'components/Cards';
import { H1 } from 'components/Elements';
import Pagination from 'components/Pagination';
import { DateTimeCustom } from 'components/Controls';
import { toIsoString, classifyCategories } from 'utils/helpers';
import SliderRange from 'components/SliderRange';
import { messages } from './messages';
import {
  loadDataEvent,
  changePage,
  changeCity,
  changeDistrict,
  changeStart,
  changeEnd,
  changeCategory,
  changeSearchEvent,
  loadCategories,
  loadLocation,
  changeOrganizer,
} from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectPaging,
  makeSelectDataLoading,
  makeSelectDataError,
  makeSelectData,
  makeSelectPage,
  makeSelectSearch,
  makeSelectCategory,
  makeSelectCity,
  makeSelectLocationData,
  makeSelectStart,
  makeSelectEnd,
  makeSelectCategories,
} from './selectors';
const key = 'EventSearchResultPage';
export function EventSearchResultPage({
  paging,
  data,
  handlePageChange,
  handleCategoryChange,
  handleCityChange,
  handleDistrictChange,
  locationData,
  city,
  handleSearchChange,
  handleStartChange,
  handleEndChange,
  onLoadData,
  search,
  categories,
  onLoadCategory,
  onLoadLocation,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const [categoriesFiltered, setCategoriesFiltered] = useState([]);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const searchParams = urlParams.get('search');
  const category = urlParams.get('category');
  useEffect(() => {
    onLoadCategory();
    onLoadLocation();
    if (category) handleCategoryChange(category);
    else if (searchParams) handleSearchChange(searchParams);
    else onLoadData();
  }, []);
  useEffect(() => {
    const categoriesClassified = classifyCategories(categories);
    setCategoriesFiltered(categoriesClassified);
  }, [categories]);
  // remember to +1 vào pageNumber
  const pageProps = {
    // total: paging.totalElement, // totalElement
    page: paging.pageNumber + 1, // pageNumber
    limit: paging.pageSize, // pageSize
    last: paging.last,
  };
  const cityData = locationData && locationData.map(item => item.parentName);
  const cityNameList = cityData && Array.from(new Set(cityData));
  const districtData =
    locationData &&
    city &&
    locationData.filter(
      item =>
        item.locationType.type === 'district' &&
        item.locationType.level === 2 &&
        item.parentName === city,
    );

  return (
    <div style={{ width: '100%' }}>
      <Metadata />
      <H1 color={TEXT_GREEN}>{`Result for "${search}"`}</H1>
      <Box color={SEC_TEXT_COLOR} mt="-4" mb="6">
        {data && data.length} results found
      </Box>
      <HStack maxW="100%" mb="6">
        <CategoriesFilter
          placeholder="Categories"
          listOptions={categoriesFiltered}
        />
        <SearchLocation
          placeholder={t(messages.locationCity())}
          optionList={cityNameList}
          handleChangeLocation={handleCityChange}
        />
        {city && (
          <SearchLocation
            placeholder={t(messages.locationDistrict())}
            handleChangeLocation={handleDistrictChange}
            optionList={districtData}
          />
        )}
        <SliderRange titleRange={t(messages.incomeRange())} />
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
      </HStack>
      <Container maxW="100%" ps={0}>
        <SimpleGrid
          maxW="100%"
          columns={{ xl: 3, '2xl': 4 }}
          spacing="30px"
          alignItems="start"
        >
          {data &&
            data.map(tempt => {
              const { uid } = tempt;
              return <CardEvent key={uid} data={tempt} />;
            })}
        </SimpleGrid>
        <Pagination {...pageProps} onPageChange={handlePageChange} />
      </Container>
    </div>
  );
}

EventSearchResultPage.propTypes = {
  paging: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handlePageChange: PropTypes.func,
  handleCategoryChange: PropTypes.func,
  handleCityChange: PropTypes.func,
  handleDistrictChange: PropTypes.func,
  handleOrganizerChange: PropTypes.func,
  handleSearchChange: PropTypes.func,
  handleStartChange: PropTypes.func,
  handleEndChange: PropTypes.func,
  onLoadData: PropTypes.func,
  onLoadCategory: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  page: PropTypes.number,
  search: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  category: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  city: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  locationData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  start: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  end: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onLoadLocation: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  paging: makeSelectPaging(),
  loading: makeSelectDataLoading(),
  error: makeSelectDataError(),
  data: makeSelectData(),
  page: makeSelectPage(),
  search: makeSelectSearch(),
  category: makeSelectCategory(),
  city: makeSelectCity(),
  locationData: makeSelectLocationData(),
  start: makeSelectStart(),
  end: makeSelectEnd(),
  categories: makeSelectCategories(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handlePageChange: page => {
      dispatch(changePage(page));
      dispatch(loadDataEvent());
    },
    handleSearchChange: search => {
      dispatch(changeSearchEvent(search));
      dispatch(loadDataEvent());
    },
    handleCityChange: city => {
      dispatch(changeCity(city));
    },
    handleDistrictChange: district => {
      dispatch(changeDistrict(district));
    },
    handleOrganizerChange: organizer => {
      dispatch(changeOrganizer(organizer));
      dispatch(loadDataEvent());
    },
    handleStartChange: start => {
      dispatch(changeStart(toIsoString(start)));
      dispatch(loadDataEvent());
    },
    handleEndChange: end => {
      dispatch(changeEnd(toIsoString(end)));
      dispatch(loadDataEvent());
    },
    handleCategoryChange: category => {
      dispatch(changeCategory(category));
    },
    onLoadData: category => {
      dispatch(loadDataEvent(category));
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
)(EventSearchResultPage);
