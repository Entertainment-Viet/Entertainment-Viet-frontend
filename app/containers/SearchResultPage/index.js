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
import {
  Container,
  Box,
  SimpleGrid,
  Select,
  NumberInput,
  NumberInputField,
  chakra,
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
import { Card } from 'components/Cards';
import { H1 } from 'components/Elements';
import Pagination from 'components/Pagination';
import { DateTimeCustom } from 'components/Controls';
import styled from 'styled-components';
// import { loadNFTFilter } from 'containers/NFTFilterProvider/actions';

// import { isAuthor } from 'utils/auth';

// import { InputCustom, SelectCustom, ButtonCustom } from 'components/Controls';

import {} from 'constants/routes';
import {} from './styles';

import { toIsoString } from 'utils/helpers';
import {
  loadData,
  changePage,
  changeCity,
  changeBudget,
  changeStart,
  changeEnd,
  changeCategory,
  changeSearch,
  loadCategories,
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
  makeSelectBudget,
  makeSelectCategory,
  makeSelectCity,
  makeSelectStart,
  makeSelectEnd,
  makeSelectCategories,
} from './selectors';

const CustomOption = styled.option`
  color: black;
`;
const key = 'SearchResultPage';
export function SearchResultPage({
  paging,
  data,
  handlePageChange,
  handleCategoryChange,
  handleCityChange,
  handleBudgetChange,
  handleSearchChange,
  handleStartChange,
  handleEndChange,
  onLoadData,
  search,
  categories,
  onLoadCategory,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const searchParams = urlParams.get('search');
  const category = urlParams.get('category');
  useEffect(() => {
    onLoadCategory();
    if (category) handleCategoryChange(category);
    // else if (searchParams) handleSearchChange(searchParams.replace('+', ' '));
    else if (searchParams) handleSearchChange(searchParams);
    else onLoadData();
  }, []);
  // remember to +1 vào pageNumber
  const pageProps = {
    // total: paging.totalElement, // totalElement
    page: paging.pageNumber + 1, // pageNumber
    limit: paging.pageSize, // pageSize
    last: paging.last,
  };

  const CustomSelect = chakra(Select, {
    baseStyle: {
      color: 'white',
      bg: TEXT_PURPLE,
      textAlign: 'center',
      w: 'fit-content',
    },
  });
  const FieldWrapper = chakra(Box, {
    baseStyle: {
      w: 'fit-content',
      color: 'white',
    },
  });
  return (
    <div style={{ width: '100%' }}>
      <Metadata />
      <H1 color={TEXT_GREEN}>Result for "{search}"</H1>
      <Box color={SEC_TEXT_COLOR} mt="-4" mb="6">
        {data && data.length} results found
      </Box>
      <HStack maxW="100%" mb="6">
        <FieldWrapper>
          <CustomSelect
            isSearchable
            placeholder="Categories"
            onChange={val => handleCategoryChange(val.target.value)}
          >
            {categories &&
              categories.map(item => (
                <CustomOption value={item.uid}>{item.name}</CustomOption>
              ))}
          </CustomSelect>
        </FieldWrapper>
        <FieldWrapper>
          <CustomSelect
            isSearchable
            placeholder="City"
            onChange={val => handleCityChange(val.target.value)}
          >
            <CustomOption value="TPHCM">TPHCM</CustomOption>
            <CustomOption value="option2">Option 2</CustomOption>
            <CustomOption value="option3">Option 3</CustomOption>
          </CustomSelect>
        </FieldWrapper>
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
  budget: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  start: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  end: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
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
  budget: makeSelectBudget(),
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
    handleBudgetChange: budget => {
      dispatch(changeBudget(budget));
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
