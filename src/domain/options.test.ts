import {fromOptions, getConversions, type UnitKey} from './options';

describe('fromOptions', () => {
  test.each([
    ['cal', ['Row', 'Ski', 'AssaultBike', 'Echo Bike', 'Bike']],
    ['m', ['Row', 'Ski', 'Bike', 'Run', 'Distance']],
    ['mi', ['Row', 'Ski', 'Bike', 'Run', 'Distance']],
    ['in', ['Distance']],
    ['ft', ['Distance']],
    ['lb', ['Weight']],
    ['kg', ['Weight']],
    ['rep', ['Burpee', 'Double Under']],
  ] satisfies [UnitKey, string[]][])('filters %s options', (unit, expected) => {
    expect(fromOptions(unit).map(option => option.title)).toEqual(expected);
  });
});

describe('getConversions', () => {
  test('converts row calories to movement equivalents', () => {
    const conversions = getConversions({unit: 'cal', value: '20', fromId: 'row'});
    expect(conversions.find(item => item.option.id === 'run')?.results).toEqual([{value: '200', unit: 'm'}]);
    expect(conversions.some(item => item.option.id === 'distance')).toBe(false);
  });

  test('converts comma decimal input', () => {
    const conversions = getConversions({unit: 'kg', value: '2,5', fromId: 'weight'});
    expect(conversions[0].results).toEqual([{value: '6', unit: 'lb'}]);
  });

  test('provides distance-only results for distance input', () => {
    const conversions = getConversions({unit: 'in', value: '30', fromId: 'distance'});
    expect(conversions).toHaveLength(1);
    expect(conversions[0].results).toEqual([{value: '76', unit: 'cm'}]);
  });
});
