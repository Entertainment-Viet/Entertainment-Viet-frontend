import produce from 'immer';
import { ENUM_PAGGING } from 'constants/enums';
import {
  LOAD_BOOKING_PACKAGES,
  LOAD_PACKAGES,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  CHANGE_MODE,
  CHANGE_LIMIT,
  CHANGE_PAGE,
  LOAD_PACKAGE,
  LOAD_PACKAGE_SUCCESS,
  LOAD_CATEGORIES_SUCCESS,
  CHANGE_CATEGORY_PACKAGE,
  CHANGE_OWN_PACKAGE_PRICE_RANGE,
  CHANGE_END,
  LOAD_LOCATION_SUCCESS,
  CHANGE_START,
  CHANGE_CITY,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
  packageId: false,
  mode: 0,
  page: 0,
  limit: 10,
  total: 0,
  paging: ENUM_PAGGING,
  packageInfo: false,
  city: '',
  district: '',
  locationData: false,
  priceRange: [],
  start: '',
  end: '',
  category: '',
  categories: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_PACKAGES:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        draft.packageId = action.id;
        break;

      case LOAD_BOOKING_PACKAGES:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        draft.packageId = action.packageId;
        break;

      case LOAD_INFO_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.data;
        draft.paging = action.paging;
        break;

      case LOAD_INFO_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.data = false;
        break;
      case CHANGE_MODE:
        draft.mode = action.mode;
        break;
      case CHANGE_LIMIT:
        draft.limit = action.limit;
        break;
      case CHANGE_PAGE:
        draft.page = action.page;
        break;
      case CHANGE_END:
        draft.end = action.end;
        break;
      case CHANGE_START:
        draft.start = action.start;
        break;
      case LOAD_LOCATION_SUCCESS:
        draft.locationData = action.data;
        break;
      case CHANGE_CITY:
        draft.city = action.city;
        break;
      case CHANGE_CATEGORY_PACKAGE:
        draft.category = action.category;
        break;
      case LOAD_CATEGORIES_SUCCESS:
        draft.categories = action.data;
        break;
      case CHANGE_OWN_PACKAGE_PRICE_RANGE:
        draft.priceRange = action.priceRange;
        break;
      case LOAD_PACKAGE:
        draft.error = false;
        draft.loading = true;
        draft.packageInfo = false;
        break;
      case LOAD_PACKAGE_SUCCESS:
        draft.loading = false;
        draft.packageInfo = action.payload;
        break;
    }
  });

export default pageReducer;
