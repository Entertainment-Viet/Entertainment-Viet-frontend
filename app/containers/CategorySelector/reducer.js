import produce from 'immer';
import { CATEGORY_LOAD, CATEGORY_LOAD_SUCCESS } from './constants';

export const initialState = {
  loading: false,
  error: false,
  categories: [],
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CATEGORY_LOAD:
        draft.loading = true;
        draft.error = false;
        break;
      case CATEGORY_LOAD_SUCCESS:
        console.log(action.category);
        draft.loading = false;
        draft.categories = action.category;
        break;
    }
  });

export default pageReducer;
