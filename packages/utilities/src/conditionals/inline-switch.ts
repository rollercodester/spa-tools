/**
 * Constructs a type safe implementation of a pseudo switch statement that can be used inline with React JSX.
 */
export function inlineSwitch<K extends string | number | symbol, V>(caseKey: K, caseObject: Record<K, V>) {
  return caseObject[caseKey];
}
