import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  LOAD_POSITION,
  LOAD_POSITION_SUCCESS,
} from './constants';

export function loadData(orgId, eventId) {
  return {
    type: LOAD_DATA,
    orgId,
    eventId,
  };
}

export function loadDataSuccess(data, positions) {
  return {
    type: LOAD_DATA_SUCCESS,
    data,
    positions,
  };
}
export function loadDataError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}
export function loadPositionInfo(orgId, eventId, positionId) {
  return {
    type: LOAD_POSITION,
    orgId,
    eventId,
    positionId,
  };
}
export function loadPositionInfoSuccess(payload) {
  return {
    type: LOAD_POSITION_SUCCESS,
    payload,
  };
}
