import {
  CITY_LOAD,
  CITY_LOAD_SUCCESS,
  DISTRICT_LOAD,
  DISTRICT_LOAD_SUCCESS,
} from './constants';

export function loadCity() {
  return {
    type: CITY_LOAD,
  };
}
export function loadCitySuccess(city) {
  return {
    type: CITY_LOAD_SUCCESS,
    city,
  };
}
export function loadDistrict(city) {
  return {
    type: DISTRICT_LOAD,
    city,
  };
}
export function loadDistrictSuccess(district) {
  return {
    type: DISTRICT_LOAD_SUCCESS,
    district,
  };
}
