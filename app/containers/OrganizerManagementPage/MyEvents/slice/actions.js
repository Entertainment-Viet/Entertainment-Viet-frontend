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
  LOAD_CATEGORIES,
  LOAD_DATA_ERROR,
  LOAD_CATEGORIES_SUCCESS,
  CHANGE_CATEGORY_EVENT,
  CHANGE_START,
  CHANGE_END,
  LOAD_LOCATION,
  LOAD_LOCATION_SUCCESS,
  CHANGE_CITY,
  CHANGE_DISTRICT,
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
export function changeCategory(category) {
  return {
    type: CHANGE_CATEGORY_EVENT,
    category,
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
export function loadCategories() {
  return {
    type: LOAD_CATEGORIES,
  };
}
export function loadCategoriesSuccess(data) {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    data,
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
export function loadLocation() {
  return {
    type: LOAD_LOCATION,
  };
}
export function changeCity(city) {
  return {
    type: CHANGE_CITY,
    city,
  };
}
export function changeDistrict(district) {
  return {
    type: CHANGE_DISTRICT,
    district,
  };
}
export function loadLocationSuccess(data) {
  return {
    type: LOAD_LOCATION_SUCCESS,
    data,
  };
}
