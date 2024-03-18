import { CoreRoute } from '../core-router';
import { parseRoute } from './parse-route';

describe('parseRoute', () => {
  it('should return a URL object with the correct properties', () => {
    const route: CoreRoute = { path: '/users/:id?page=:page' };
    const state = { id: '123', page: 3 };
    const result = parseRoute(route, state);

    expect(result).toBeInstanceOf(URL);
    expect(result.pathname).toBe('/users/123');
    expect(result.search).toBe('?page=3');
  });

  it('should add unused state to querystring when option is set', () => {
    const route: CoreRoute = { path: 'users' };
    const state = { id: '123', page: 3 };
    const result = parseRoute(route, state, '', { addUnusedStateToQueryString: true });

    expect(result).toBeInstanceOf(URL);
    expect(result.pathname).toBe('/users');
    expect(result.search).toBe('?id=123&page=3');
  });

  it('should discard orphaned querystring placeholders when option is set', () => {
    const route: CoreRoute = { path: '/users?page=:page' };
    const state = { id: '123' };
    const result = parseRoute(route, state, '', { discardOrphanedQueryStringPlaceholders: true });

    expect(result).toBeInstanceOf(URL);
    expect(result.pathname).toBe('/users');
    expect(result.search).toBe('');
  });

  it('should pre-encode querystring values when keys are provided', () => {
    const route: CoreRoute = { path: '/users?path1=:path1&path2=:path2' };
    const state = { path1: '~/myHome/Desktop/test1.txt', path2: '~/myHome/Documents/test2.txt' };
    const result = parseRoute(route, state, '', { preEncodeQueryStringValuesForKeys: ['path1', 'path2'] });

    expect(result).toBeInstanceOf(URL);
    expect(result.pathname).toBe('/users');
    expect(result.search).toBe('?path1=~%2FmyHome%2FDesktop%2Ftest1.txt&path2=~%2FmyHome%2FDocuments%2Ftest2.txt');
  });

  it('should NOT pre-encode querystring values when option is NOT set', () => {
    const route: CoreRoute = { path: '/users?path=:path' };
    const state = { path: '~/myHome/path1/path2' };
    const result = parseRoute(route, state);

    expect(result).toBeInstanceOf(URL);
    expect(result.pathname).toBe('/users');
    expect(result.search).toBe('?path=~/myHome/path1/path2');
  });
});
