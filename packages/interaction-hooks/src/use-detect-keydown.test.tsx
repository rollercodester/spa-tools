import { ModifierKey, useRef } from 'react';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useDetectKeyDown } from './use-detect-keydown';

function TestUseKeyDown1({ keyToDetect, modifiers }: { keyToDetect?: string; modifiers?: ModifierKey[] }) {
  const autoClickElem = useRef<HTMLButtonElement>(null);
  const [onKeyDown, isKeyDown] = useDetectKeyDown(keyToDetect, modifiers, autoClickElem);

  return (
    <div>
      <div data-testid='keyDownTarget' onKeyDown={onKeyDown}>
        Key Down Test
      </div>
      <div data-testid='isKeyDownResult'>{isKeyDown ? 'true' : 'false'}</div>
      <button data-testid='autoClickButton' ref={autoClickElem}>
        Auto-click
      </button>
    </div>
  );
}

function TestUseKeyDown2({ keyToDetect }: { keyToDetect: string }) {
  const autoClickElem = useRef<HTMLButtonElement>(null);
  const [onKeyDown, isKeyDown] = useDetectKeyDown(keyToDetect, autoClickElem);

  return (
    <div>
      <div data-testid='keyDownTarget' onKeyDown={onKeyDown}>
        Key Down Test
      </div>
      <div data-testid='isKeyDownResult'>{isKeyDown ? 'true' : 'false'}</div>
      <button data-testid='autoClickButton' ref={autoClickElem}>
        Auto-click
      </button>
    </div>
  );
}

function TestUseKeyDown3({ keyToDetect }: { keyToDetect: string }) {
  const autoClickElem = useRef<HTMLButtonElement>(null);
  const [onKeyDown, isKeyDown] = useDetectKeyDown(keyToDetect, undefined, autoClickElem);

  return (
    <div>
      <div data-testid='keyDownTarget' onKeyDown={onKeyDown}>
        Key Down Test
      </div>
      <div data-testid='isKeyDownResult'>{isKeyDown ? 'true' : 'false'}</div>
      <button data-testid='autoClickButton' ref={autoClickElem}>
        Auto-click
      </button>
    </div>
  );
}

describe('useKeyDown', () => {
  test('should detect when the default key is pressed down', () => {
    render(<TestUseKeyDown1 />);

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('false');

    const keyDownTarget = screen.getByTestId('keyDownTarget');

    act(() => {
      fireEvent.keyDown(keyDownTarget, { key: 'Enter' });
    });

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('true');
  });

  test('should detect when the specified key is pressed down', () => {
    render(<TestUseKeyDown1 keyToDetect='Escape' />);

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('false');

    const keyDownTarget = screen.getByTestId('keyDownTarget');

    act(() => {
      fireEvent.keyDown(keyDownTarget, { key: 'Escape' });
    });

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('true');
  });

  test('should detect when modifier keys are pressed down', () => {
    render(<TestUseKeyDown1 keyToDetect='KeyR' modifiers={['Shift', 'Alt']} />);

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('false');

    const keyDownTarget = screen.getByTestId('keyDownTarget');

    act(() => {
      fireEvent.keyDown(keyDownTarget, { altKey: true, key: 'KeyR', shiftKey: true });
    });

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('true');
  });

  test('should not detect when the wrong key is pressed down', () => {
    render(<TestUseKeyDown1 keyToDetect='Enter' />);

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('false');

    const keyDownTarget = screen.getByTestId('keyDownTarget');

    act(() => {
      fireEvent.keyDown(keyDownTarget, { key: 'Escape' });
    });

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('false');
  });

  test('should not detect when the wrong modifier keys are pressed down', () => {
    render(<TestUseKeyDown1 keyToDetect='KeyR' modifiers={['Shift', 'Alt']} />);

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('false');

    const keyDownTarget = screen.getByTestId('keyDownTarget');

    act(() => {
      fireEvent.keyDown(keyDownTarget, { key: 'KeyR' });
    });

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('false');
  });

  test('should auto-click element when key, modifiers, and element ref are provided', () => {
    const clickHandler = vi.fn();

    render(<TestUseKeyDown1 keyToDetect='Enter' modifiers={['Shift', 'Alt']} />);

    const keyDownTarget = screen.getByTestId('keyDownTarget');
    const autoClickButton = screen.getByTestId('autoClickButton');

    autoClickButton.onclick = clickHandler;

    act(() => {
      fireEvent.keyDown(keyDownTarget, { altKey: true, key: 'Enter', shiftKey: true });
    });

    expect(clickHandler).toHaveBeenCalled();
  });

  test('should auto-click element when key and element ref are provided', () => {
    const clickHandler = vi.fn();

    render(<TestUseKeyDown2 keyToDetect='Enter' />);

    const keyDownTarget = screen.getByTestId('keyDownTarget');
    const autoClickButton = screen.getByTestId('autoClickButton');

    autoClickButton.onclick = clickHandler;

    act(() => {
      fireEvent.keyDown(keyDownTarget, { key: 'Enter' });
    });

    expect(clickHandler).toHaveBeenCalled();
  });

  test('should auto-click element when key, undefined modifiers, and element ref are provided', () => {
    const clickHandler = vi.fn();

    render(<TestUseKeyDown3 keyToDetect='Enter' />);

    const keyDownTarget = screen.getByTestId('keyDownTarget');
    const autoClickButton = screen.getByTestId('autoClickButton');

    autoClickButton.onclick = clickHandler;

    act(() => {
      fireEvent.keyDown(keyDownTarget, { key: 'Enter' });
    });

    expect(clickHandler).toHaveBeenCalled();
  });
});
