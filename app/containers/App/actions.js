import {
  LOAD_DATA,
  LOAD_ERROR,
  LOAD_SUCCESS,
  OPEN_SIDE_BAR,
} from './constants';

export function loadData(data = false) {
  return {
    type: LOAD_DATA,
    data,
  };
}

export function loadError(error) {
  return {
    type: LOAD_ERROR,
    error,
  };
}

export function loadSuccess(success) {
  return {
    type: LOAD_SUCCESS,
    success,
  };
}

export function openSidebar(open) {
  return {
    type: OPEN_SIDE_BAR,
    open,
  };
}
