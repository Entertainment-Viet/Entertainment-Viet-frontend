/**
 * Gets the repositories of the user from Github
 */

import {
  call,
  put,
  select,
  takeEvery,
  delay,
  takeLatest,
} from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_EVENT_SEARCH } from 'constants/api';
import { LOAD_CATEGORIES, LOAD_DATA } from './constants';
import {
  loadDataSuccess,
  loadDataError,
  loadCategoriesSuccess,
} from './actions';
import {
  makeSelectBudget,
  makeSelectCategory,
  makeSelectEnd,
  makeSelectPage,
  makeSelectSearch,
  makeSelectStart,
  makeSelectCity,
  makeSelectOrganizer,
} from './selectors';

export function* getData() {
  yield delay(500);
  const page = yield select(makeSelectPage());
  const search = yield select(makeSelectSearch());
  const city = yield select(makeSelectCity());
  const budget = yield select(makeSelectBudget());
  const start = yield select(makeSelectStart());
  const end = yield select(makeSelectEnd());
  const category = yield select(makeSelectCategory());
  const organizer = yield select(makeSelectOrganizer());
  try {
    const payload = yield call(get, API_EVENT_SEARCH, {
      page: page - 1,
      name: search,
      category,
      city,
      budget,
      startTime: start,
      endTime: end,
      organizer,
    });
    yield put(loadDataSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
export function* getCategories() {
  try {
    const payload = yield call(get, 'api/categories', {});
    yield put(loadCategoriesSuccess(payload));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export default function* watchLatestAction() {
  yield takeLatest(LOAD_DATA, getData);
  yield takeEvery(LOAD_CATEGORIES, getCategories);
}
