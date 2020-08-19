import {filterFromItems, filterToItems} from '../../../modules/components/ConvertUiItems';

describe('filters from items', () => {
  test('filters items based on cal', () => assertFromContains('cal', ['Row', 'Ski', 'Air Bike', 'Bike']));

  test('filters items based on m', () =>
    assertFromContains('m', ['Row', 'Ski', 'Air Bike', 'Bike', 'Run', 'Distance']));

  test('filters items based on mi', () =>
    assertFromContains('mi', ['Row', 'Ski', 'Air Bike', 'Bike', 'Run', 'Distance']));

  test('filters items based on ft', () => assertFromContains('ft', ['Distance']));

  test('filters items based on lbs', () => assertFromContains('lbs', ['Weight']));

  test('filters items based on kg', () => assertFromContains('kg', ['Weight']));
});

describe('filters to items', () => {
  test('filters items based on cal', () => assertToContains('cal', ['Row', 'Ski', 'Air Bike', 'Bike', 'Run']));

  test('filters items based on m', () => assertToContains('m', ['Row', 'Ski', 'Air Bike', 'Bike', 'Run']));

  test('filters items based on lbs', () => assertToContains('lbs', []));

  test('filters items based on kg', () => assertToContains('kg', []));
});

const assertFromContains = (unit: string, expected: Array<string>): void => {
  const items: Array<string> = filterFromItems(unit).map((i) => i.title);

  expect(items).toEqual(expect.arrayContaining(expected));
};

const assertToContains = (unit: string, expected: Array<string>): void => {
  const items: Array<string> = filterToItems(unit).map((i) => i.title);

  expect(items).toEqual(expect.arrayContaining(expected));
};
