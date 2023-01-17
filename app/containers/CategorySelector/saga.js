/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { CATEGORY_LOAD } from './constants';
import { loadCategorySuccess } from './actions';

export function* getCategoryData() {
  try {
    const payload = yield call(get, 'api/categories', {});
    yield put(loadCategorySuccess(payload));
  } catch (err) {
    console.log(err);
  }
}

export default function* watchLatestAction() {
  yield takeEvery(CATEGORY_LOAD, getCategoryData);
}
