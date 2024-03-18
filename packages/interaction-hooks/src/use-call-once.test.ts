import { renderHook } from '@testing-library/react';
import { useCallOnce } from './use-call-once';

describe('useCallOnce', () => {
  it('should call the function once and only once', () => {
    const func = vi.fn();
    const options = { foo: 'bar' };

    renderHook(() => useCallOnce(func, options));

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith(options);
  });

  it('should not call the function if already called', () => {
    const func = vi.fn();
    const options = { foo: 'bar' };

    const { rerender } = renderHook(() => useCallOnce(func, options));

    rerender();

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith(options);
  });
});
