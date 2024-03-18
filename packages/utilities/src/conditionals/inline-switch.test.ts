import { inlineSwitch } from './inline-switch';

describe('inlineSwitch', () => {
  it('should return the value corresponding to the provided status', () => {
    const record = {
      status1: 'value1',
      status2: 'value2',
      status3: 'value3',
    };

    const result = inlineSwitch('status2', record);

    expect(result).toBe('value2');
  });

  it('should return undefined if the status does not exist in the record', () => {
    const record = {
      status1: 'value1',
      status2: 'value2',
      status3: 'value3',
      status4: undefined,
    };

    const result = inlineSwitch('status4', record);

    expect(result).toBeUndefined();
  });
});
