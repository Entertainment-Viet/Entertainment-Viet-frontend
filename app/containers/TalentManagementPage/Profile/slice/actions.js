import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_DATA_ERROR,
  LOAD_TALENT,
  LOAD_TALENT_SUCCESS,
} from './constants';

export function loadTalentInfo(talentId) {
  return {
    type: LOAD_TALENT,
    talentId,
  };
}

export function loadTalentInfoSuccess(payload) {
  return {
    type: LOAD_TALENT_SUCCESS,
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
