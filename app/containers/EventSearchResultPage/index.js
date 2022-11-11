import React, { useEffect, memo } from 'react';
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
import SelectSearchCustom from 'components/Controls/SelectSearchCustom';
import { CardEvent } from 'components/Cards';
import { H1 } from 'components/Elements';
import Pagination from 'components/Pagination';
import { DateTimeCustom } from 'components/Controls';
import { toIsoString } from 'utils/helpers';
import SliderRange from 'components/SliderRange';
import { messages } from './messages';
import {
  loadDataEvent,
  changePage,
  changeCity,
  changeStart,
  changeEnd,
  changeCategory,
  changeSearchEvent,
  loadCategories,
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
  const { t } = useTranslation();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const searchParams = urlParams.get('search');
  const category = urlParams.get('category');
  useEffect(() => {
    onLoadCategory();
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

  return (
    <div style={{ width: '100%' }}>
      <Metadata />
      <H1 color={TEXT_GREEN}>{`Result for "${search}"`}</H1>
      <Box color={SEC_TEXT_COLOR} mt="-4" mb="6">
        {data && data.length} results found
      </Box>
      <HStack maxW="100%" mb="6">
        <SelectSearchCustom
          placeholderName="Categories"
          handleChange={handleCategoryChange}
          listOption={categories}
        />
        <SelectSearchCustom
          placeholderName={t(messages.location())}
          handleChange={handleCityChange}
        />
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
)(EventSearchResultPage);
