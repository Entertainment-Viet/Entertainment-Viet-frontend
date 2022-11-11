import { ENUM_ROLES } from 'constants/enums';
import { CHANGE_PRICE_RANGE, CHANGE_EVENT_PRICE_RANGE } from './constants';

export function changePriceRange(priceRange) {
  const role = localStorage.getItem('role');
  return {
    type:
      role === ENUM_ROLES.ORG ? CHANGE_PRICE_RANGE : CHANGE_EVENT_PRICE_RANGE,
    priceRange,
  };
}
