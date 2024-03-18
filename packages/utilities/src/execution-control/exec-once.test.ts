import { describe, expect, it } from 'vitest';
import { ExecOnce } from './exec-once';

describe('ExecOnce', () => {
  it('should execute async fn only once', async () => {
    let execCount = 0;

    const once = new ExecOnce(() => Promise.resolve(execCount++));

    for (let i = 0; i < 10; i++) {
      const result = await once.exec();

      if (i == 0) {
        expect(result).toBe(0);
      } else {
        expect(result).toBeUndefined();
      }
    }

    expect(execCount).toBe(1);
  });

  it('should handle calling a non-async function', () => {
    let execCount = 0;

    const once = new ExecOnce(() => {
      execCount++;
      return execCount;
    });

    for (let i = 0; i < 10; i++) {
      const result = once.exec();
      if (i == 0) {
        expect(result).toBe(1);
      } else {
        expect(result).toBeUndefined();
      }
    }

    expect(execCount).toBe(1);
  });

  it('should set hasExecuted property', async () => {
    const once = new ExecOnce(() => 1);
    await once.exec();

    expect(once.hasExecuted).toBe(true);
  });
});
