import produce from 'immer';
import {
  DATA_LOAD,
  DATA_LOAD_SUCCESS,
  CHANGE_END,
  CHANGE_START,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
  start: '',
  end: '',
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DATA_LOAD:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        break;
      case DATA_LOAD_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        break;
      case CHANGE_END:
        draft.end = action.end;
        break;
      case CHANGE_START:
        draft.start = action.start;
        break;
    }
  });

export default pageReducer;
