import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import CategoriesFilter from 'components/CategoriesFilter';
import SearchLocation from 'components/SearchLocation';
import { Container, Box, SimpleGrid, HStack, Text } from '@chakra-ui/react';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { SEC_TEXT_COLOR, TEXT_GREEN } from 'constants/styles';
import { useTranslation } from 'react-i18next';
import { Card } from 'components/Cards';
import { H1 } from 'components/Elements';
import Pagination from 'components/Pagination';
import { DateTimeCustom } from 'components/Controls';
import { toIsoString, classifyCategories } from 'utils/helpers';
import SliderRange from 'components/SliderRange';
import { messages } from './messages';
import {
  loadData,
  changePage,
  changeCity,
  changeDistrict,
  changeStart,
  changeEnd,
  // changeCategory,
  changeSearch,
  loadCategories,
  loadLocation,
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

const key = 'SearchResultPage';
export function SearchResultPage({
  paging,
  data,
  handlePageChange,
  handleCategoryChange,
  handleBudgetChange,
  handleSearchChange,
  handleStartChange,
  handleEndChange,
  handleCityChange,
  city,
  handleDistrictChange,
  onLoadData,
  onLoadCategory,
  onLoadLocation,
  search,
  categories,
  locationData,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const searchParams = urlParams.get('search');
  const category = urlParams.get('category');
  const { t } = useTranslation();
  const [categoriesFiltered, setCategoriesFiltered] = useState([]);
  useEffect(() => {
    onLoadCategory();
    onLoadLocation();
    if (category) handleCategoryChange(category);
    // else if (searchParams) handleSearchChange(searchParams.replace('+', ' '));
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

  // const cityData = locationData && locationData.map(item => item.parentName);
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
  return (
    <div styles={{ width: '100%' }}>
      <Metadata />
      <H1 color={TEXT_GREEN}>{`Result for "${search}"`}</H1>
      <Box color={SEC_TEXT_COLOR} mt="-4" mb="6">
        {data && data.length} results found
      </Box>
      <HStack mb="6">
        <HStack w="100%">
          <CategoriesFilter
            placeholder="Categories"
            listOptions={categoriesFiltered}
            loadDataAction={handleCategoryChange}
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
          {/* <Text>Your budget</Text>
          <Box>
            <NumberInput
              color={PRI_TEXT_COLOR}
              bg="transparent"
              borderColor={TEXT_PURPLE}
              onChange={val => handleBudgetChange(val)}
            >
              <NumberInputField placeholder="Budget" />
            </NumberInput>
          </Box> */}
        </HStack>
      </HStack>
      <Container maxW="100%" ps={0}>
        <SimpleGrid
          maxW="100%"
          columns={[3, 3, 4, 5]}
          spacing="30px"
          alignItems="start"
        >
          {data &&
            data.map(tempt => {
              const { uid } = tempt;
              const packagesPrice = [];
              tempt.packages.map(item => {
                packagesPrice.push(item.jobDetail.price.min);
                packagesPrice.push(item.jobDetail.price.max);
                return true;
              });
              const min = packagesPrice.sort((a, b) => a - b)[0];
              const max = packagesPrice.sort((a, b) => b - a)[0];
              return (
                <Card
                  key={uid}
                  data={tempt}
                  priceRange={min && max ? [min, max] : [0, 0]}
                  width={[0, 140, 200, 200, 270]}
                />
              );
            })}
          {data && data.length === 0 ? <Text>Talent not found</Text> : null}
        </SimpleGrid>
        <Pagination {...pageProps} onPageChange={handlePageChange} />
      </Container>
    </div>
  );
}

SearchResultPage.propTypes = {
  paging: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handlePageChange: PropTypes.func,
  handleCategoryChange: PropTypes.func,
  handleCityChange: PropTypes.func,
  handleDistrictChange: PropTypes.func,
  handleBudgetChange: PropTypes.func,
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
      dispatch(loadData());
    },
    handleSearchChange: search => {
      dispatch(changeSearch(search));
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
    handleBudgetChange: () => {
      dispatch(loadData());
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
    onLoadData: category => {
      dispatch(loadData(category));
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
)(SearchResultPage);
