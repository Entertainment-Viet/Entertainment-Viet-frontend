import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.HomePage || initialState;

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

const makeSelectEditorChoice = () =>
  createSelector(
    selectState,
    State => State.editorChoice,
  );

export {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
  makeSelectEditorChoice,
};
