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
};
