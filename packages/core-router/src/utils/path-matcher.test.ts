import { PathMatcher } from './path-matcher';

describe('PathMatcher', () => {
  it('should match a path with a simple template', () => {
    const matcher = new PathMatcher('/users/:id');
    const path = '/users/123';
    const result = matcher.match(path);
    expect(result).toEqual({ id: '123' });
  });

  it('should return null if the path does not match the template', () => {
    const matcher = new PathMatcher('/users/:id');
    const path = '/posts/123';
    const result = matcher.match(path);
    expect(result).toBeNull();
  });

  it('should match a path with multiple parameters', () => {
    const matcher = new PathMatcher('/users/:userId/posts/:postId');
    const path = '/users/123/posts/456';
    const result = matcher.match(path);
    expect(result).toEqual({ postId: '456', userId: '123' });
  });

  it('should match a path with no named placeholder segments', () => {
    const matcher = new PathMatcher('/users');
    const path = '/users';
    const result = matcher.match(path);
    expect(result).toEqual({});
  });

  it('should match a path containing wildcards', () => {
    const matcher = new PathMatcher('/users/*/pets/*/toys/:toyId');
    const path = '/users/123/pets/456/toys/789';
    const result = matcher.match(path);
    expect(result).toEqual({ toyId: '789' });
  });

  it('should return null if the path template is empty', () => {
    const matcher = new PathMatcher('');
    const result = matcher.match('/users/123');
    expect(result).toBeNull();
  });

  it('should return null if the path is empty', () => {
    const matcher = new PathMatcher('/users/:id');
    const result = matcher.match('');
    expect(result).toBeNull();
  });

  it('should return null if the path segment counts do not match', () => {
    const matcher = new PathMatcher('/users/:id');
    const result = matcher.match('/');
    expect(result).toBeNull();
  });

  it('should handle a path template that does not start with /', () => {
    const matcher = new PathMatcher('users/:id');
    const path = '/users/123';
    const result = matcher.match(path);
    expect(result).toEqual({ id: '123' });
  });

  it('should handle a path that does not start with /', () => {
    const matcher = new PathMatcher('/users/:id');
    const path = 'users/123';
    const result = matcher.match(path);
    expect(result).toEqual({ id: '123' });
  });
});
