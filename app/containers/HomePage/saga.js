import { call, put, takeEvery, delay } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_TALENT_LIST } from 'constants/api';
import { LOAD_INFO } from './constants';
import {
  loadInfoSuccess,
  loadInfoError,
  loadEditorChoiceInfoSuccess,
} from './actions';
import {} from './selectors';

export function* getData() {
  yield delay(1000);
  try {
    const payload = yield call(get, API_TALENT_LIST, {});
    yield put(loadInfoSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadInfoError(err));
  }
}
export function* getEditorChoiceData() {
  yield delay(1000);
  try {
    const payload = yield call(get, API_TALENT_LIST, { editorChoice: true });
    yield put(loadEditorChoiceInfoSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadInfoError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_INFO, getData);
  yield takeEvery(LOAD_INFO, getEditorChoiceData);
}
