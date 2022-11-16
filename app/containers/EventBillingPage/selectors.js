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

const makeSelectCategories = () =>
  createSelector(
    selectState,
    State => State.categories,
  );

export { makeSelectError, makeSelectLoading, makeSelectCategories };
