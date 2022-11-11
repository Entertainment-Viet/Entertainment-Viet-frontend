import { LOAD_DATA_ERROR, LOAD_ORG, LOAD_ORG_SUCCESS } from './constants';

export function loadOrgInfo(organizerId) {
  return {
    type: LOAD_ORG,
    organizerId,
  };
}
export function loadOrgInfoSuccess(payload) {
  return {
    type: LOAD_ORG_SUCCESS,
    payload,
  };
}

export function loadDataError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}
