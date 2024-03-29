/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import * as Paths from 'constants/routes';
import * as Storages from 'constants/storage';
// eslint-disable-next-line import/no-cycle
// import { useHistory } from 'react-router-dom';
// import { getCookie } from 'utils/cookie';

// import { DEFAULT_LOCALE } from 'i18n';

// Language
export const setLanguage = locale => {
  localStorage.setItem(Storages.STORAGE_LANG, locale);
};
// export const getLanguage = () => {
//     const lang = localStorage.getItem(Storages.STORAGE_LANG);
//     return lang ? lang : DEFAULT_LOCALE;
// }

// export const getLanguageText = (item, name="name") => {
//     const lang = getCookie('lang') || DEFAULT_LOCALE;
//     try{
//         return lang == DEFAULT_LOCALE ? item[name] : (item[name + '_' + lang] ? item[name + '_' + lang] : item[name]);
//     } catch(err){
//         return item[name];
//     }
// }

// Handle variables
export const removeEmptyObj = obj => {
  for (const propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === '' ||
      obj[propName].length === 0
    ) {
      delete obj[propName];
    }
  }
  return obj;
};
export const isEmptyObject = obj =>
  obj ? obj.constructor === Object && Object.keys(obj).length > 0 : false;
export const isArray = arr =>
  arr ? arr.constructor === Array && arr.length > 0 : false;
export const isEmptyVar = mVar => {
  if (!mVar) return true;
  return mVar === '' || mVar === '[]' || mVar === '{}';
};
export const getEmptyVar = mVar => {
  if (!mVar) return undefined;
  switch (mVar.constructor) {
    case Object:
      return {};
    case Array:
      return [];
    default:
      return '';
  }
};
export const isJson = mStr => {
  try {
    JSON.parse(mStr);
  } catch (e) {
    return false;
  }
  return true;
};

export const getObjectValueByIds = (obj, ids) => {
  try {
    return ids.map(id => (obj[id] ? obj[id] : ''));
  } catch (err) {
    return '';
  }
};

export const getObjectValueById = (obj, id) => {
  try {
    return obj[id] ? obj[id] : '';
  } catch (err) {
    return '';
  }
};

// Handle urls
export const redirectTo = name => {
  window.location.href = name;
};
// export const redirectBack = value => {
//   const history = useHistory();
//   history.goBack();
// };
export const redirectHome = () => {
  redirectTo(Paths.ROUTE_HOME);
};
export const redirectLogin = () => {
  redirectTo(Paths.ROUTE_LOGIN);
};
export const redirectRegister = () => {
  redirectTo(Paths.ROUTE_REGISTER);
};

export const refreshPage = () => {
  window.location.reload(false);
};

export const getParamUrl = (name, cUrl = '') => {
  try {
    const url = cUrl || window.location.search;
    const queryParams = new URLSearchParams(url);
    return queryParams.get(name);
  } catch (err) {
    return '';
  }
};

export const setParamUrl = (
  param,
  route = window.location.pathname,
  sep = '?',
  title = '',
) => {
  try {
    window.history.replaceState(null, title, route + sep + param);
  } catch (err) {
    console.log(err);
  }
};

export const mapRouteParam = (route, value, param = ':id', fallback = '') => {
  try {
    return route.replace(param, value);
  } catch (err) {
    return fallback || '#';
  }
};

// Handle Errors
export const setError = error => {
  localStorage.setItem(Storages.STORAGE_ERROR, JSON.stringify(error));
};

export const cacthError = error => {
  console.log(error);
};

export const cacthResponse = res => {
  console.log(res);
};

export const getError = () => {
  try {
    const error = localStorage.getItem(Storages.STORAGE_ERROR);
    return JSON.parse(error);
  } catch (err) {
    return '';
  }
};

export const getResErrorCode = res => {
  try {
    return res.data.error_code;
  } catch (err) {
    return 'DEFAULT';
  }
};

export const getResStatus = res => {
  try {
    return res.status;
  } catch (err) {
    return '';
  }
};

export const getErrorCode = () => {
  try {
    const error = getError();
    return getError(error.data.error_code);
  } catch (err) {
    return '';
  }
};

export const removeError = () => {
  localStorage.removeItem(Storages.STORAGE_ERROR);
};

export function toIsoString(date) {
  const tzo = -date.getTimezoneOffset();
  const dif = tzo >= 0 ? '+' : '-';
  const pad = function(num) {
    return (num < 10 ? '0' : '') + num;
  };

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds(),
  )}${dif}${pad(Math.floor(Math.abs(tzo) / 60))}:${pad(Math.abs(tzo) % 60)}`;
}
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function handleAddress(addr) {
  let returnAddress = '';
  if (addr) {
    if (addr.name) returnAddress = returnAddress.concat(addr.name);
    if (addr.parent) {
      returnAddress = returnAddress.concat(`, ${addr.parent.name}`);
      if (addr.parent.parent)
        returnAddress = returnAddress.concat(`, ${addr.parent.parent.name}`);
    }
  }
  return returnAddress;
}
export function calculateTotalPrice(arr) {
  const totalPrice = arr.reduce(
    (partialSum, a) => partialSum + a.suggestedPrice,
    0,
  );
  return numberWithCommas(totalPrice);
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function convertReadableTime(timestamp) {
  return new Date(timestamp).toLocaleString();
}

export function getSubCategory(category, categories) {
  let children = [];
  children =
    categories &&
    categories.length > 0 &&
    categories.filter(
      item => item.parentUid === category.uid && item.parentUid !== null,
    );
  if (children) {
    category.chilren = children;
  }
  return category;
}
export function classifyCategories(categories) {
  let parentCategories = [];
  let children = [];
  // Only filter parent categories
  parentCategories =
    categories && categories.filter(item => item.parentUid === null);

  // Filter children and put to their parent
  // eslint-disable-next-line no-unused-expressions
  parentCategories &&
    parentCategories.forEach(item => {
      children = categories.filter(child => child.parentUid === item.uid);
      // eslint-disable-next-line no-param-reassign
      item.children = children;
    });

  return parentCategories;
}

export const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const toLocalISOTime = date => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
  return new Date(date - tzoffset).toISOString().slice(0, -1);
};
