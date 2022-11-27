import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.MyEvents || initialState;

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

const makeSelectEvent = () =>
  createSelector(
    selectState,
    State => State.eventId,
  );

const makeSelectPosition = () =>
  createSelector(
    selectState,
    State => State.positionId,
  );

const makeSelectPaging = () =>
  createSelector(
    selectState,
    State => State.paging,
  );

const makeSelectEventInfo = () =>
  createSelector(
    selectState,
    State => State.eventInfo,
  );

export {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
  makeSelectPage,
  makeSelectEvent,
  makeSelectMode,
  makeSelectPaging,
  makeSelectLimit,
  makeSelectEventInfo,
  makeSelectPosition,
  makeSelectCategory,
  makeSelectCategories,
  makeSelectPriceMax,
  makeSelectPriceMin,
  makeSelectEnd,
  makeSelectStart,
  makeSelectCity,
  makeSelectDistrict,
  makeSelectLocationData,
};
