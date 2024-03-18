import { scrollToBottom } from './scroll-to-bottom';

describe('scrollToBottom', () => {
  it('should scroll to the bottom of the element', () => {
    // Create a mock element with a non-zero scrollTop value
    const el = document.createElement('div');
    el.scrollTop = 0;

    // Set the scrollHeight and offsetHeight values
    Object.defineProperty(el, 'scrollHeight', { value: 1000, writable: true });
    Object.defineProperty(el, 'offsetHeight', { value: 500, writable: true });

    // Call the scrollToBottom function
    scrollToBottom(el);

    // Assert that the scrollTop value is now (scrollHeight - offsetHeight)
    expect(el.scrollTop).toBe(500);
  });
});
