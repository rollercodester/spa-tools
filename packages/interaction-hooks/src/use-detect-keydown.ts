import { KeyboardEvent, KeyboardEventHandler, ModifierKey, RefObject, useEffect, useState } from 'react';

export type DetectKeyDownTuple = [KeyboardEventHandler, boolean];

/**
 * React hook that detects when a given key (and optionally when an array of modifier keys) are pressed down.
 *
 * Defaults to detecting the Enter key without any modifiers.
 *
 * An optional ref to any element supporting the click event can be passed to auto-click when proper key(s) detected.
 */
export function useDetectKeyDown(key?: string): DetectKeyDownTuple;
export function useDetectKeyDown(key: string, elementToAutoClickRef: RefObject<HTMLElement>): DetectKeyDownTuple;
export function useDetectKeyDown(key: string, modifierKeys: ModifierKey[]): DetectKeyDownTuple;
export function useDetectKeyDown(
  key?: string,
  modifierKeys?: ModifierKey[],
  elementToAutoClickRef?: RefObject<HTMLElement>
): DetectKeyDownTuple;
export function useDetectKeyDown(
  key = 'Enter',
  modifierKeysOrElemRef?: ModifierKey[] | RefObject<HTMLElement>,
  elementToAutoClickRef?: RefObject<HTMLElement>
): DetectKeyDownTuple {
  const [keyDownDetected, setKeyDownDetected] = useState(false);

  useEffect(() => {}, [elementToAutoClickRef, modifierKeysOrElemRef]);

  const onKeyDown = (evt: KeyboardEvent) => {
    const keyDownDetected = evt.key === key;
    let normKeyDownDetected = false;

    if (keyDownDetected) {
      let modifierKeys: ModifierKey[] = [];
      let elemToAutoClickRef: RefObject<HTMLElement> | undefined;

      if (Array.isArray(modifierKeysOrElemRef)) {
        modifierKeys = modifierKeysOrElemRef;
        elemToAutoClickRef = elementToAutoClickRef;
      } else if (modifierKeysOrElemRef) {
        elemToAutoClickRef = modifierKeysOrElemRef;
      } else if (elementToAutoClickRef) {
        elemToAutoClickRef = elementToAutoClickRef;
      }

      let allModifierKeysPressed = true;

      if (modifierKeys && modifierKeys.length) {
        allModifierKeysPressed = modifierKeys.every((modifierKey) => evt.getModifierState(modifierKey));
      }

      normKeyDownDetected = evt.key === key && allModifierKeysPressed;

      if (normKeyDownDetected && elemToAutoClickRef?.current) {
        elemToAutoClickRef.current.click();
      }
    }

    setKeyDownDetected(normKeyDownDetected);
  };

  return [onKeyDown, keyDownDetected] satisfies DetectKeyDownTuple;
}
