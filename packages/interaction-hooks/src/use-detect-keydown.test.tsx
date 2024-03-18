import { ModifierKey, RefObject } from 'react';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useDetectKeyDown } from './use-detect-keydown';

function TestUseKeyDown({
  buttonToClick,
  keyToDetect,
  modifiers,
}: {
  buttonToClick?: React.RefObject<HTMLButtonElement>;
  keyToDetect?: string;
  modifiers?: ModifierKey[];
}) {
  const [onKeyDown, isKeyDown] = useDetectKeyDown(keyToDetect, modifiers, buttonToClick);

  return (
    <div>
      <div data-testid='keyDownTarget' onKeyDown={onKeyDown}>
        Key Down Test
      </div>
      <div data-testid='isKeyDownResult'>{isKeyDown ? 'true' : 'false'}</div>
    </div>
  );
}

describe('useKeyDown', () => {
  test('should detect when the default key is pressed down', () => {
    render(<TestUseKeyDown />);

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('false');

    const keyDownTarget = screen.getByTestId('keyDownTarget');

    act(() => {
      fireEvent.keyDown(keyDownTarget, { key: 'Enter' });
    });

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('true');
  });

  test('should detect when the specified key is pressed down', () => {
    render(<TestUseKeyDown keyToDetect='Escape' />);

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('false');

    const keyDownTarget = screen.getByTestId('keyDownTarget');

    act(() => {
      fireEvent.keyDown(keyDownTarget, { key: 'Escape' });
    });

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('true');
  });

  test('should detect when modifier keys are pressed down', () => {
    render(<TestUseKeyDown keyToDetect='KeyR' modifiers={['Shift', 'Alt']} />);

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('false');

    const keyDownTarget = screen.getByTestId('keyDownTarget');

    act(() => {
      fireEvent.keyDown(keyDownTarget, { altKey: true, key: 'KeyR', shiftKey: true });
    });

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('true');
  });

  test('should not detect when the wrong key is pressed down', () => {
    render(<TestUseKeyDown keyToDetect='Enter' />);

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('false');

    const keyDownTarget = screen.getByTestId('keyDownTarget');

    act(() => {
      fireEvent.keyDown(keyDownTarget, { key: 'Escape' });
    });

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('false');
  });

  test('should not detect when the wrong modifier keys are pressed down', () => {
    render(<TestUseKeyDown keyToDetect='KeyR' modifiers={['Shift', 'Alt']} />);

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('false');

    const keyDownTarget = screen.getByTestId('keyDownTarget');

    act(() => {
      fireEvent.keyDown(keyDownTarget, { key: 'KeyR' });
    });

    expect(screen.getByTestId('isKeyDownResult')).toHaveTextContent('false');
  });

  test('should auto-click element when element ref is provided', () => {
    const clickHandler = vi.fn();
    const ref = { current: { click: clickHandler } } as unknown as RefObject<HTMLButtonElement>;

    render(<TestUseKeyDown buttonToClick={ref} keyToDetect='Enter' modifiers={['Shift', 'Alt']} />);
    const keyDownTarget = screen.getByTestId('keyDownTarget');

    act(() => {
      fireEvent.keyDown(keyDownTarget, { altKey: true, key: 'Enter', shiftKey: true });
    });

    expect(clickHandler).toHaveBeenCalled();
  });
});
