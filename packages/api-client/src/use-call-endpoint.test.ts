import { act, renderHook } from '@testing-library/react';
import * as callEndpointMod from './call-endpoint';
import { EndpointOptions } from './types';
import { INVALID_METHOD_FOR_APPEND_DATA, NON_ARRAY_APPEND_DATA, useCallEndpoint } from './use-call-endpoint';

describe('useCallEndpoint', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should update result and pending flag when execute is called and clear result and call clear callback when clear is called', async () => {
    const expectedResult = {
      data: 'example data',
    };

    vi.spyOn(callEndpointMod, 'callEndpoint').mockImplementationOnce(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return expectedResult;
    });

    const { result } = renderHook(() => useCallEndpoint<string>('https://api/test'));

    expect(result.current[1]).toBeUndefined();
    expect(result.current[2]).toBe(false);

    act(() => {
      result.current[0]({
        recordSkip: 10,
      });
    });

    expect(result.current[2]).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[1]).toEqual(expectedResult);
    expect(result.current[2]).toBe(false);

    await act(async () => {
      result.current[3]();
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[1]).toBeUndefined();
  });

  it('should update result and pending flag when execute throws', async () => {
    const error = 'example error';
    const expectedResult = {
      error,
    };

    vi.spyOn(callEndpointMod, 'callEndpoint').mockImplementationOnce(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      throw new Error(error);
    });

    const { result } = renderHook(() => useCallEndpoint<void, string>('https://api/test'));

    expect(result.current[1]).toBeUndefined();
    expect(result.current[2]).toBe(false);

    act(() => {
      result.current[0]({
        signal: new AbortController().signal,
      });
    });

    expect(result.current[2]).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[1]).toEqual(expectedResult);
    expect(result.current[2]).toBe(false);
  });

  it('should handle api error', async () => {
    const expectedResult = {
      error: 'example error',
    };

    vi.spyOn(callEndpointMod, 'callEndpoint').mockResolvedValue(expectedResult);

    const { result } = renderHook(() => useCallEndpoint<void, string>('https://api/test'));

    expect(result.current[1]).toBeUndefined();
    expect(result.current[2]).toBe(false);

    act(() => {
      result.current[0]();
    });

    expect(result.current[2]).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[1]).toEqual(expectedResult);
    expect(result.current[2]).toBe(false);
  });

  it('should append result data when the appendData flag is set', async () => {
    vi.spyOn(callEndpointMod, 'callEndpoint')
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce({
        data: ['first result'],
        nextPageToken: '2',
        total: 20,
      })
      .mockResolvedValueOnce({
        data: ['second result A', 'second result B'],
        nextPageToken: '3',
        total: 20,
      })
      .mockResolvedValueOnce({
        data: ['third result'],
      });

    const { result } = renderHook(() => useCallEndpoint<string>('https://api/test', true));

    expect(result.current[1]).toBeUndefined();

    act(() => {
      result.current[0]();
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[1]).toEqual({});

    act(() => {
      result.current[0]();
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[1]).toEqual({
      data: ['first result'],
      nextPageToken: '2',
      total: 20,
    });

    act(() => {
      result.current[0]();
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[1]).toEqual({
      data: ['first result', 'second result A', 'second result B'],
      nextPageToken: '3',
      total: 20,
    });

    act(() => {
      result.current[0]();
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[1]).toEqual({ data: ['first result', 'second result A', 'second result B', 'third result'] });

    act(() => {
      result.current[0]();
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    // should not append data because there's no more pages to fetch
    expect(result.current[1]).toEqual({ data: ['first result', 'second result A', 'second result B', 'third result'] });
  });

  it('should handle errors when the appendData flag is set', async () => {
    const options = { requestOptions: { url: 'https://api/test' } };
    vi.spyOn(callEndpointMod, 'callEndpoint')
      .mockResolvedValueOnce({
        error: 'first error',
      })
      .mockResolvedValueOnce({
        data: ['first result'],
        nextPageToken: '2',
      })
      .mockResolvedValueOnce({
        error: 'second error',
      })
      .mockResolvedValueOnce({
        data: ['second result'],
        nextPageToken: '3',
      })
      .mockRejectedValueOnce(new Error('third error'));

    const { result } = renderHook(() => useCallEndpoint<string>(options, true));

    expect(result.current[1]).toBeUndefined();

    act(() => {
      result.current[0]();
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[1]).toEqual({
      error: 'first error',
    });

    act(() => {
      result.current[0]();
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[1]).toEqual({
      data: ['first result'],
      nextPageToken: '2',
    });

    act(() => {
      result.current[0]();
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[1]).toEqual({
      data: ['first result'],
      error: 'second error',
      nextPageToken: '2',
    });

    act(() => {
      result.current[0]();
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[1]).toEqual({
      data: ['first result', 'second result'],
      nextPageToken: '3',
    });

    act(() => {
      result.current[0]();
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[1]).toEqual({
      data: ['first result', 'second result'],
      error: 'third error',
      nextPageToken: '3',
    });
  });

  it('should throw an error when the appendData flag is set and the request method is explicitly set to something other than GET', async () => {
    const options = { requestOptions: { method: 'POST', url: 'https://api/test' } } as EndpointOptions;
    const { result } = renderHook(() => useCallEndpoint<string>(options, true));

    expect(result.current[1]).toBeUndefined();

    act(() => {
      result.current[0]();
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[1]).toEqual({
      error: INVALID_METHOD_FOR_APPEND_DATA,
    });
  });

  it('should console error when append result returns non-array data', async () => {
    vi.spyOn(callEndpointMod, 'callEndpoint').mockResolvedValueOnce({
      data: 'invalid result',
    });

    const { result } = renderHook(() => useCallEndpoint<string>('https://api/test', true));

    expect(result.current[1]).toBeUndefined();

    act(() => {
      result.current[0]();
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[1]).toEqual({
      error: NON_ARRAY_APPEND_DATA,
    });
  });
});
