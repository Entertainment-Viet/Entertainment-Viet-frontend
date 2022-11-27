import {
  LOAD_PACKAGES,
  CHANGE_PAGE,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  LOAD_BOOKING_PACKAGES,
  CHANGE_MODE,
  CHANGE_LIMIT,
  LOAD_PACKAGE,
  LOAD_PACKAGE_SUCCESS,
  CHANGE_START,
  CHANGE_END,
  LOAD_DATA_ERROR,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  CHANGE_CATEGORY_PACKAGE,
  CHANGE_DISTRICT,
  CHANGE_CITY,
  LOAD_LOCATION_SUCCESS,
  LOAD_LOCATION,
} from './constants';

export function loadPackages(id) {
  return {
    type: LOAD_PACKAGES,
    id,
  };
}

export function loadBookingPackages(packageId) {
  return {
    type: LOAD_BOOKING_PACKAGES,
    packageId,
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

export function loadPackageInfo(id, talentId) {
  return {
    type: LOAD_PACKAGE,
    id,
    talentId,
  };
}
export function loadPackageInfoSuccess(payload) {
  return {
    type: LOAD_PACKAGE_SUCCESS,
    payload,
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
export function changeCategory(category) {
  return {
    type: CHANGE_CATEGORY_PACKAGE,
    category,
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
