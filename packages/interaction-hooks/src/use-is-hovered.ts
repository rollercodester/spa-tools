import { RefObject, useEffect, useState } from 'react';

/**
 * React hook that detects when an element or array of elements is hovered.
 */
export function useIsHovered(elem: RefObject<HTMLElement | HTMLElement[]>) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const normElements = Array.isArray(elem.current) ? elem.current : [elem.current];

    normElements.forEach((el) => {
      el?.addEventListener('mouseenter', handleMouseEnter);
      el?.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      normElements.forEach((el) => {
        el?.removeEventListener('mouseenter', handleMouseEnter);
        el?.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [elem]);

  return isHovered;
}
