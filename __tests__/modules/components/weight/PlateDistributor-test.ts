import {Plate, PlateMapping, plateMappings} from '../../../../modules/components/settings/Plates';
import {Bar} from '../../../../modules/components/settings/Bar';
import {PlateAvailability, WeightSettings} from '../../../../modules/components/settings/WeightSettings';
import {PlateDistributor} from '../../../../modules/components/weight/PlateDistributor';
import {WeightUnit} from '../../../../modules/conversion';

describe('distributes kg plates', () => {
  test('distributes 50 kg plates', () => assertPlateDistribution(50, WeightUnit.kg, 20, [15, 15]));

  test('distributes 100 kg plates', () => assertPlateDistribution(100, WeightUnit.kg, 20, [25, 25, 15, 15]));

  test('distributes 120 kg plates', () => assertPlateDistribution(120, WeightUnit.kg, 20, [25, 25, 25, 25]));

  test('distributes 30 kg plates', () => assertPlateDistribution(30, WeightUnit.kg, 20, [5, 5]));

  test('distributes 31 kg plates', () => assertPlateDistribution(31, WeightUnit.kg, 20, [5, 5, 0.5, 0.5]));

  test('distributes 20 kg bar weight', () => assertPlateDistribution(20, WeightUnit.kg, 20, []));

  test('distributes 23 kg plates', () => assertPlateDistribution(23, WeightUnit.kg, 20, [1.5, 1.5]));

  test('distributes 20 kg plates with different bar', () => assertPlateDistribution(20, WeightUnit.kg, 16, [2, 2]));

  test('distributes lower weight as bar weight', () => assertPlateDistribution(10, WeightUnit.kg, 20, []));

  test('distributes 100 lbs plates', () => assertPlateDistribution(100, WeightUnit.lbs, 45, [25, 25, 2.5, 2.5]));

  test('distributes weight with limited plates, 20s and 10s', () => {
    assertDistributionWithLimitedAvailability(
      [createAvailability(20, 45, 2), createAvailability(10, 25, 4)],
      100, //
      [20, 20, 10, 10, 10, 10],
    );
  });

  test('distributes weight with limited plates, 25s, 20s and 10s', () => {
    assertDistributionWithLimitedAvailability(
      [createAvailability(25, 45, 2), createAvailability(20, 45, 2), createAvailability(10, 25, 4)],
      110, //
      [25, 25, 20, 20],
    );
  });

  test('empty distribution if plates dont fit ', () => {
    assertDistributionWithLimitedAvailability(
      [createAvailability(25, 45, 2), createAvailability(20, 45, 2)],
      101, //
      [25, 25],
      false,
    );
  });
});

const createAvailability = (kg: number, lb: number, availability: number) => {
  return new PlateAvailability(new PlateMapping(Plate.BLUE, kg, lb), availability);
};

const assertPlateDistribution = (
  weight: number,
  unit: WeightUnit,
  barWeight: number,
  expectedPlates: number[],
): void => {
  const weightSettings = new WeightSettings(
    new Bar('foo', barWeight, barWeight),
    plateMappings().map((m) => new PlateAvailability(m, 4)),
  );
  const distribution = new PlateDistributor(weightSettings, unit).getPlateDistribution(weight);

  expect(unit).toEqual(distribution.unit);
  expect(distribution.plates).toEqual(expectedPlates);
};

const assertDistributionWithLimitedAvailability = (
  availability: PlateAvailability[],
  weight: number,
  expectedPlates: number[],
  completelyDistributed = true,
) => {
  const bar = new Bar('foo', 20, 45);
  const settings = new WeightSettings(bar, availability);
  const distributor = new PlateDistributor(settings, WeightUnit.kg);

  const distribution = distributor.getPlateDistribution(weight);

  expect(distribution.plates).toEqual(expectedPlates);
  expect(distribution.completelyDistributed).toEqual(completelyDistributed);
};
