import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.EventBillingPage || initialState;

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

const makeSelectEvent = () =>
  createSelector(
    selectState,
    State => State.event,
  );

export { makeSelectError, makeSelectLoading, makeSelectData, makeSelectEvent };
