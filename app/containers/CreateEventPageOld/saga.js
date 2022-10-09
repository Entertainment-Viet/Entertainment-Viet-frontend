/**
 * Gets the repositories of the user from GitHub
 */

import { takeEvery } from 'redux-saga/effects';
import { NFT_LOAD } from './constants';
// import {} from 'constants/api';
// import {} from './actions';
// import {} from './selectors';

// eslint-disable-next-line no-empty-function
export function* getData() {}

export default function* watchLatestAction() {
  yield takeEvery(NFT_LOAD, getData);
}
