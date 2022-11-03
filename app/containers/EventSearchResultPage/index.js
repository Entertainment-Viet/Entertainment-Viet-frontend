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
  // Select,
  NumberInput,
  NumberInputField,
  // chakra,
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
import { CardEvent } from 'components/Cards';
import { H1 } from 'components/Elements';
import Pagination from 'components/Pagination';
import { DateTimeCustom } from 'components/Controls';
// import styled from 'styled-components';
// import { loadNFTFilter } from 'containers/NFTFilterProvider/actions';

// import { isAuthor } from 'utils/auth';

// import { InputCustom, SelectCustom, ButtonCustom } from 'components/Controls';

import {} from 'constants/routes';
import {} from './styles';

import { toIsoString } from 'utils/helpers';
import InputCustomV2 from '../../components/Controls/InputCustomV2';
import {
  loadDataEvent,
  changePage,
  changeCity,
  changeBudget,
  changeStart,
  changeEnd,
  changeCategory,
  changeSearchEvent,
  // loadCategories,
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
  makeSelectBudget,
  makeSelectCategory,
  makeSelectCity,
  makeSelectStart,
  makeSelectEnd,
  makeSelectCategories,
} from './selectors';

// const CustomOption = styled.option`
//   color: black;
// `;
const key = 'EventSearchResultPage';
export function EventSearchResultPage({
  paging,
  data,
  handlePageChange,
  handleCategoryChange,
  // handleCityChange,
  handleBudgetChange,
  handleSearchChange,
  handleStartChange,
  handleEndChange,
  onLoadData,
  search,
  // categories,
  // onLoadCategory,
  handleOrganizerChange,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const searchParams = urlParams.get('search');
  const category = urlParams.get('category');
  useEffect(() => {
    // onLoadCategory();
    if (category) handleCategoryChange(category);
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

  // const FieldWrapper = chakra(Box, {
  //   baseStyle: {
  //     w: 'fit-content',
  //     color: 'white',
  //   },
  // });
  return (
    <div style={{ width: '100%' }}>
      <Metadata />
      <H1 color={TEXT_GREEN}>Result for "{search}"</H1>
      <Box color={SEC_TEXT_COLOR} mt="-4" mb="6">
        {data && data.length} results found
      </Box>
      <HStack maxW="100%" mb="6">
        {/* <FieldWrapper>
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
          </CustomSelect>
        </FieldWrapper> */}
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
        <Text>Organizer</Text>
        <Box>
          <InputCustomV2
            color={PRI_TEXT_COLOR}
            bg="transparent"
            borderColor={TEXT_PURPLE}
            onChange={val => handleOrganizerChange(val.currentTarget.value)}
          >
            {/* <InputField placeholder="Organizer name" /> */}
          </InputCustomV2>
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
  handleBudgetChange: PropTypes.func,
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
  // category: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  // city: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  // budget: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  // start: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  // end: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  // categories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
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
      dispatch(loadDataEvent());
    },
    handleSearchChange: search => {
      dispatch(changeSearchEvent(search));
      dispatch(loadDataEvent());
    },
    handleCityChange: city => {
      dispatch(changeCity(city));
      dispatch(loadDataEvent());
    },
    handleBudgetChange: budget => {
      dispatch(changeBudget(budget));
      dispatch(loadDataEvent());
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
      dispatch(loadDataEvent());
    },
    onLoadData: category => {
      dispatch(loadDataEvent(category));
    },
    // onLoadCategory: () => {
    //   dispatch(loadCategories());
    // },
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
