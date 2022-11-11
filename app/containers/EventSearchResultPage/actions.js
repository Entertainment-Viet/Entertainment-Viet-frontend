import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  CHANGE_PAGE,
  CHANGE_END,
  CHANGE_START,
  CHANGE_CATEGORY,
  CHANGE_CITY,
  CHANGE_SEARCH,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  CHANGE_ORGANIZER,
  LOAD_EVENT_PRICE_RANGE_SUCCESS,
  CHANGE_EVENT_PRICE_RANGE,
} from './constants';

export function loadDataEvent(search) {
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
export function changeOrganizer(organizer) {
  return {
    type: CHANGE_ORGANIZER,
    organizer,
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
export function changeSearchEvent(search) {
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
export function loadCategoriesSuccess(data) {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    data,
  };
}

export function changePriceRange(priceRange) {
  return {
    type: CHANGE_EVENT_PRICE_RANGE,
    priceRange,
  };
}

export function loadPriceRangeSuccess(data, paging) {
  return {
    type: LOAD_EVENT_PRICE_RANGE_SUCCESS,
    data,
    paging,
  };
}
