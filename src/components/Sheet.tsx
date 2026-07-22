import {useEffect, useId, useRef, type ReactNode} from 'react';
import {createPortal} from 'react-dom';

interface SheetProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const focusableSelector = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function Sheet({title, children, onClose}: SheetProps) {
  const titleId = useId();
  const sheetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const appShell = document.querySelector<HTMLElement>('.app-shell');
    const previousAriaHidden = appShell?.getAttribute('aria-hidden') ?? null;
    const previousBodyOverflow = document.body.style.overflow;

    appShell?.setAttribute('inert', '');
    appShell?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'hidden';

    const sheet = sheetRef.current;
    const initialFocus =
      sheet?.querySelector<HTMLElement>('.sheet-body button:not([disabled]), .sheet-body input:not([disabled])') ??
      sheet?.querySelector<HTMLElement>(focusableSelector) ??
      sheet;
    initialFocus?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !sheet) {
        return;
      }
      const focusable = [...sheet.querySelectorAll<HTMLElement>(focusableSelector)];
      if (focusable.length === 0) {
        event.preventDefault();
        sheet.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !sheet.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      appShell?.removeAttribute('inert');
      if (previousAriaHidden === null) {
        appShell?.removeAttribute('aria-hidden');
      } else {
        appShell?.setAttribute('aria-hidden', previousAriaHidden);
      }
      opener?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div className="sheet-layer">
      <button className="sheet-backdrop" type="button" onClick={onClose} aria-label={`Close ${title}`} tabIndex={-1} />
      <section ref={sheetRef} className="sheet" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
        <div className="sheet-handle" />
        <div className="sheet-heading">
          <h2 id={titleId}>{title}</h2>
          <button className="text-button" type="button" onClick={onClose}>
            Done
          </button>
        </div>
        <div className="sheet-body">{children}</div>
      </section>
    </div>,
    document.body,
  );
}
