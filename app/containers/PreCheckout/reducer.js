import produce from 'immer';
// import { ENUM_PAGGING } from 'constants/enums';
import {
  LOAD_INFO,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  PAY_INSTANT,
  PAY_METHOD_VIEW,
  PAY_LATER,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
  payMethod: PAY_METHOD_VIEW.LATER,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_INFO:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        break;

      case LOAD_INFO_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.data;
        break;

      case LOAD_INFO_ERROR:
        draft.loading = action.error;
        draft.error = true;
        draft.data = false;
        break;

      case PAY_INSTANT:
        draft.payMethod = PAY_METHOD_VIEW.INSTANT;
        break;

      case PAY_LATER:
        draft.payMethod = PAY_METHOD_VIEW.LATER;
        break;
    }
  });

export default pageReducer;
