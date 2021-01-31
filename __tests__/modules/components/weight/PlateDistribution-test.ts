import {Plate} from 'modules/components/settings/Plates';
import {PlateDistribution, PlateGroup} from '../../../../modules/components/weight/PlateDistributor';
import {WeightUnit} from '../../../../modules/conversion';

describe('plate distribution uses color coded plates', () => {
  test('distributes 2 red kgs', () => assertPlateDistribution([25, 25], WeightUnit.kg, [new PlateGroup(Plate.RED, 2)]));

  test('distributes 2 blue kgs', () =>
    assertPlateDistribution([20, 20], WeightUnit.kg, [new PlateGroup(Plate.BLUE, 2)]));

  test('distributes 2 yellow kgs', () =>
    assertPlateDistribution([15, 15], WeightUnit.kg, [new PlateGroup(Plate.YELLOW, 2)]));

  test('distributes 2 green kgs', () =>
    assertPlateDistribution([10, 10], WeightUnit.kg, [new PlateGroup(Plate.GREEN, 2)]));

  test('distributes 2 white kgs', () =>
    assertPlateDistribution([5, 5], WeightUnit.kg, [new PlateGroup(Plate.WHITE, 2)]));

  test('distributes 2 fractional red kgs', () =>
    assertPlateDistribution([2.5, 2.5], WeightUnit.kg, [new PlateGroup(Plate.FRACTIONAL_RED, 2)]));

  test('distributes 2 fractional blue kgs', () =>
    assertPlateDistribution([2, 2], WeightUnit.kg, [new PlateGroup(Plate.FRACTIONAL_BLUE, 2)]));

  test('distributes 2 fractional yellow kgs', () =>
    assertPlateDistribution([1.5, 1.5], WeightUnit.kg, [new PlateGroup(Plate.FRACTIONAL_YELLOW, 2)]));

  test('distributes 2 fractional green kgs', () =>
    assertPlateDistribution([1, 1], WeightUnit.kg, [new PlateGroup(Plate.FRACTIONAL_GREEN, 2)]));

  test('distributes 2 fractional white kgs', () =>
    assertPlateDistribution([0.5, 0.5], WeightUnit.kg, [new PlateGroup(Plate.FRACTIONAL_WHITE, 2)]));

  test('distributes 2 blue and 2 fractional green kgs', () =>
    assertPlateDistribution([20, 20, 1, 1], WeightUnit.kg, [
      new PlateGroup(Plate.BLUE, 2),
      new PlateGroup(Plate.FRACTIONAL_GREEN, 2),
    ]));
  test('distributes weights sorted', () =>
    assertPlateDistribution([1, 1, 20, 20], WeightUnit.kg, [
      new PlateGroup(Plate.BLUE, 2),
      new PlateGroup(Plate.FRACTIONAL_GREEN, 2),
    ]));

  test('distributes 2 red lbs', () =>
    assertPlateDistribution([55, 55], WeightUnit.lbs, [new PlateGroup(Plate.RED, 2)]));

  test('distributes 2 blue lbs', () =>
    assertPlateDistribution([45, 45], WeightUnit.lbs, [new PlateGroup(Plate.BLUE, 2)]));

  test('distributes 2 yellow lbs', () =>
    assertPlateDistribution([35, 35], WeightUnit.lbs, [new PlateGroup(Plate.YELLOW, 2)]));

  test('distributes 2 green lbs', () =>
    assertPlateDistribution([25, 25], WeightUnit.lbs, [new PlateGroup(Plate.GREEN, 2)]));

  test('distributes 2 white lbs', () =>
    assertPlateDistribution([10, 10], WeightUnit.lbs, [new PlateGroup(Plate.WHITE, 2)]));

  test('distributes 2 fractional blue lbs', () =>
    assertPlateDistribution([5, 5], WeightUnit.lbs, [new PlateGroup(Plate.FRACTIONAL_BLUE, 2)]));

  test('distributes 2 fractional green lbs', () =>
    assertPlateDistribution([2.5, 2.5], WeightUnit.lbs, [new PlateGroup(Plate.FRACTIONAL_GREEN, 2)]));

  test('distributes 2 fractional red lbs', () =>
    assertPlateDistribution([1, 1], WeightUnit.lbs, [new PlateGroup(Plate.FRACTIONAL_RED, 2)]));

  test('distributes 2 fractional yellow lbs', () =>
    assertPlateDistribution([0.5, 0.5], WeightUnit.lbs, [new PlateGroup(Plate.FRACTIONAL_YELLOW, 2)]));

  test('distributes 2 blues and 2 fractional green lbs', () =>
    assertPlateDistribution([45, 45, 2.5, 2.5], WeightUnit.lbs, [
      new PlateGroup(Plate.BLUE, 2),
      new PlateGroup(Plate.FRACTIONAL_GREEN, 2),
    ]));
});

const assertPlateDistribution = (weights: number[], unit: WeightUnit, expectedGroups: PlateGroup[]): void => {
  const distribution = new PlateDistribution(weights, unit);

  expect(expectedGroups).toEqual(distribution.getPlateGroups());
};
