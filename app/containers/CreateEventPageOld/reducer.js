import produce from 'immer';
import { ENUM_PAGGING } from 'constants/enums';
import { NFT_LOAD } from './constants';

export const initialState = {
  loading: false,
  error: false,
  products: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case NFT_LOAD:
        draft.loading = true;
        draft.error = false;
        draft.products = false;
        draft.paging = ENUM_PAGGING;
        break;
    }
  });

export default pageReducer;
