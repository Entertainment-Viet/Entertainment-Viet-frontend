import { CATEGORY_LOAD, CATEGORY_LOAD_SUCCESS } from './constants';

export function loadCategory() {
  return {
    type: CATEGORY_LOAD,
  };
}
export function loadCategorySuccess(category) {
  return {
    type: CATEGORY_LOAD_SUCCESS,
    category,
  };
}
