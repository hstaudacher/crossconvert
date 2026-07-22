import {WeightUnit} from './conversion';
import {
  bars,
  defaultWeightSettings,
  getWeightPercentages,
  PlateDistribution,
  PlateDistributor,
  plates,
  type WeightSettings,
} from './weights';

describe('weight percentages', () => {
  test('calculates kg to lb percentages', () => {
    const percentages = getWeightPercentages({unit: 'kg', value: '100', fromId: 'weight'}, [110, 105, 100, 95]);
    expect(percentages.map(item => item.conversion.fromWeight)).toEqual([110, 105, 100, 95]);
    expect(percentages.map(item => item.conversion.toWeight)).toEqual([243, 231, 220, 209]);
  });

  test('calculates lb to kg percentages', () => {
    const percentages = getWeightPercentages(
      {unit: 'lb', value: '220', fromId: 'weight'},
      [120, 115, 110, 105, 100, 95, 90],
    );
    expect(percentages.map(item => item.conversion.fromWeight)).toEqual([264, 253, 242, 231, 220, 209, 198]);
    expect(percentages.map(item => item.conversion.toWeight)).toEqual([120, 115, 110, 105, 100, 95, 90]);
  });
});

describe('PlateDistribution', () => {
  test('groups and sorts color-coded plates', () => {
    const groups = new PlateDistribution([1, 1, 20, 20], WeightUnit.Kilogram).getPlateGroups();
    expect(groups.map(group => [group.definition.id, group.amount])).toEqual([
      ['blue', 2],
      ['fractional-green', 2],
    ]);
  });

  test('groups pound plates', () => {
    const groups = new PlateDistribution([45, 45, 2.5, 2.5], WeightUnit.Pound).getPlateGroups();
    expect(groups.map(group => [group.definition.id, group.amount])).toEqual([
      ['blue', 2],
      ['fractional-green', 2],
    ]);
  });
});

describe('PlateDistributor', () => {
  test.each([
    [50, WeightUnit.Kilogram, 20, [15, 15]],
    [100, WeightUnit.Kilogram, 20, [20, 20, 20, 20]],
    [120, WeightUnit.Kilogram, 20, [20, 20, 20, 20, 10, 10]],
    [31, WeightUnit.Kilogram, 20, [5, 5, 0.5, 0.5]],
    [20, WeightUnit.Kilogram, 16, [2, 2]],
    [100, WeightUnit.Pound, 45, [25, 25, 2.5, 2.5]],
  ])('distributes available plates', (weight, unit, barWeight, expected) => {
    const settings: WeightSettings = {
      ...defaultWeightSettings,
      barId: bars.find(bar => bar.kg === barWeight || bar.lb === barWeight)?.id ?? bars[0].id,
    };
    expect(new PlateDistributor(settings, unit).getPlateDistribution(weight).plates).toEqual(expected);
  });

  test('reports an incomplete distribution with limited plates', () => {
    const settings: WeightSettings = {
      barId: bars[0].id,
      availablePlates: [
        {plateId: 'red', availability: 2},
        {plateId: 'blue', availability: 2},
      ],
    };
    const distribution = new PlateDistributor(settings, WeightUnit.Kilogram).getPlateDistribution(101);
    expect(distribution.plates).toEqual([25, 25]);
    expect(distribution.completelyDistributed).toBe(false);
  });

  test('handles no available plates', () => {
    const settings: WeightSettings = {
      barId: bars[0].id,
      availablePlates: plates.map(plate => ({plateId: plate.id, availability: 0})),
    };
    const distribution = new PlateDistributor(settings, WeightUnit.Kilogram).getPlateDistribution(40);
    expect(distribution.plates).toEqual([]);
    expect(distribution.completelyDistributed).toBe(false);
  });
});
