/**
 * Scroll to the bottom of an element
 */
export function scrollToBottom(el: HTMLElement) {
  el.scrollTop = el.scrollHeight - el.offsetHeight;
}
