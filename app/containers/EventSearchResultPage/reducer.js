import produce from 'immer';
import { ENUM_PAGGING } from 'constants/enums';
import {
  CHANGE_PAGE,
  LOAD_DATA,
  CHANGE_BUDGET,
  CHANGE_END,
  CHANGE_START,
  CHANGE_CATEGORY,
  CHANGE_CITY,
  CHANGE_SEARCH,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_DATA_SUCCESS,
  CHANGE_ORGANIZER,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
  paging: ENUM_PAGGING,
  page: 1,
  search: '',
  category: '',
  city: '',
  budget: '',
  organizer: '',
  start: '',
  end: '',
  categories: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DATA:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        draft.paging = ENUM_PAGGING;
        break;
      case CHANGE_PAGE:
        draft.page = action.page;
        break;
      case CHANGE_BUDGET:
        draft.budget = action.budget;
        break;
      case CHANGE_ORGANIZER:
        draft.organizer = action.organizer;
        break;
      case CHANGE_END:
        draft.end = action.end;
        break;
      case CHANGE_START:
        draft.start = action.start;
        break;
      case CHANGE_CATEGORY:
        draft.category = action.category;
        break;
      case CHANGE_CITY:
        draft.city = action.city;
        break;
      case CHANGE_SEARCH:
        console.log(action.search);
        draft.search = action.search;
        break;
      case LOAD_DATA_SUCCESS:
        draft.loading = false;
        draft.data = action.data;
        draft.paging = action.paging;
        break;
      case LOAD_CATEGORIES_SUCCESS:
        draft.categories = action.data;
    }
  });

export default pageReducer;
