import { CHANGE_CATEGORY } from './constant';
export function changeCategory(category) {
  return {
    type: CHANGE_CATEGORY,
    category,
  };
}
