import {
  CATEGORY_LOAD,
  LOAD_DATA_ERROR,
  CATEGORY_LOAD_SUCCESS,
} from './constants';

export function loadCategories() {
  return {
    type: CATEGORY_LOAD,
  };
}
export function loadCategoriesSuccess(data) {
  return {
    type: CATEGORY_LOAD_SUCCESS,
    data,
  };
}
export function loadDataError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}
