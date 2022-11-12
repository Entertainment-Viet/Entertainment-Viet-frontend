import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_ORGANIZER_DETAIL } from 'constants/api';
import { loadDataError, loadOrgInfoSuccess } from './actions';
import { LOAD_ORG } from './constants';

export function* getOrgInfo(id) {
  try {
    const payload = yield call(get, API_ORGANIZER_DETAIL, {}, id.organizerId);
    yield put(loadOrgInfoSuccess(payload));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
export default function* watchLatestAction() {
  yield takeEvery(LOAD_ORG, getOrgInfo);
}
