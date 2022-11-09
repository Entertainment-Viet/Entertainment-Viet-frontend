import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.PreCheckout || initialState;

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
const makeSelectPayType = () =>
  createSelector(
    selectState,
    State => State.payMethod,
  );
export {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
  makeSelectPayType,
};
