import {
  LOAD_EVENTS,
  CHANGE_PAGE,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  LOAD_BOOKING_EVENTS,
  CHANGE_MODE,
  CHANGE_LIMIT,
  LOAD_EVENT,
  LOAD_EVENT_SUCCESS,
} from './constants';

export function loadEvents(eventId, positionId) {
  return {
    type: LOAD_EVENTS,
    eventId,
    positionId,
  };
}

export function loadBookingEvents(eventId) {
  return {
    type: LOAD_BOOKING_EVENTS,
    eventId,
  };
}

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
export function changeMode(mode) {
  return {
    type: CHANGE_MODE,
    mode,
  };
}

export function loadEventsInfoSuccess(data, paging) {
  return {
    type: LOAD_INFO_SUCCESS,
    data,
    paging,
  };
}
export function loadEventInfoError(error) {
  return {
    type: LOAD_INFO_ERROR,
    error,
  };
}

export function loadEventInfo(eventId, positionId) {
  return {
    type: LOAD_EVENT,
    eventId,
    positionId,
  };
}
export function loadEventInfoSuccess(payload) {
  return {
    type: LOAD_EVENT_SUCCESS,
    payload,
  };
}
