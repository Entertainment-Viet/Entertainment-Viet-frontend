import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.BookingDetail || initialState;

const makeSelectBookingSuccess = () =>
  createSelector(
    selectState,
    State => State.loading,
  );

const makeSelectBookingError = () =>
  createSelector(
    selectState,
    State => State.error,
  );

const makeSelectData = () =>
  createSelector(
    selectState,
    State => State.data,
  );

const makeSelectId = () =>
  createSelector(
    selectState,
    State => State.id,
  );

export {
  makeSelectData,
  makeSelectBookingError,
  makeSelectBookingSuccess,
  makeSelectId,
};
