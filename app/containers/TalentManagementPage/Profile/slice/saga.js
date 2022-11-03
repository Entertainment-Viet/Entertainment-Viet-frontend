import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_TALENT_DETAIL, API_GET_CATEGORIES } from 'constants/api';
import {
  loadDataError,
  loadTalentInfoSuccess,
  loadCategoriesSuccess,
} from './actions';
import { LOAD_CATEGORIES, LOAD_TALENT } from './constants';

export function* getTalentInfo(id) {
  try {
    const payload = yield call(get, API_TALENT_DETAIL, {}, id.talentId);
    yield put(loadTalentInfoSuccess(payload));
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
  yield takeEvery(LOAD_TALENT, getTalentInfo);
  yield takeEvery(LOAD_CATEGORIES, getCategories);
}
