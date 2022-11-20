/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_GET_LOCATION } from 'constants/api';
import { CITY_LOAD, DISTRICT_LOAD } from './constants';
import { loadCitySuccess, loadDistrictSuccess } from './actions';
import { makeSelectCity } from './selectors';

export function* getCityData() {
  try {
    const payload = yield call(get, API_GET_LOCATION, { type: 'city' });
    yield put(loadCitySuccess(payload.content));
  } catch (err) {
    console.log(err);
  }
}

export function* getDistrictData() {
  try {
    const city = yield select(makeSelectCity());
    const payload = yield call(get, API_GET_LOCATION, {
      type: 'district',
      parentId: city,
    });
    yield put(loadDistrictSuccess(payload.content));
  } catch (err) {
    console.log(err);
  }
}

export default function* watchLatestAction() {
  yield takeEvery(CITY_LOAD, getCityData);
  yield takeEvery(DISTRICT_LOAD, getDistrictData);
}
