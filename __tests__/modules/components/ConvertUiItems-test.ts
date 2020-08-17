import {filterItems} from '../../../modules/components/ConvertUiItems';

describe('filters items', () => {
  test('filters items based on cals', () => assertContains('cals', ['Row', 'Ski', 'Air Bike', 'Bike']));

  test('filters items based on meter', () =>
    assertContains('meter', ['Row', 'Ski', 'Air Bike', 'Bike', 'Run', 'Distance']));

  test('filters items based on lbs', () => assertContains('lbs', ['Weight']));

  test('filters items based on kg', () => assertContains('kg', ['Weight']));
});

const assertContains = (unit: string, expected: Array<string>): void => {
  const items: Array<string> = filterItems(unit).map((i) => i.title);

  expect(items).toEqual(expect.arrayContaining(expected));
};
