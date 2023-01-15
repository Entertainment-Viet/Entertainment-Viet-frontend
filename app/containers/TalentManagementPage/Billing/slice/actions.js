import {
  DATA_LOAD,
  LOAD_DATA_ERROR,
  DATA_LOAD_SUCCESS,
  CHANGE_START,
  CHANGE_END,
} from './constants';

export function loadData(id) {
  return {
    type: DATA_LOAD,
    id,
  };
}
export function loadDataSuccess(data, paging) {
  return {
    type: DATA_LOAD_SUCCESS,
    data,
    paging,
  };
}
export function loadDataError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}

export function changeStart(start) {
  return {
    type: CHANGE_START,
    start,
  };
}
export function changeEnd(end) {
  return {
    type: CHANGE_END,
    end,
  };
}
