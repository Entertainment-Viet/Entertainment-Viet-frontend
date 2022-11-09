import {
  LOAD_INFO,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  PAY_LATER,
  PAY_INSTANT,
} from './constants';

export function loadInfo() {
  return {
    type: LOAD_INFO,
  };
}
export function loadInfoSuccess(data) {
  return {
    type: LOAD_INFO_SUCCESS,
    data,
  };
}
export function loadInfoError(error) {
  return {
    type: LOAD_INFO_ERROR,
    error,
  };
}
export function choosePaymentType(typePayment) {
  return {
    type: typePayment === 'payInstant' ? PAY_INSTANT : PAY_LATER,
    typePayment,
  };
}
