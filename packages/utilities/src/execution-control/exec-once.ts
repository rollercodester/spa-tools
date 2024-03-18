/**
 * Ensure a callback only gets executed once.
 */
export class ExecOnce<T extends (...args: unknown[]) => unknown> {
  private hasBeenExecuted: boolean = false;
  private cb: T;

  constructor(callback: T) {
    this.cb = callback;
  }

  public get hasExecuted() {
    return this.hasBeenExecuted;
  }

  exec(...args: unknown[]) {
    if (this.hasBeenExecuted) {
      return;
    }

    this.hasBeenExecuted = true;

    return this.cb(...args);
  }
}
