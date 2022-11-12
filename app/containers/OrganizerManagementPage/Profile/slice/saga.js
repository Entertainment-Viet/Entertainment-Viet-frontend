import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_ORGANIZER_DETAIL, API_GET_CATEGORIES } from 'constants/api';
import {
  loadDataError,
  loadOrganizerInfoSuccess,
  loadCategoriesSuccess,
} from './actions';
import { LOAD_CATEGORIES, LOAD_ORGANIZER } from './constants';

export function* loadOrganizerInfo(id) {
  try {
    const payload = yield call(get, API_ORGANIZER_DETAIL, {}, id.organizerId);
    yield put(loadOrganizerInfoSuccess(payload));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export function* getCategories() {
  try {
    const payload = yield call(get, API_GET_CATEGORIES, {});
    yield put(loadCategoriesSuccess(payload));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_ORGANIZER, loadOrganizerInfo);
  yield takeEvery(LOAD_CATEGORIES, getCategories);
}
