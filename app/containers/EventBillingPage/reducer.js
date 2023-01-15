import produce from 'immer';
import { DATA_LOAD, DATA_LOAD_SUCCESS } from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
  event: false,
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
        draft.event = action.event;
        draft.loading = false;
    }
  });

export default pageReducer;
