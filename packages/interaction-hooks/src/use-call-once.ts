import { useEffect, useRef } from 'react';

export type UseCallOnceFunc<A extends unknown[], R = unknown> = (...args: A) => R;

/**
 * React hook that calls a function once and only once.
 */
export function useCallOnce<A extends unknown[], R = unknown>(func: UseCallOnceFunc<A, R>, ...args: A) {
  const calledRef = useRef(false);

  useEffect(() => {
    if (!calledRef.current) {
      calledRef.current = true;
      func(...args);
    }
  }, [func, args]);
}
