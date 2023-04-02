/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectData = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.data,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );
const makeSelectSuccess = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.success,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectSidebar = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.sidebarOpen,
  );

export {
  selectGlobal,
  makeSelectData,
  makeSelectLoading,
  makeSelectError,
  makeSelectSuccess,
  makeSelectLocation,
  makeSelectSidebar,
};
