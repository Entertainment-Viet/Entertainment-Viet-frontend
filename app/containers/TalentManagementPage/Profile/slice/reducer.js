import produce from 'immer';
import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_TALENT,
  LOAD_TALENT_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  talentInfo: false,
  categories: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TALENT:
        draft.error = false;
        draft.loading = true;
        break;
      case LOAD_TALENT_SUCCESS:
        draft.loading = false;
        draft.talentInfo = action.payload;
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
