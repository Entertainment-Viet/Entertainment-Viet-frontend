import { call, put, select, takeEvery, delay } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_TALENT_LIST } from 'constants/api';
import { LOAD_CATEGORIES, LOAD_DATA, CHANGE_PRICE_RANGE } from './constants';
import {
  loadDataSuccess,
  loadDataError,
  loadCategoriesSuccess,
  loadPriceRangeSuccess,
} from './actions';
import {
  makeSelectPriceMax,
  makeSelectPriceMin,
  makeSelectCategory,
  makeSelectEnd,
  makeSelectPage,
  makeSelectSearch,
  makeSelectStart,
  makeSelectCity,
} from './selectors';

export function* getData() {
  const page = yield select(makeSelectPage());
  yield delay(1000);
  const search = yield select(makeSelectSearch());
  const city = yield select(makeSelectCity());
  const start = yield select(makeSelectStart());
  const end = yield select(makeSelectEnd());
  const category = yield select(makeSelectCategory());
  try {
    const payload = yield call(get, API_TALENT_LIST, {
      page: page - 1,
      displayName: search,
      category,
      city,
      startTime: start,
      endTime: end,
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
export function* getPriceRange() {
  try {
    const currency = 'VND';
    const maxPrice = yield select(makeSelectPriceMax());
    const minPrice = yield select(makeSelectPriceMin());
    const payload = yield call(get, API_TALENT_LIST, {
      currency,
      maxPrice,
      minPrice,
    });
    yield put(loadPriceRangeSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_DATA, getData);
  yield takeEvery(LOAD_CATEGORIES, getCategories);
  yield takeEvery(CHANGE_PRICE_RANGE, getPriceRange);
}
