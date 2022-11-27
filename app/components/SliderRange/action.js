import { ENUM_ROLES } from 'constants/enums';
import {
  CHANGE_PRICE_RANGE,
  CHANGE_EVENT_PRICE_RANGE,
  CHANGE_OWN_EVENT_PRICE_RANGE,
  CHANGE_OWN_PACKAGE_PRICE_RANGE,
} from './constants';

const role = localStorage.getItem('role');

export function changePriceRange(priceRange) {
  return {
    type:
      role === ENUM_ROLES.ORG ? CHANGE_PRICE_RANGE : CHANGE_EVENT_PRICE_RANGE,
    priceRange,
  };
}

export function filterPriceOwnManager(priceRange) {
  return {
    type:
      role === ENUM_ROLES.ORG
        ? CHANGE_OWN_EVENT_PRICE_RANGE
        : CHANGE_OWN_PACKAGE_PRICE_RANGE,
    priceRange,
  };
}
