import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  CHANGE_PAGE,
  CHANGE_END,
  CHANGE_START,
  CHANGE_CATEGORY,
  CHANGE_CITY,
  CHANGE_DISTRICT,
  CHANGE_SEARCH,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_LOCATION,
  LOAD_LOCATION_SUCCESS,
  LOAD_TALENT_PRICE_RANGE_SUCCESS,
} from './constants';

export function loadData(search) {
  return {
    type: LOAD_DATA,
    search,
  };
}
export function loadDataSuccess(data, paging) {
  return {
    type: LOAD_DATA_SUCCESS,
    data,
    paging,
  };
}
export function loadDataError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page,
  };
}
export function changeCategory(category) {
  return {
    type: CHANGE_CATEGORY,
    category,
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
export function changeSearch(search) {
  return {
    type: CHANGE_SEARCH,
    search,
  };
}
export function loadCategories() {
  return {
    type: LOAD_CATEGORIES,
  };
}
export function loadLocation() {
  return {
    type: LOAD_LOCATION,
  };
}
export function loadLocationSuccess(data) {
  return {
    type: LOAD_LOCATION_SUCCESS,
    data,
  };
}
export function loadCategoriesSuccess(data) {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    data,
  };
}
export function loadPriceRangeSuccess(data, paging) {
  return {
    type: LOAD_TALENT_PRICE_RANGE_SUCCESS,
    data,
    paging,
  };
}
