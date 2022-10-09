import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.CreateEventPage || initialState;

const makeSelectNFTLoading = () =>
  createSelector(
    selectState,
    State => State.loading,
  );

const makeSelectNFTError = () =>
  createSelector(
    selectState,
    State => State.error,
  );

export { makeSelectNFTError, makeSelectNFTLoading };
