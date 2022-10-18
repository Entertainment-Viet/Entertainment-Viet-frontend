import { LOAD_INFO, LOAD_INFO_SUCCESS, LOAD_INFO_ERROR } from './constants';

export function loadInfo(roles, uid) {
  return {
    type: LOAD_INFO,
    roles,
    uid,
  };
}
export function loadInfoSuccess(data) {
  return {
    type: LOAD_INFO_SUCCESS,
    data,
  };
}
export function loadInfoError(error) {
  return {
    type: LOAD_INFO_ERROR,
    error,
  };
}
