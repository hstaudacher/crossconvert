import ConversionConfiguration from '../../../../modules/components/ConversionConfiguration';
import {WeightPercentage, WeightPercentager} from '../../../../modules/components/weight/WeightPercentager';
import WeightOption from '../../../../modules/components/options/WeightOption';
import {WeightUnit} from '../../../../modules/conversion';

describe('calculates percentages', () => {
  test('calculates percentage from 100 kg', () =>
    assertKgToLbsPercentages(100, 110, 95, [110, 105, 100, 95], [243, 231, 220, 209]));

  test('calculates percentage from 150 kg', () =>
    assertKgToLbsPercentages(150, 100, 80, [150, 143, 135, 128, 120], [331, 314, 298, 281, 265]));

  test('calculates percentage from 220 lbs', () =>
    assertLbsToKgPercentages(220, 120, 90, [264, 253, 242, 231, 220, 209, 198], [120, 115, 110, 105, 100, 95, 90]));

  test('calculates percentage from 331 lbs', () =>
    assertLbsToKgPercentages(331, 100, 80, [331, 314, 298, 281, 265], [150, 143, 135, 128, 120]));
});

const assertKgToLbsPercentages = (
  value: number,
  startPercentage: number,
  endPercentage: number,
  expectedKgs: Array<number>,
  expectedLbs: Array<number>,
): void => {
  const percentages = getPercentages(value, startPercentage, endPercentage, 'kg');
  expect(percentages.length).toEqual(expectedKgs.length);
  percentages.forEach((p, i) => {
    expect(p.conversion.fromUnit).toEqual(WeightUnit.kg);
    expect(p.conversion.fromWeight).toEqual(expectedKgs[i]);
    expect(p.conversion.toUnit).toEqual(WeightUnit.lbs);
    expect(p.conversion.toWeight).toEqual(expectedLbs[i]);
  });
};

const assertLbsToKgPercentages = (
  value: number,
  startPercentage: number,
  endPercentage: number,
  expectedLbs: Array<number>,
  expectedKgs: Array<number>,
): void => {
  const percentages = getPercentages(value, startPercentage, endPercentage, 'lbs');
  expect(percentages.length).toEqual(expectedKgs.length);
  percentages.forEach((p, i) => {
    expect(p.conversion.fromUnit).toEqual(WeightUnit.lbs);
    expect(p.conversion.fromWeight).toEqual(expectedLbs[i]);
    expect(p.conversion.toUnit).toEqual(WeightUnit.kg);
    expect(p.conversion.toWeight).toEqual(expectedKgs[i]);
  });
};

const getPercentages = (
  value: number,
  startPercentage: number,
  endPercentage: number,
  unit: string,
): WeightPercentage[] => {
  const option = new WeightOption('Weight', 'barbell-outline', 'ionicon', 'green', 10, 10);
  const config = new ConversionConfiguration(unit, value.toString(), option);
  const percentager = new WeightPercentager(config);
  return percentager.getPercentages(startPercentage, endPercentage);
};
