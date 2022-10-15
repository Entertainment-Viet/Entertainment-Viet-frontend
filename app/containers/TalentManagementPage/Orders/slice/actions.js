import {
  CHANGE_PAGE,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  CHANGE_LIMIT,
  LOAD_BOOKINGS,
  LOAD_BOOKINGS_SUCCESS,
} from './constants';

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page,
  };
}

export function changeLimit(limit) {
  return {
    type: CHANGE_LIMIT,
    limit,
  };
}

export function loadInfoSuccess(data, paging) {
  return {
    type: LOAD_INFO_SUCCESS,
    data,
    paging,
  };
}
export function loadInfoError(error) {
  return {
    type: LOAD_INFO_ERROR,
    error,
  };
}

export function loadBookings(
  status,
  hasFilterStatus,
  isFilterAll,
  isFilterUpcoming,
) {
  return {
    type: LOAD_BOOKINGS,
    status,
    hasFilterStatus,
    isFilterAll,
    isFilterUpcoming,
  };
}

export function loadBookingsSuccess(payload) {
  return {
    type: LOAD_BOOKINGS_SUCCESS,
    payload,
  };
}
