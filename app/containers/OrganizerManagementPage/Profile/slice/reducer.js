import produce from 'immer';
import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_ORGANIZER,
  LOAD_ORGANIZER_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  organizerInfo: false,
  categories: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ORGANIZER:
        draft.error = false;
        draft.loading = true;
        break;
      case LOAD_ORGANIZER_SUCCESS:
        draft.loading = false;
        draft.organizerInfo = action.payload;
        break;
      case LOAD_CATEGORIES:
        draft.error = false;
        draft.loading = true;
        break;
      case LOAD_CATEGORIES_SUCCESS:
        draft.loading = false;
        draft.categories = action.payload;
        break;
    }
  });

export default pageReducer;
