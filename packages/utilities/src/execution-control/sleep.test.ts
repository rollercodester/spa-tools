import { sleep } from './sleep';

describe('sleep', () => {
  it('should resolve after the specified time', async () => {
    const ms = 1000; // 1 second

    const startTime = Date.now();
    await sleep(ms);
    const endTime = Date.now();

    const elapsedTime = endTime - startTime;
    // 90% of the time should have elapsed (to account for test execution time)
    expect(elapsedTime).toBeGreaterThanOrEqual(ms * 0.9);
  });
});
