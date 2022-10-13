import produce from 'immer';
import {
  LOAD_DATA,
  LOAD_DATA_ERROR,
  LOAD_DATA_SUCCESS,
  LOAD_PACKAGE,
  LOAD_PACKAGE_SUCCESS,
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
  id: '',
  packages: false,
  packageInfo: false,
  comments: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DATA:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        draft.packages = false;
        draft.id = action.id;
        break;
      case LOAD_DATA_SUCCESS:
        draft.loading = false;
        draft.data = action.data;
        draft.packages = action.packages;
        break;
      case LOAD_DATA_ERROR:
        draft.error = action.error;
        draft.loading = false;
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
      case LOAD_COMMENTS:
        draft.error = false;
        draft.loading = true;
        break;
      case LOAD_COMMENTS_SUCCESS:
        draft.loading = false;
        draft.comments = action.payload;
        break;
    }
  });

export default pageReducer;
