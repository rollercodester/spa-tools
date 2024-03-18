import { addForwardSlash } from './add-forward-slash';

describe('addForwardSlash', () => {
  it('should add a forward slash at the start of the string', () => {
    const result = addForwardSlash('path', 'start');
    expect(result).toBe('/path');
  });

  it('should add a forward slash at the end of the string', () => {
    const result = addForwardSlash('path', 'end');
    expect(result).toBe('path/');
  });

  it('should add a forward slash at both the start and end of the string', () => {
    const result = addForwardSlash('path', 'both');
    expect(result).toBe('/path/');
  });

  it('should not add a forward slash if it already exists at the start of the string', () => {
    const result = addForwardSlash('/path', 'start');
    expect(result).toBe('/path');
  });

  it('should not add a forward slash if it already exists at the end of the string', () => {
    const result = addForwardSlash('path/', 'end');
    expect(result).toBe('path/');
  });

  it('should not add a forward slash if it already exists at both the start and end of the string', () => {
    const result = addForwardSlash('/path/', 'both');
    expect(result).toBe('/path/');
  });

  it('should return the input string if placement is neither "start", "end", nor "both"', () => {
    const result = addForwardSlash('path', 'invalid' as unknown as 'start' | 'end' | 'both');
    expect(result).toBe('path');
  });
});
