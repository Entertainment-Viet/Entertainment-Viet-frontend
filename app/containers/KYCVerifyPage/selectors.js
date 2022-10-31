import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.KYCVerifyPage || initialState;

const makeSelectTalent = () =>
  createSelector(
    selectState,
    State => State.talentInfo,
  );

export { makeSelectTalent };
