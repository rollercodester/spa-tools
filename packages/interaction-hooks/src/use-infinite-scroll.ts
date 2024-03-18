/* v8 ignore start - ignore coverage as all behavior except disabled logic is native */
import { RefObject, useEffect, useState } from 'react';

/**
 * React hook that detects when an element is scrolled to bottom. The primary usage scenario is to enable infinite scroll behavior.
 */
export function useInfiniteScroll<T extends Element>(
  bottomTriggerElement: RefObject<T>,
  disabled?: boolean,
  bottomThresholdPercentage = 40
) {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsScrolling(!disabled && entry.isIntersecting);
        }
      },
      { rootMargin: `0px 0px ${bottomThresholdPercentage}% 0px` }
    );

    const scrollTarget = bottomTriggerElement.current;

    if (scrollTarget) {
      observer.observe(scrollTarget);
    }

    return () => {
      observer.disconnect();
    };
  }, [bottomThresholdPercentage, bottomTriggerElement, disabled]);

  return isScrolling;
}
