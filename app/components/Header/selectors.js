import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.Header || initialState;

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

const makeSelectCartData = () =>
  createSelector(
    selectState,
    State => State.cartData,
  );

const makeSelectPackages = () =>
  createSelector(
    selectState,
    State => State.packages,
  );

const makeSelectId = () =>
  createSelector(
    selectState,
    State => State.id,
  );

const makeSelectNotiData = () =>
  createSelector(
    selectState,
    State => State.notiData,
  );

const makeSelectUnreadNoti = () =>
  createSelector(
    selectState,
    State => State.countUnread,
  );

export {
  makeSelectCartData,
  makeSelectNFTError,
  makeSelectNFTLoading,
  makeSelectId,
  makeSelectPackages,
  makeSelectNotiData,
  makeSelectUnreadNoti,
};
