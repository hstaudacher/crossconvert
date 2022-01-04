import {fromOptions} from '../../../../modules/components/options/FromOptions';

describe('filters from options', () => {
  test('filters options based on cal', () =>
    assertFromContains('cal', ['Row', 'Ski', 'Assault Bike', 'Echo Bike', 'Bike']));

  test('filters options based on m', () => assertFromContains('m', ['Row', 'Ski', 'Bike', 'Run', 'Distance']));

  test('filters options based on mi', () => assertFromContains('mi', ['Row', 'Ski', 'Bike', 'Run', 'Distance']));

  test('filters options based on in', () => assertFromContains('in', ['Distance']));

  test('filters options based on ft', () => assertFromContains('ft', ['Distance']));

  test('filters options based on lb', () => assertFromContains('lb', ['Weight']));

  test('filters options based on kg', () => assertFromContains('kg', ['Weight']));

  test('filters options based on reps', () => assertFromContains('rep', ['Burpee', 'Double Under']));
});

const assertFromContains = (unit: string, expected: Array<string>): void => {
  const options: Array<string> = fromOptions(unit).map(i => i.title);

  expect(options).toEqual(expect.arrayContaining(expected));
};
