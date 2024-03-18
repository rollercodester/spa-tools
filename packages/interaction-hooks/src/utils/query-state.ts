import { isNotEmptyRecord } from '../../../utilities/src';

export function parseQueryState<S = Record<string, unknown>>(useLocalStorage = false) {
  if (typeof window === 'undefined') {
    return null;
  }

  let cacheState: Record<string, unknown> = {};

  if (useLocalStorage) {
    const storageKey = getStorageKey();
    const storageVal = localStorage.getItem(storageKey);

    if (storageVal) {
      cacheState = JSON.parse(storageVal);
    }
  }

  const queryParams = new URLSearchParams(window.location.search);
  let needToUpdateSearch = false;

  if (isNotEmptyRecord(cacheState)) {
    Object.keys(cacheState).forEach((key) => {
      if (!queryParams.has(key)) {
        queryParams.append(key, String(cacheState[key]));
        needToUpdateSearch = true;
      }
    });
  }

  const state: Record<string, unknown> = {};

  queryParams.forEach((value, key) => {
    if (!state[key]) {
      state[key] = value;
    } else {
      if (Array.isArray(state[key])) {
        (state[key] as string[]).push(value);
      } else {
        // multiple values detected so convert to array
        const firstVal = state[key] as string;
        state[key] = [firstVal, value];
      }
    }
  });

  if (!isNotEmptyRecord(state)) {
    return null;
  }

  if (needToUpdateSearch) {
    return pushQueryState<S>(state as S, false);
  }

  return state as S;
}

export function pushQueryState<S = Record<string, unknown>>(
  newQueryState: S | null,
  useLocalStorage = false
): S | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const newUrl = new URL(window.location.href);

  // clear previous search
  newUrl.search = '';

  if (newQueryState) {
    const normState = newQueryState as Record<string, unknown>;
    Object.keys(normState).forEach((key) => {
      const val = normState[key];

      if (Array.isArray(val)) {
        val.forEach((item) => {
          newUrl.searchParams.append(key, item);
        });
      } else {
        newUrl.searchParams.append(key, String(val));
      }
    });
  }

  if (newUrl.search !== window.location.search) {
    newUrl.search = newUrl.searchParams.toString();
    window.history.pushState(window.history.state, '', newUrl.toString());

    if (useLocalStorage) {
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(newQueryState));
    }
  }

  return parseQueryState<S>();
}

//
//
// helpers
//
//

export function getStorageKey() {
  return `queryState-${window.location.href.split('?')[0]}`;
}
