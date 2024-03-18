import { tern } from './tern';

describe('tern', () => {
  it('should return whenTrue if value is true', () => {
    const result = tern(true, 'Value is true', 'Value is false');
    expect(result).toEqual('Value is true');
  });

  it('should return whenFalse if value is false', () => {
    const result = tern(false, 'Value is true', 'Value is false');
    expect(result).toEqual('Value is false');
  });

  it('should return whenUndefinedOrNull if value is undefined', () => {
    const result = tern(undefined, 'Value is true', 'Value is false', 'Value is undefined');
    expect(result).toEqual('Value is undefined');
  });

  it('should return whenUndefinedOrNull if value is null', () => {
    const result = tern(null, 'Value is true', 'Value is false', 'Value is null');
    expect(result).toEqual('Value is null');
  });
});
