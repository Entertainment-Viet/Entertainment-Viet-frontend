import { ENUM_ROLES } from 'constants/enums';
import {
  CHANGE_CATEGORY,
  CHANGE_CATEGORY_EVENT,
  CHANGE_CATEGORY_PACKAGE,
  CHANGE_CATEGORY_OWN_EVENT,
} from './constant';
export function changeCategory(category) {
  const role = localStorage.getItem('role');

  return {
    type: role === ENUM_ROLES.ORG ? CHANGE_CATEGORY : CHANGE_CATEGORY_EVENT,
    category,
  };
}
export function changeCategoryEvent(category) {
  return {
    type: CHANGE_CATEGORY_OWN_EVENT,
    category,
  };
}
export function changeCategoryPackage(category) {
  return {
    type: CHANGE_CATEGORY_PACKAGE,
    category,
  };
}
