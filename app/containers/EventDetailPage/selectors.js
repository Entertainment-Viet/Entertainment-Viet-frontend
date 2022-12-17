import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.EventDetailPage || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectState,
    State => State.loading,
  );

const makeSelectNFTError = () =>
  createSelector(
    selectState,
    State => State.error,
  );

const makeSelectData = () =>
  createSelector(
    selectState,
    State => State.data,
  );

const makeSelectPositions = () =>
  createSelector(
    selectState,
    State => State.positions,
  );

const makeSelectPositionInfo = () =>
  createSelector(
    selectState,
    State => State.positionInfo,
  );

export {
  makeSelectData,
  makeSelectNFTError,
  makeSelectLoading,
  makeSelectPositions,
  makeSelectPositionInfo,
};
