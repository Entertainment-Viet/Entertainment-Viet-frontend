import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.ProfileOrganizer || initialState;

const makeSelectOrganizer = () =>
  createSelector(
    selectState,
    State => State.organizerInfo,
  );

const makeSelectCategories = () =>
  createSelector(
    selectState,
    State => State.categories,
  );

export { makeSelectOrganizer, makeSelectCategories };
