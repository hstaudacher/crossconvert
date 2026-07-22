import {act, render} from '@testing-library/react';
import {useVisualViewport} from './useVisualViewport';

class VisualViewportMock extends EventTarget {
  height = 844;
  offsetTop = 0;
}

function Harness() {
  useVisualViewport();
  return <input aria-label="Test input" />;
}

describe('useVisualViewport', () => {
  test('tracks the visible viewport as the software keyboard changes it', () => {
    const viewport = new VisualViewportMock();
    Object.defineProperty(window, 'visualViewport', {
      configurable: true,
      value: viewport,
    });
    const {getByLabelText, unmount} = render(<Harness />);

    expect(document.documentElement.style.getPropertyValue('--visual-viewport-height')).toBe('844px');
    expect(document.documentElement.style.getPropertyValue('--visual-viewport-top')).toBe('0px');
    expect(document.documentElement).not.toHaveAttribute('data-keyboard-open');

    act(() => getByLabelText('Test input').focus());
    viewport.height = 472;
    viewport.offsetTop = 18;
    act(() => viewport.dispatchEvent(new Event('resize')));

    expect(document.documentElement.style.getPropertyValue('--visual-viewport-height')).toBe('472px');
    expect(document.documentElement.style.getPropertyValue('--visual-viewport-top')).toBe('18px');
    expect(document.documentElement).toHaveAttribute('data-keyboard-open');

    act(() => getByLabelText('Test input').blur());
    expect(document.documentElement).toHaveAttribute('data-keyboard-open');

    viewport.height = 844;
    viewport.offsetTop = 0;
    act(() => viewport.dispatchEvent(new Event('resize')));
    expect(document.documentElement).not.toHaveAttribute('data-keyboard-open');

    unmount();
    expect(document.documentElement.style.getPropertyValue('--visual-viewport-height')).toBe('');
    expect(document.documentElement.style.getPropertyValue('--visual-viewport-top')).toBe('');
  });
});
