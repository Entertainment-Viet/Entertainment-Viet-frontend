import produce from 'immer';
import {
  LOAD_DATA,
  LOAD_DATA_ERROR,
  LOAD_DATA_SUCCESS,
  LOAD_POSITION,
  LOAD_POSITION_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
  positions: false,
  positionInfo: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DATA:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        draft.positions = false;
        break;
      case LOAD_DATA_SUCCESS:
        draft.loading = false;
        draft.data = action.data;
        draft.positions = action.positions;
        break;
      case LOAD_DATA_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case LOAD_POSITION:
        draft.error = false;
        draft.loading = true;
        draft.positionInfo = false;
        break;
      case LOAD_POSITION_SUCCESS:
        draft.loading = false;
        draft.positionInfo = action.payload;
        break;
    }
  });

export default pageReducer;
