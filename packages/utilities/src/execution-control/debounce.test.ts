import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  test('should debounce the function call', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(50);

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(50);

    expect(mockFn).toBeCalledTimes(1);
  });

  test('should debounce the function call with arguments', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('arg1', 'arg2');
    debouncedFn('arg3', 'arg4');

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(100);

    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toBeCalledWith('arg3', 'arg4');
  });

  test('should debounce the function call with different delay', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn();
    debouncedFn();

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(100);

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(100);

    expect(mockFn).toBeCalledTimes(1);
  });
});
