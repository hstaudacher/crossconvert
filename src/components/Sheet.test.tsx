import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useState} from 'react';
import {Sheet} from './Sheet';

function SheetHarness() {
  const [open, setOpen] = useState(false);
  return (
    <div className="app-shell">
      <button type="button" onClick={() => setOpen(true)}>
        Open selector
      </button>
      {open && (
        <Sheet title="Choose one" onClose={() => setOpen(false)}>
          <button type="button">First option</button>
          <button type="button">Last option</button>
        </Sheet>
      )}
    </div>
  );
}

describe('Sheet', () => {
  test('moves focus into the sheet, traps it, and restores the opener', async () => {
    const user = userEvent.setup();
    render(<SheetHarness />);
    const opener = screen.getByRole('button', {name: 'Open selector'});

    await user.click(opener);
    expect(screen.getByRole('button', {name: 'First option'})).toHaveFocus();
    expect(document.querySelector('.app-shell')).toHaveAttribute('inert');
    expect(document.querySelector('.app-shell')).toHaveAttribute('aria-hidden', 'true');

    await user.tab({shift: true});
    expect(screen.getByRole('button', {name: 'Done'})).toHaveFocus();
    await user.tab({shift: true});
    expect(screen.getByRole('button', {name: 'Last option'})).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', {name: 'Done'})).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(document.querySelector('.app-shell')).not.toHaveAttribute('inert');
    expect(document.querySelector('.app-shell')).not.toHaveAttribute('aria-hidden');
  });
});
