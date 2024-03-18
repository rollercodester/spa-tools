/* Credit to react-intersection-observer for this mock per https://github.com/thebuilder/react-intersection-observer/blob/d35365990136bfbc99ce112270e5ff232cf45f7f/src/test-helper.ts */

class IntersectionObserverMock implements IntersectionObserver {
  private readonly observerMap = new Map<Element, IntersectionObserverEntry>();
  private readonly instanceMap = new Map<Element, IntersectionObserver>();
  public readonly thresholds: number[];

  private callback: IntersectionObserverCallback;
  private options: IntersectionObserverInit;

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.callback = callback;
    this.options = options || {};
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [0];
  }

  get instance() {
    return this as unknown as IntersectionObserver;
  }

  get root() {
    return this.options.root || null;
  }

  get rootMargin() {
    return this.options.rootMargin || "";
  }

  createIntersectionObserverEntry(target: Element) {
    const boundingClientRect = target.getBoundingClientRect();
    const intersectionRatio =
      boundingClientRect.width * boundingClientRect.height;
    return {
      boundingClientRect,
      intersectionRatio,
      intersectionRect: boundingClientRect,
      isIntersecting: intersectionRatio > 0,
      rootBounds: null,
      target,
      time: Date.now(),
    };
  }

  disconnect(): void {
    this.instanceMap.clear();
    this.observerMap.clear();
  }

  observe(target: Element) {
    const entry = this.createIntersectionObserverEntry(target);
    this.observerMap.set(target, entry);
    this.callback([entry], this.instance);
  }

  takeRecords(): IntersectionObserverEntry[] {
    const entries = Array.from(this.observerMap.values());
    this.observerMap.clear();
    return entries;
  }

  unobserve(target: Element): void {
    this.instanceMap.delete(target);
    this.observerMap.delete(target);
  }
}

export function mockIntersectionObserver() {
  Object.defineProperty(globalThis, "IntersectionObserver", {
    value: IntersectionObserverMock,
    writable: true,
  });
}
