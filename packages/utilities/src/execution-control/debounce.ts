export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): T {
  let timeoutId: NodeJS.Timeout;

  return ((...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      return fn(...args);
    }, delay);
  }) as T;
}
