import produce from 'immer';
import {
  CITY_LOAD,
  CITY_LOAD_SUCCESS,
  DISTRICT_LOAD,
  DISTRICT_LOAD_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  cityData: [],
  districtData: [],
  city: false,
  district: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CITY_LOAD:
        draft.loading = true;
        draft.error = false;
        break;
      case CITY_LOAD_SUCCESS:
        draft.loading = false;
        draft.cityData = action.city;
        break;
      case DISTRICT_LOAD:
        draft.loading = true;
        draft.city = action.city;
        draft.district = false;
        break;
      case DISTRICT_LOAD_SUCCESS:
        draft.loading = false;
        draft.districtData = action.district;
        break;
    }
  });

export default pageReducer;
