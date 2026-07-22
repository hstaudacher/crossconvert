import {useEffect} from 'react';

export function useVisualViewport() {
  useEffect(() => {
    const root = document.documentElement;
    const viewport = window.visualViewport;
    let expandedHeight = viewport?.height ?? window.innerHeight;
    let keyboardOpen = false;

    const updateViewport = () => {
      const height = viewport?.height ?? window.innerHeight;
      const offsetTop = viewport?.offsetTop ?? 0;
      const inputFocused =
        document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement;

      if (!inputFocused && !keyboardOpen) {
        expandedHeight = height;
      }

      const viewportIsReduced = expandedHeight - height > 120;
      keyboardOpen = viewportIsReduced && (inputFocused || keyboardOpen);

      root.style.setProperty('--visual-viewport-height', `${height}px`);
      root.style.setProperty('--visual-viewport-top', `${offsetTop}px`);
      root.toggleAttribute('data-keyboard-open', keyboardOpen);
    };

    updateViewport();
    viewport?.addEventListener('resize', updateViewport);
    viewport?.addEventListener('scroll', updateViewport);
    window.addEventListener('resize', updateViewport);
    document.addEventListener('focusin', updateViewport);
    document.addEventListener('focusout', updateViewport);

    return () => {
      viewport?.removeEventListener('resize', updateViewport);
      viewport?.removeEventListener('scroll', updateViewport);
      window.removeEventListener('resize', updateViewport);
      document.removeEventListener('focusin', updateViewport);
      document.removeEventListener('focusout', updateViewport);
      root.style.removeProperty('--visual-viewport-height');
      root.style.removeProperty('--visual-viewport-top');
      root.removeAttribute('data-keyboard-open');
    };
  }, []);
}
