import { act, renderHook } from '@testing-library/react';
import { useIsHovered } from './use-is-hovered';

describe('useIsHovered', () => {
  test('should return false initially', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useIsHovered(ref));

    expect(result.current).toBe(false);
  });

  test('should return true when mouse enters the element', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useIsHovered(ref));

    act(() => {
      ref.current.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current).toBe(true);
  });

  test('should return false when mouse leaves the element', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useIsHovered(ref));

    act(() => {
      ref.current.dispatchEvent(new MouseEvent('mouseenter'));
    });

    expect(result.current).toBe(true);

    act(() => {
      ref.current.dispatchEvent(new MouseEvent('mouseleave'));
    });

    expect(result.current).toBe(false);
  });

  test('should not throw error when element is null', () => {
    const ref = { current: null };

    renderHook(() => useIsHovered(ref));
  });
});
