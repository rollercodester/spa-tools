/* v8 ignore start - ignore coverage as all behavior except disabled logic is native */
import { RefObject, useEffect, useState } from 'react';

/**
 * React hook that detects when an element is scrolled to bottom. The primary usage scenario is to enable infinite scroll behavior.
 */
export function useInfiniteScroll<T extends Element>(bottomTriggerElement: RefObject<T>, disabled?: boolean) {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      const newIsScrolling = !disabled && entry.isIntersecting;

      if (newIsScrolling) {
        setTimeout(() => {
          // reset scroll trigger after a brief delay to ensure
          // that consumer does not overreact to scroll state
          setIsScrolling(false);
        }, 100);
      }

      setIsScrolling(newIsScrolling);
    });

    const scrollTarget = bottomTriggerElement.current;

    if (scrollTarget) {
      observer.observe(scrollTarget);
    }

    return () => {
      observer.disconnect();
    };
  }, [bottomTriggerElement, disabled]);

  return isScrolling;
}
