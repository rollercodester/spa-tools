import { act, renderHook } from '@testing-library/react';
import { mockWindowHistory, mockWindowLocation, restoreWindowHistory, restoreWindowLocation } from '../../../mocks';
import { useQueryState } from './use-query-state';

describe('useQueryState', () => {
  beforeAll(() => {
    mockWindowHistory();
    mockWindowLocation('https://spatools');
  });
  afterAll(() => {
    restoreWindowHistory();
    restoreWindowLocation();
  });
  beforeEach(() => {
    // Reset the location search before each test
    window.location.search = '';
  });

  test('should initialize query state correctly', () => {
    const { result } = renderHook(() => useQueryState());

    expect(result.current.queryState).toEqual(null);
  });

  test('should update query state correctly', () => {
    const { result } = renderHook(() => useQueryState());

    act(() => {
      result.current.setQueryState({ filter: 'example', page: 1 });
    });

    expect(result.current.queryState).toEqual({ filter: 'example', page: '1' });
  });

  test('should update query state when URL changes', () => {
    window.location.search = '?page=2&filter=example';
    const { result } = renderHook(() => useQueryState());

    expect(result.current.queryState).toEqual({ filter: 'example', page: '2' });
  });
});
