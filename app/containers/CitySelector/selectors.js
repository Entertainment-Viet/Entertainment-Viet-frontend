import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.CitySelector || initialState;

const makeSelectCityData = () =>
  createSelector(
    selectState,
    State => State.cityData,
  );
const makeSelectCity = () =>
  createSelector(
    selectState,
    State => State.city,
  );
const makeSelectDistrictData = () =>
  createSelector(
    selectState,
    State => State.districtData,
  );
const makeSelectDistrict = () =>
  createSelector(
    selectState,
    State => State.district,
  );

export {
  makeSelectCity,
  makeSelectCityData,
  makeSelectDistrict,
  makeSelectDistrictData,
};
