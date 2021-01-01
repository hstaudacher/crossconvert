import ConversionConfiguration from '../../../../modules/components/ConversionConfiguration';
import {WeightPercentage, WeightPercentager} from '../../../../modules/components/options/WeightPercentager';
import WeightOption from '../../../../modules/components/options/WeightOption';
import {WeightUnit} from '../../../../modules/conversion';

describe('calculates percentages', () => {
  test('calculates percentage from 100 kg', () =>
    assertKgToLbsPercentages(
      100,
      [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50],
      [220, 209, 198, 187, 176, 165, 154, 143, 132, 121, 110],
    ));

  test('calculates percentage from 150 kg', () =>
    assertKgToLbsPercentages(
      150,
      [150, 143, 135, 128, 120, 113, 105, 98, 90, 83, 75],
      [331, 314, 298, 281, 265, 248, 231, 215, 198, 182, 165],
    ));

  test('calculates percentage from 220 lbs', () =>
    assertLbsToKgPercentages(
      220,
      [220, 209, 198, 187, 176, 165, 154, 143, 132, 121, 110],
      [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50],
    ));

  test('calculates percentage from 331 lbs', () =>
    assertLbsToKgPercentages(
      331,
      [331, 314, 298, 281, 265, 248, 232, 215, 199, 182, 166],
      [150, 143, 135, 128, 120, 113, 105, 98, 90, 83, 75],
    ));
});

const assertKgToLbsPercentages = (value: number, expectedKgs: Array<number>, expectedLbs: Array<number>): void => {
  const percentages = getPercentages(value, 'kg');
  expect(percentages.length).toEqual(expectedKgs.length);
  percentages.forEach((p, i) => {
    expect(p.conversion.fromUnit).toEqual(WeightUnit.kg);
    expect(p.conversion.fromWeight).toEqual(expectedKgs[i]);
    expect(p.conversion.toUnit).toEqual(WeightUnit.lbs);
    expect(p.conversion.toWeight).toEqual(expectedLbs[i]);
  });
};

const assertLbsToKgPercentages = (value: number, expectedLbs: Array<number>, expectedKgs: Array<number>): void => {
  const percentages = getPercentages(value, 'lbs');
  expect(percentages.length).toEqual(expectedKgs.length);
  percentages.forEach((p, i) => {
    expect(p.conversion.fromUnit).toEqual(WeightUnit.lbs);
    expect(p.conversion.fromWeight).toEqual(expectedLbs[i]);
    expect(p.conversion.toUnit).toEqual(WeightUnit.kg);
    expect(p.conversion.toWeight).toEqual(expectedKgs[i]);
  });
};

const getPercentages = (value: number, unit: string): WeightPercentage[] => {
  const option = new WeightOption('Weight', 'barbell-outline', 'ionicon', 'green');
  const config = new ConversionConfiguration(unit, value.toString(), option);
  const percentager = new WeightPercentager(config);
  return percentager.getPercentages();
};
