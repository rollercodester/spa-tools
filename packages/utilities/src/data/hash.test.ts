import { hash } from './hash';

describe('hash', () => {
  it('should return the hash value for a string', async () => {
    const value = 'Hello, World!';
    const expectedHash = 'cc82ebbcf8b60a5821d1c51c72cd79380ecea47de343ccb3b158938a2b3bf764';
    const result = await hash(value);
    expect(result).toEqual(expectedHash);
  });

  it('should return the hash value for a number', async () => {
    const value = 12345;
    const expectedHash = '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5';
    const result = await hash(value);
    expect(result).toEqual(expectedHash);
  });

  it('should return the hash value for an array', async () => {
    const value = [1, 'two', { three: 3 }];
    const expectedHash = '5638683081b5aceda62f960bcb919a2c773077b6fdcb2e434beba64c36d0f8d9';
    const result = await hash(value);
    expect(result).toEqual(expectedHash);
  });

  it('should return the hash value for an object', async () => {
    const value = { baz: 123, foo: 'bar' };
    const expectedHash = 'fdf216617c29ad5894de2528e51f783392a864c38ab4d0411a0ac59435621afd';
    const result = await hash(value);
    expect(result).toEqual(expectedHash);
  });

  it('should return the same hash value for equivalent objects with different key order', async () => {
    const value1 = { baz: 123, foo: 'bar' };
    const value2 = { baz: 123, foo: 'bar' };
    const hashValue1 = await hash(value1);
    const hashValue2 = await hash(value2);
    expect(hashValue1).toEqual(hashValue2);
  });

  it('should return different hash value for equivalent arrays with different element order', async () => {
    const value1 = [1, 2, 3];
    const value2 = [3, 2, 1];
    const hashValue1 = await hash(value1);
    const hashValue2 = await hash(value2);
    expect(hashValue1).not.toEqual(hashValue2);
  });

  it('should return the same hash value for equivalent nested objects with different key order', async () => {
    const value1 = { baz: { qux: 'quux' }, foo: { bar: 'baz' } };
    const value2 = { baz: { qux: 'quux' }, foo: { bar: 'baz' } };
    const hashValue1 = await hash(value1);
    const hashValue2 = await hash(value2);
    expect(hashValue1).toEqual(hashValue2);
  });

  it('should return the different hash value for similar objects', async () => {
    const value1 = { baz: 123, foo: 'bar' };
    const value2 = { baz: 123, foo: 'bas' };
    const hashValue1 = await hash(value1);
    const hashValue2 = await hash(value2);
    expect(hashValue1).not.toEqual(hashValue2);
  });
});
