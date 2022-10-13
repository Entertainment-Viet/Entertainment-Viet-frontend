/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import {
  API_TALENT_DETAIL,
  API_TALENT_PACKAGE,
  API_GET_PACKAGE_INFO,
  API_TALENT_REVIEWS,
} from 'constants/api';
import { LOAD_DATA, LOAD_PACKAGE, LOAD_COMMENTS } from './constants';
import {
  loadDataSuccess,
  loadDataError,
  loadPackageInfoSuccess,
  loadCommentsInfoSuccess,
} from './actions';
import { makeSelectId } from './selectors';

export function* getData() {
  const id = yield select(makeSelectId());
  try {
    const payload = yield call(get, API_TALENT_DETAIL, {}, id);
    const packages = yield call(get, API_TALENT_PACKAGE, {}, id);
    yield put(loadDataSuccess(payload, packages));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export function* getPackage(id) {
  try {
    const payload = yield call(
      get,
      `${API_GET_PACKAGE_INFO}/${id.id}`,
      {},
      id.talentId,
    );
    yield put(loadPackageInfoSuccess(payload));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export function* getComments(id) {
  try {
    const payload = yield call(
      get,
      API_TALENT_REVIEWS,
      {
        page: id.pageNumber,
      },
      id.talentId,
    );
    yield put(loadCommentsInfoSuccess(payload));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_DATA, getData);
  yield takeEvery(LOAD_PACKAGE, getPackage);
  yield takeEvery(LOAD_COMMENTS, getComments);
}
