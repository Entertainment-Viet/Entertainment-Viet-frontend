import produce from 'immer';
import { ENUM_PAGGING } from 'constants/enums';
import {
  LOAD_BOOKING_EVENTS,
  LOAD_EVENTS,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  CHANGE_MODE,
  CHANGE_LIMIT,
  CHANGE_PAGE,
  LOAD_EVENT,
  LOAD_CATEGORIES_SUCCESS,
  CHANGE_CATEGORY_EVENT,
  CHANGE_OWN_EVENT_PRICE_RANGE,
  CHANGE_END,
  CHANGE_START,
  CHANGE_CITY,
  CHANGE_DISTRICT,
  LOAD_LOCATION_SUCCESS,
  LOAD_EVENT_SUCCESS,
  LOAD_DATA,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
  eventId: false,
  paging: ENUM_PAGGING,
  positionId: false,
  mode: 0,
  page: 0,
  limit: 10,
  total: 0,
  eventInfo: false,
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
      case LOAD_DATA:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        draft.paging = ENUM_PAGGING;
        break;
      case LOAD_EVENTS:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        draft.eventId = action.eventId;
        draft.positionId = action.positionId;
        break;

      case LOAD_BOOKING_EVENTS:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        draft.eventId = action.eventId;
        break;
      case CHANGE_CITY:
        draft.city = action.city;
        break;
      case CHANGE_DISTRICT:
        draft.district = action.district;
        break;
      case LOAD_INFO_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.data;
        draft.paging = action.paging;
        break;
      case CHANGE_CATEGORY_EVENT:
        draft.category = action.category;
        break;
      case LOAD_LOCATION_SUCCESS:
        draft.locationData = action.data;
        break;
      case LOAD_CATEGORIES_SUCCESS:
        draft.categories = action.data;
        break;
      case CHANGE_OWN_EVENT_PRICE_RANGE:
        draft.priceRange = action.priceRange;
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
      case LOAD_EVENT:
        draft.error = false;
        draft.loading = true;
        draft.eventInfo = false;
        break;
      case LOAD_EVENT_SUCCESS:
        draft.loading = false;
        draft.eventInfo = action.payload;
        break;
    }
  });

export default pageReducer;
