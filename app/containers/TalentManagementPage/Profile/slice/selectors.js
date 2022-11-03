import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.Profile || initialState;

const makeSelectTalent = () =>
  createSelector(
    selectState,
    State => State.talentInfo,
  );

const makeSelectCategories = () =>
  createSelector(
    selectState,
    State => State.categories,
  );

export { makeSelectTalent, makeSelectCategories };
