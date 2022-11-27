import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.MyPackage || initialState;

const makeSelectDetailLoading = () =>
  createSelector(
    selectState,
    State => State.loading,
  );
const makeSelectPage = () =>
  createSelector(
    selectState,
    State => State.page,
  );

const makeSelectLimit = () =>
  createSelector(
    selectState,
    State => State.limit,
  );

const makeSelectMode = () =>
  createSelector(
    selectState,
    State => State.mode,
  );

const makeSelectDetailError = () =>
  createSelector(
    selectState,
    State => State.error,
  );

const makeSelectDetail = () =>
  createSelector(
    selectState,
    State => State.data,
  );

const makeSelectPackage = () =>
  createSelector(
    selectState,
    State => State.packageId,
  );

const makeSelectPaging = () =>
  createSelector(
    selectState,
    State => State.paging,
  );

const makeSelectPackageInfo = () =>
  createSelector(
    selectState,
    State => State.packageInfo,
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
export {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
  makeSelectPage,
  makeSelectPackage,
  makeSelectMode,
  makeSelectPaging,
  makeSelectLimit,
  makeSelectPackageInfo,
  makeSelectEnd,
  makeSelectStart,
  makeSelectPriceMax,
  makeSelectPriceMin,
  makeSelectCategory,
  makeSelectCategories,
  makeSelectCity,
  makeSelectDistrict,
  makeSelectLocationData,
};
