import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_DATA_ERROR,
  LOAD_ORGANIZER,
  LOAD_ORGANIZER_SUCCESS,
} from './constants';

export function loadOrganizerInfo(organizerId) {
  return {
    type: LOAD_ORGANIZER,
    organizerId,
  };
}

export function loadOrganizerInfoSuccess(payload) {
  return {
    type: LOAD_ORGANIZER_SUCCESS,
    payload,
  };
}

export function loadDataError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}

export function loadCategoriesInfo() {
  return {
    type: LOAD_CATEGORIES,
  };
}

export function loadCategoriesSuccess(payload) {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    payload,
  };
}
