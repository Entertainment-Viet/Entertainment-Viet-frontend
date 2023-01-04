import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.BillingPage || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectState,
    State => State.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectState,
    State => State.error,
  );

const makeSelectData = () =>
  createSelector(
    selectState,
    State => State.data,
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

export {
  makeSelectError,
  makeSelectLoading,
  makeSelectData,
  makeSelectStart,
  makeSelectEnd,
};
