import produce from 'immer';
import { ENUM_PAGGING } from 'constants/enums';
import {
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  CHANGE_LIMIT,
  CHANGE_PAGE,
  LOAD_BOOKINGS,
  LOAD_BOOKINGS_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  paging: ENUM_PAGGING,
  bookings: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_INFO_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.paging = action.paging;
        break;

      case LOAD_INFO_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case CHANGE_LIMIT:
        draft.limit = action.limit;
        break;
      case CHANGE_PAGE:
        draft.page = action.page;
        break;
      case LOAD_BOOKINGS:
        draft.error = false;
        draft.loading = true;
        draft.bookings = false;
        break;
      case LOAD_BOOKINGS_SUCCESS:
        draft.loading = false;
        draft.bookings = action.payload;
        draft.paging = action.payload.paging;
        break;
    }
  });

export default pageReducer;
