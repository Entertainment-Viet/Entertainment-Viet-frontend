import { call, put, select, takeEvery, delay } from 'redux-saga/effects';
import { get } from 'utils/request';
import {
  API_TALENT_LIST,
  API_GET_CATEGORIES,
  API_GET_LOCATION,
} from 'constants/api';
import { ENUM_CURRENCY } from 'constants/enums';
import { LOAD_CATEGORIES, LOAD_DATA, LOAD_LOCATION } from './constants';
import {
  loadDataSuccess,
  loadDataError,
  loadCategoriesSuccess,
  loadLocationSuccess,
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
  makeSelectDistrict,
} from './selectors';

export function* getData() {
  const page = yield select(makeSelectPage());
  yield delay(1000);
  const search = yield select(makeSelectSearch());
  const start = yield select(makeSelectStart());
  const end = yield select(makeSelectEnd());
  const category = yield select(makeSelectCategory());
  const cityName = yield select(makeSelectCity());
  const districtName = yield select(makeSelectDistrict());
  const currency = ENUM_CURRENCY.VND;
  const maxPrice = yield select(makeSelectPriceMax());
  const minPrice = yield select(makeSelectPriceMin());
  try {
    const payload = yield call(get, API_TALENT_LIST, {
      page: page - 1,
      displayName: search,
      category,
      startTime: start,
      endTime: end,
      locationId: districtName || cityName,
      currency: minPrice && maxPrice ? currency : null,
      maxPrice,
      minPrice,
    });
    yield put(loadDataSuccess(payload.content, payload.paging));
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
// export function* getCategoriesByChanging() {
//   try {
//     const category = yield select(makeSelectCategory());
//     const payload = yield call(get, API_TALENT_LIST, { category });
//     yield put(loadDataSuccess(payload.content, payload.paging));
//   } catch (err) {
//     yield put(loadDataError(err));
//   }
// }
// export function* getPriceRange() {
//   try {
//     const currency = ENUM_CURRENCY.VND;
//     const maxPrice = yield select(makeSelectPriceMax());
//     const minPrice = yield select(makeSelectPriceMin());
//     const payload = yield call(get, API_TALENT_LIST, {
//       currency,
//       maxPrice,
//       minPrice,
//     });
//     yield put(loadPriceRangeSuccess(payload.content, payload.paging));
//   } catch (err) {
//     yield put(loadDataError(err));
//   }
// }
export function* getLocation() {
  try {
    const payload = yield call(get, API_GET_LOCATION, {});
    yield put(loadLocationSuccess(payload.content));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
// export function* getLocationChange() {
//   try {
//     const cityName = yield select(makeSelectCity());
//     const districtName = yield select(makeSelectDistrict());
//     const payload = yield call(get, API_TALENT_LIST, {
//       locationId: districtName || cityName,
//     });
//     yield put(loadDataSuccess(payload.content, payload.paging));
//   } catch (err) {
//     yield put(loadDataError(err));
//   }
// }

export default function* watchLatestAction() {
  yield takeEvery(LOAD_DATA, getData);
  yield takeEvery(LOAD_CATEGORIES, getCategories);
  // yield takeEvery(CHANGE_CATEGORY, getCategoriesByChanging);
  // yield takeEvery(CHANGE_PRICE_RANGE, getPriceRange);
  yield takeEvery(LOAD_LOCATION, getLocation);
  // yield takeEvery(CHANGE_CITY, getLocationChange);
  // yield takeEvery(CHANGE_DISTRICT, getLocationChange);
}
