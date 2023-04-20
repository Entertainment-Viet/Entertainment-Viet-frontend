/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_DATA,
  LOAD_ERROR,
  LOAD_SUCCESS,
  OPEN_SIDE_BAR,
} from './constants';

// The initial state of the App
export const initialState = {
  data: false,
  loading: false,
  error: false,
  success: false,
  sidebarOpen: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DATA:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.data = action.data;
        break;

      case LOAD_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.success = false;
        draft.data = false;
        break;

      case LOAD_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = false;
        draft.success = action.success;
        break;
      case OPEN_SIDE_BAR:
        draft.sidebarOpen = action.open;
        break;
    }
  });

export default appReducer;
