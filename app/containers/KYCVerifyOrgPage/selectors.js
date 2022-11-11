import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.KYCVerifyOrgPage || initialState;

const makeSelectOrg = () =>
  createSelector(
    selectState,
    State => State.organizerInfo,
  );

export { makeSelectOrg };
