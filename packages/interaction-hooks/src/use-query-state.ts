import { useCallback, useState } from 'react';
import { parseQueryState, pushQueryState } from './utils';

export interface UseQueryStateResult<S> {
  queryState: S | null;
  setQueryState: (newQueryState: S | null) => void;
}

/**
 * React hook to get and set the browser's current query state without causing a hard refresh.
 *
 * @param useLocalStorage - If true, the query state will be stored in local storage.
 */
export function useQueryState<S>(useLocalStorage = false) {
  const [queryState, updateQueryState] = useState<S | null>(parseQueryState<S>(useLocalStorage));

  const setQueryState = useCallback(
    (newQueryState: S | null) => {
      const newState = pushQueryState<S>(newQueryState, useLocalStorage);
      updateQueryState(newState);
    },
    [useLocalStorage]
  );

  return { queryState, setQueryState } as UseQueryStateResult<S>;
}
