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
  LOAD_EVENT_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
  eventId: false,
  positionId: false,
  mode: 0,
  page: 0,
  limit: 10,
  total: 0,
  paging: ENUM_PAGGING,
  eventInfo: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
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

      case LOAD_INFO_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.data;
        console.log('action: ', action.paging);
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
