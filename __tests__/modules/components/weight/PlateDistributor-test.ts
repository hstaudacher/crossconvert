import {PlateDistributor} from '../../../../modules/components/weight/PlateDistributor';
import {WeightUnit} from '../../../../modules/conversion';

describe('distributes kg plates', () => {
  test('distributes 50 kg plates', () => assertPlateDistribution(50, WeightUnit.kg, 20, [15, 15]));

  test('distributes 100 kg plates', () => assertPlateDistribution(100, WeightUnit.kg, 20, [25, 25, 15, 15]));

  test('distributes 120 kg plates', () => assertPlateDistribution(120, WeightUnit.kg, 20, [25, 25, 25, 25]));

  test('distributes 30 kg plates', () => assertPlateDistribution(30, WeightUnit.kg, 20, [5, 5]));

  test('distributes 31 kg plates', () => assertPlateDistribution(31, WeightUnit.kg, 20, [5, 5, 0.5, 0.5]));

  test('distributes 20 kg bar weight', () => assertPlateDistribution(20, WeightUnit.kg, 20, []));

  test('distributes 23 kg plates', () => assertPlateDistribution(23, WeightUnit.kg, 20, [1, 1, 0.5, 0.5]));

  test('distributes 20 kg plates with different bar', () => assertPlateDistribution(20, WeightUnit.kg, 16, [2, 2]));

  test('distributes lower weight as bar weight', () => assertPlateDistribution(10, WeightUnit.kg, 20, []));

  test('distributes 100 lbs plates', () => assertPlateDistribution(100, WeightUnit.lbs, 45, [25, 25, 2.5, 2.5]));
});

const assertPlateDistribution = (
  weight: number,
  unit: WeightUnit,
  barWeight: number,
  expectedPlates: number[],
): void => {
  const distribution = new PlateDistributor(barWeight, unit).getPlateDistribution(weight);

  expect(unit).toEqual(distribution.unit);
  expect(distribution.plates).toEqual(expectedPlates);
};
