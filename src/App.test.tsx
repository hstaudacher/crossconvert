import {fireEvent, render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('CrossConvert app', () => {
  test('uses a fitness conversion icon in the primary navigation', () => {
    render(<App />);

    expect(screen.getByRole('button', {name: 'Convert'}).querySelector('.conversion-nav-icon')).toBeInTheDocument();
  });

  test('converts calories and changes the source movement', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByLabelText('Value to convert');
    expect(input).toHaveValue('');
    await user.type(input, '20');

    const runResult = screen.getByRole('heading', {name: 'Run'}).closest('article');
    expect(runResult).not.toBeNull();
    expect(within(runResult!).getByText(/200/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'Convert from Row'}));
    await user.click(screen.getByRole('button', {name: /Echo Bike/}));
    expect(screen.getByRole('button', {name: 'Convert from Echo Bike'})).toBeInTheDocument();
  });

  test('dismisses the value input when tapping outside it', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByLabelText('Value to convert');

    await user.click(input);
    expect(input).toHaveFocus();
    await user.click(screen.getByRole('heading', {name: 'Run'}));
    expect(input).not.toHaveFocus();
  });

  test('updates and persists equipment settings', async () => {
    const user = userEvent.setup();
    const {unmount} = render(<App />);

    await user.click(screen.getByRole('button', {name: /Equipment/}));
    await user.click(screen.getByRole('button', {name: /Bar Weight/}));
    await user.click(screen.getByRole('button', {name: '15kg/33lb'}));
    expect(screen.getByRole('button', {name: /Bar Weight/})).toHaveTextContent('15kg/33lb');

    unmount();
    render(<App />);
    await user.click(screen.getByRole('button', {name: /Equipment/}));
    expect(screen.getByRole('button', {name: /Bar Weight/})).toHaveTextContent('15kg/33lb');
  });

  test('opens and edits weight percentages', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', {name: /cal/}));
    await user.click(screen.getByRole('button', {name: /kgKilogram/}));
    expect(screen.getByRole('button', {name: 'Convert from Weight'})).toBeDisabled();
    const input = screen.getByLabelText('Value to convert');
    await user.clear(input);
    await user.type(input, '100');
    await user.click(screen.getByRole('button', {name: /% of 100kg/}));
    expect(screen.getByRole('heading', {name: '100kg'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Clear percentages'}).querySelector('svg')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Percentage to add'), '75');
    await user.click(screen.getByRole('button', {name: 'Add percentage'}));
    expect(screen.getByText('75%')).toBeInTheDocument();

    const percentageRow = screen.getByText('75%').closest('.swipe-row-front');
    expect(percentageRow).not.toBeNull();
    fireEvent.pointerDown(percentageRow!, {pointerId: 1, pointerType: 'touch', clientX: 250, clientY: 300});
    fireEvent.pointerMove(percentageRow!, {pointerId: 1, pointerType: 'touch', clientX: 160, clientY: 300});
    fireEvent.pointerUp(percentageRow!, {pointerId: 1, pointerType: 'touch', clientX: 160, clientY: 300});
    expect(percentageRow).toHaveStyle({transform: 'translateX(-76px)'});
    await user.click(screen.getByRole('button', {name: 'Delete 75 percent'}));
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });
});
