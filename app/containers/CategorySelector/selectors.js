import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.CategorySelector || initialState;

const makeSelectCategoryLoading = () =>
  createSelector(
    selectState,
    State => State.loading,
  );
const makeSelectCategory = () =>
  createSelector(
    selectState,
    State => State.categories,
  );

export { makeSelectCategory, makeSelectCategoryLoading };
