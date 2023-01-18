import produce from 'immer';
// import { ENUM_PAGGING } from 'constants/enums';
import {
  LOAD_INFO,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  LOAD_EDITORCHOICE_INFO_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
  editorChoice: false,
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

      case LOAD_EDITORCHOICE_INFO_SUCCESS:
        draft.loading = false;
        draft.error = false;
        console.log(action.data);
        draft.editorChoice = action.data;
        break;

      case LOAD_INFO_ERROR:
        draft.loading = action.error;
        draft.error = true;
        draft.data = false;
        break;
    }
  });

export default pageReducer;
