import { ENUM_ROLES } from 'constants/enums';
import { CHANGE_CATEGORY, CHANGE_CATEGORY_EVENT } from './constant';
export function changeCategory(category) {
  const role = localStorage.getItem('role');

  return {
    type: role === ENUM_ROLES.ORG ? CHANGE_CATEGORY : CHANGE_CATEGORY_EVENT,
    category,
  };
}
