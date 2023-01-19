import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.TalentHomePage || initialState;

const makeSelectDetailLoading = () =>
  createSelector(
    selectState,
    State => State.loading,
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

export { makeSelectDetailLoading, makeSelectDetailError, makeSelectDetail };
