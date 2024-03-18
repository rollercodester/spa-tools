import { InterpolateUrlOptions, InterpolateUrlResult, interpolateUrl } from './interpolate-url';

describe('interpolateUrl', () => {
  it('should interpolate URL template with provided state', () => {
    const urlTemplate = 'https://spatools/users/:id?page=:page';
    const state = { id: '123', page: 3 };
    const options: InterpolateUrlOptions = {
      addUnusedStateToQueryString: false,
      discardOrphanedQueryStringPlaceholders: true,
      preEncodeQueryStringValuesForKeys: [],
    };

    const result: InterpolateUrlResult = interpolateUrl(urlTemplate, state, options);

    expect(result.url).toBe('https://spatools/users/123?page=3');
    expect(result.unmatchedParamState).toEqual({});
  });

  it('should handle array state when adding unused to querystring params', () => {
    const urlTemplate = 'https://spatools/users/:id?page=:page';
    const state = { id: '123', page: 3, reportIds: [1, 2, 3, 5] };
    const options: InterpolateUrlOptions = {
      addUnusedStateToQueryString: true,
      discardOrphanedQueryStringPlaceholders: true,
      preEncodeQueryStringValuesForKeys: [],
    };

    const result: InterpolateUrlResult = interpolateUrl(urlTemplate, state, options);

    expect(result.url).toBe('https://spatools/users/123?page=3&reportIds=1&reportIds=2&reportIds=3&reportIds=5');
    expect(result.unmatchedParamState).toEqual({});
  });

  it('should interpolate URL template with comma delimited array param with placeholder', () => {
    const urlTemplate = 'https://spatools/users/:id?page=:page&sort=true,:page';
    const state = { id: '123', page: 3 };
    const options: InterpolateUrlOptions = {
      addUnusedStateToQueryString: false,
      discardOrphanedQueryStringPlaceholders: true,
      preEncodeQueryStringValuesForKeys: [],
    };

    const result: InterpolateUrlResult = interpolateUrl(urlTemplate, state, options);

    expect(result.url).toBe('https://spatools/users/123?page=3&sort=true,3');
    expect(result.unmatchedParamState).toEqual({});
  });

  it('should return unmatched param state', () => {
    const urlTemplate = 'https://spatools/users';
    const state = { id: '123' };
    const result: InterpolateUrlResult = interpolateUrl(urlTemplate, state);

    expect(result.url).toBe('https://spatools/users');
    expect(result.unmatchedParamState).toEqual({ id: '123' });
  });

  it('should add unused state to querystring when option is set', () => {
    const urlTemplate = 'https://spatools/users';
    const state = { id: '123', page: 3 };
    const options: InterpolateUrlOptions = {
      addUnusedStateToQueryString: true,
      discardOrphanedQueryStringPlaceholders: true,
      preEncodeQueryStringValuesForKeys: [],
    };

    const result: InterpolateUrlResult = interpolateUrl(urlTemplate, state, options);

    expect(result.url).toBe('https://spatools/users?id=123&page=3');
    expect(result.unmatchedParamState).toEqual({});
  });

  it('should discard orphaned querystring placeholders when option is set', () => {
    const urlTemplate = 'https://spatools/users?page=:page&sort=true';
    const options: InterpolateUrlOptions = {
      addUnusedStateToQueryString: false,
      discardOrphanedQueryStringPlaceholders: true,
      preEncodeQueryStringValuesForKeys: [],
    };

    const result: InterpolateUrlResult = interpolateUrl(urlTemplate, {}, options);

    expect(result.url).toBe('https://spatools/users?sort=true');
    expect(result.unmatchedParamState).toEqual({});
  });

  it('should pre-encode querystring values when keys are provided', () => {
    const urlTemplate = 'https://spatools/users?path=:path';
    const state = { path: '~/myHome/path1/path2' };
    const options: InterpolateUrlOptions = {
      addUnusedStateToQueryString: false,
      discardOrphanedQueryStringPlaceholders: true,
      preEncodeQueryStringValuesForKeys: ['path'],
    };

    const result: InterpolateUrlResult = interpolateUrl(urlTemplate, state, options);

    expect(result.url).toBe('https://spatools/users?path=~%2FmyHome%2Fpath1%2Fpath2');
    expect(result.unmatchedParamState).toEqual({});
  });

  it('should NOT pre-encode querystring values when option is NOT set', () => {
    const urlTemplate = 'https://spatools/users?path=:path';
    const state = { path: '~/myHome/path1/path2' };
    const options: InterpolateUrlOptions = {
      addUnusedStateToQueryString: false,
      discardOrphanedQueryStringPlaceholders: true,
      preEncodeQueryStringValuesForKeys: [],
    };

    const result: InterpolateUrlResult = interpolateUrl(urlTemplate, state, options);

    expect(result.url).toBe('https://spatools/users?path=~/myHome/path1/path2');
    expect(result.unmatchedParamState).toEqual({});
  });

  it('should ignore empty querystring template placeholder values', () => {
    const urlTemplate = 'https://spatools/users/:id?page=:';
    const state = { id: '123', page: 3 };
    const options: InterpolateUrlOptions = {
      addUnusedStateToQueryString: false,
      discardOrphanedQueryStringPlaceholders: false,
      preEncodeQueryStringValuesForKeys: [],
    };

    const result: InterpolateUrlResult = interpolateUrl(urlTemplate, state, options);

    expect(result.url).toBe('https://spatools/users/123?page=');
    expect(result.unmatchedParamState).toEqual({ page: 3 });
  });

  it('should throw an error if passed in state is not a record (plain object)', () => {
    const urlTemplate = 'https://spatools/users/:id?page=:';
    const state = [{ id: '123', page: 3 }] as unknown as Record<string, unknown>;
    const options: InterpolateUrlOptions = {
      addUnusedStateToQueryString: false,
      discardOrphanedQueryStringPlaceholders: false,
      preEncodeQueryStringValuesForKeys: [],
    };

    expect(() => interpolateUrl(urlTemplate, state, options)).toThrowError();
  });
});
