import { DATA_LOAD, LOAD_DATA_ERROR, DATA_LOAD_SUCCESS } from './constants';

export function loadData(id) {
  return {
    type: DATA_LOAD,
    id,
  };
}
export function loadDataSuccess(data, paging, event) {
  return {
    type: DATA_LOAD_SUCCESS,
    data,
    paging,
    event,
  };
}
export function loadDataError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}
