import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import CategoriesFilter from 'components/CategoriesFilter';
import SearchLocation from 'components/SearchLocation';
import {
  Container,
  Box,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import {
  TEXT_PURPLE,
  SEC_TEXT_COLOR,
  PRI_TEXT_COLOR,
  TEXT_GREEN,
} from 'constants/styles';
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
  changeCategory,
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
  makeSelectProvince,
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

  const cityData =
    locationData &&
    locationData.filter(
      item =>
        item.locationType.type === 'city' && item.locationType.level === 1,
    );
  const districtData =
    locationData &&
    locationData.filter(
      item =>
        item.locationType.type === 'district' && item.locationType.level === 2,
    );
  return (
    <div style={{ width: '100%' }}>
      <Metadata />
      <H1 color={TEXT_GREEN}>{`Result for "${search}"`}</H1>
      <Box color={SEC_TEXT_COLOR} mt="-4" mb="6">
        {data && data.length} results found
      </Box>
      <HStack mb="6">
        <HStack w="50%">
          <CategoriesFilter
            placeholder="Categories"
            listOptions={categoriesFiltered}
          />
          <SearchLocation
            placeholder={t(messages.locationDistrict())}
            handleChangeLocation={handleDistrictChange}
            optionList={districtData}
          />
          <SearchLocation
            placeholder={t(messages.locationCity())}
            optionList={cityData}
            handleChangeLocation={handleCityChange}
          />
          <SliderRange titleRange={t(messages.incomeRange())} />
        </HStack>
        <HStack w="50%">
          <Text>Your budget</Text>
          <Box>
            <NumberInput
              color={PRI_TEXT_COLOR}
              bg="transparent"
              borderColor={TEXT_PURPLE}
              onChange={val => handleBudgetChange(val)}
            >
              <NumberInputField placeholder="Budget" />
            </NumberInput>
          </Box>
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
      </HStack>
      <Container maxW="100%" ps={0}>
        <SimpleGrid
          maxW="100%"
          columns={{ xl: 4, '2xl': 5 }}
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
                />
              );
            })}
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
  province: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  start: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  locationData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
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
  province: makeSelectProvince(),
  start: makeSelectStart(),
  end: makeSelectEnd(),
  categories: makeSelectCategories(),
  locationData: makeSelectLocationData(),
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
    },
    handleDistrictChange: district => {
      dispatch(changeDistrict(district));
    },
    handleStartChange: start => {
      dispatch(changeStart(toIsoString(start)));
      dispatch(loadData());
    },
    handleEndChange: end => {
      dispatch(changeEnd(toIsoString(end)));
      dispatch(loadData());
    },
    handleCategoryChange: category => {
      dispatch(changeCategory(category));
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
