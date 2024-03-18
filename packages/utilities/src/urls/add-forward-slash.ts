/**
 * Adds a forward slash to the start, end, or both sides of a string.
 */
export function addForwardSlash(str: string, placement: 'start' | 'end' | 'both' = 'end') {
  if (placement === 'start') {
    return str.startsWith('/') ? str : `/${str}`;
  }
  if (placement === 'end') {
    return str.endsWith('/') ? str : `${str}/`;
  }
  if (placement === 'both') {
    return str.startsWith('/') && str.endsWith('/') ? str : `/${str}/`;
  }
  return str;
}
