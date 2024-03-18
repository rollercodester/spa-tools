/* v8 ignore start - ignore coverage as all behavior is native */
import { RefObject, useEffect, useState } from 'react';

/**
 * React hook that detects when an element is vertically overflowed.
 */
export function useIsOverflowed(
  elem: RefObject<HTMLElement>,
  direction: 'horizontally' | 'vertically' = 'vertically',
  triggerOffset = 0
) {
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = (direction === 'vertically' ? elem.current?.scrollTop : elem.current?.scrollLeft) || triggerOffset;
      setIsOverflowed(scroll > triggerOffset);
    };

    const el = elem.current;
    if (!el) {
      return;
    }

    el.addEventListener('scroll', handleScroll);

    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [direction, elem, triggerOffset]);

  return isOverflowed;
}
