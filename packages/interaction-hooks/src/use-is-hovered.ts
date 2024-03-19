import { RefObject, useEffect, useState } from 'react';

/**
 * React hook that detects when an element or array of elements is hovered.
 */
export function useIsHovered(elem: RefObject<HTMLElement> | RefObject<HTMLElement>[]) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const normElementRefs = Array.isArray(elem) ? elem : [elem];

    normElementRefs.forEach((elRef) => {
      elRef.current?.addEventListener('mouseenter', handleMouseEnter);
      elRef.current?.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      normElementRefs.forEach((el) => {
        el.current?.removeEventListener('mouseenter', handleMouseEnter);
        el.current?.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [elem]);

  return isHovered;
}
