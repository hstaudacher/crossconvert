import {filterFromItems} from '../../../modules/components/ConvertUiItems';

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

const assertFromContains = (unit: string, expected: Array<string>): void => {
  const items: Array<string> = filterFromItems(unit).map((i) => i.title);

  expect(items).toEqual(expect.arrayContaining(expected));
};
