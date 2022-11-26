import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.SearchResultPage || initialState;

const makeSelectPage = () =>
  createSelector(
    selectState,
    NewsState => NewsState.page,
  );

const makeSelectDataLoading = () =>
  createSelector(
    selectState,
    State => State.loading,
  );

const makeSelectDataError = () =>
  createSelector(
    selectState,
    State => State.error,
  );

const makeSelectData = () =>
  createSelector(
    selectState,
    State => State.data,
  );
const makeSelectPaging = () =>
  createSelector(
    selectState,
    State => State.paging,
  );
const makeSelectSearch = () =>
  createSelector(
    selectState,
    State => State.search,
  );
const makeSelectCategory = () =>
  createSelector(
    selectState,
    State => State.category,
  );
const makeSelectCategories = () =>
  createSelector(
    selectState,
    State => State.categories,
  );
const makeSelectCity = () =>
  createSelector(
    selectState,
    State => State.city,
  );
const makeSelectDistrict = () =>
  createSelector(
    selectState,
    State => State.district,
  );
const makeSelectLocationData = () =>
  createSelector(
    selectState,
    State => State.locationData,
  );
const makeSelectStart = () =>
  createSelector(
    selectState,
    State => State.start,
  );
const makeSelectEnd = () =>
  createSelector(
    selectState,
    State => State.end,
  );
const makeSelectPriceMax = () =>
  createSelector(
    selectState,
    State => State.priceRange[1],
  );
const makeSelectPriceMin = () =>
  createSelector(
    selectState,
    State => State.priceRange[0],
  );

export {
  makeSelectDataLoading,
  makeSelectDataError,
  makeSelectData,
  makeSelectPaging,
  makeSelectPage,
  makeSelectSearch,
  makeSelectCategory,
  makeSelectCity,
  makeSelectDistrict,
  makeSelectLocationData,
  makeSelectPriceMax,
  makeSelectPriceMin,
  makeSelectStart,
  makeSelectEnd,
  makeSelectCategories,
};
