import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  LOAD_NOTI_DATA_SUCCESS,
  LOAD_NOTI,
} from './constants';

export function loadDataHeader(id) {
  return {
    type: LOAD_DATA,
    id,
  };
}
export function loadNoti(id) {
  return {
    type: LOAD_NOTI,
    id,
  };
}

export function loadNotiDataSuccess(notiData, countUnread) {
  return {
    type: LOAD_NOTI_DATA_SUCCESS,
    notiData,
    countUnread,
  };
}

export function loadDataSuccess(cartData) {
  return {
    type: LOAD_DATA_SUCCESS,
    cartData,
  };
}
export function loadDataError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}
