import { call, put, select, takeEvery, all } from 'redux-saga/effects';
import { get } from 'utils/request';
import {
  API_PACKAGE_LIST,
  API_ORG_DETAIL,
  API_GET_PACKAGE_INFO,
  API_GET_CATEGORIES,
} from 'constants/api';
import { ENUM_CURRENCY } from 'constants/enums';

import {
  LOAD_PACKAGES,
  LOAD_PACKAGE,
  CHANGE_OWN_PACKAGE_PRICE_RANGE,
  CHANGE_START,
  CHANGE_END,
  CHANGE_CATEGORY_PACKAGE,
  LOAD_CATEGORIES,
} from './constants';
import {
  loadInfoSuccess,
  loadInfoError,
  loadPackageInfoSuccess,
  loadCategoriesSuccess,
  loadDataError,
} from './actions';
import {
  makeSelectLimit,
  makeSelectMode,
  makeSelectPackage,
  makeSelectPage,
  makeSelectEnd,
  makeSelectStart,
  makeSelectPriceMax,
  makeSelectPriceMin,
  makeSelectCategory,
} from './selectors';

const USER_ID = localStorage.getItem('uid');

export function* getPackageData() {
  try {
    // const page = yield select(makeSelectPage());
    const mode = yield select(makeSelectMode());
    const page = yield select(makeSelectPage());
    const size = yield select(makeSelectLimit());
    let payload;
    if (mode === 0) {
      payload = yield call(get, API_PACKAGE_LIST, { page, size }, USER_ID);
    } else {
      const packageId = yield select(makeSelectPackage());
      // const page = yield select(makeSelectPage());
      payload = yield call(
        get,
        `${API_PACKAGE_LIST}/${packageId}/bookings`,
        { page, size },
        USER_ID,
      );
      const booker = yield all(
        payload.content.map(el =>
          call(get, `${API_ORG_DETAIL}`, {}, el.organizerId),
        ),
      );
      payload.content = payload.content.map((p, index) => ({
        ...p,
        booker: booker[index],
      }));
    }
    yield put(loadInfoSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadInfoError(err));
  }
}

export function* getPackageDetail(id) {
  try {
    const payload = yield call(
      get,
      `${API_GET_PACKAGE_INFO}/${id.id}`,
      {},
      id.talentId,
    );
    yield put(loadPackageInfoSuccess(payload));
  } catch (err) {
    yield put(loadInfoError(err));
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
export function* getEventByTime() {
  const start = yield select(makeSelectStart());
  const end = yield select(makeSelectEnd());
  try {
    const payload = yield call(
      get,
      API_PACKAGE_LIST,
      {
        startTime: start,
        endTime: end,
      },
      USER_ID,
    );
    yield put(loadInfoSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
export function* getCategoriesByChanging() {
  try {
    const category = yield select(makeSelectCategory());
    const payload = yield call(get, API_PACKAGE_LIST, { category }, USER_ID);
    yield put(loadInfoSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
export function* getPriceRange() {
  try {
    const currency = ENUM_CURRENCY.VND;
    const maxPrice = yield select(makeSelectPriceMax());
    const minPrice = yield select(makeSelectPriceMin());
    const payload = yield call(
      get,
      API_PACKAGE_LIST,
      {
        currency,
        minPrice,
        maxPrice,
      },
      USER_ID,
    );

    yield put(loadInfoSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
export default function* watchLatestAction() {
  yield takeEvery(LOAD_PACKAGES, getPackageData);
  yield takeEvery(LOAD_PACKAGE, getPackageDetail);
  yield takeEvery(CHANGE_CATEGORY_PACKAGE, getCategoriesByChanging);
  yield takeEvery(LOAD_CATEGORIES, getCategories);
  yield takeEvery(CHANGE_OWN_PACKAGE_PRICE_RANGE, getPriceRange);
  yield takeEvery(CHANGE_START, getEventByTime);
  yield takeEvery(CHANGE_END, getEventByTime);
  // yield takeEvery(LOAD_BOOKING_PACKAGES, getBookingData);
}
