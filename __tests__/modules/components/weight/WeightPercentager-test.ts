import ConversionConfiguration from '../../../../modules/components/ConversionConfiguration';
import {WeightPercentage, WeightPercentager} from '../../../../modules/components/weight/WeightPercentager';
import WeightOption from '../../../../modules/components/options/WeightOption';
import {WeightUnit} from '../../../../modules/conversion';

describe('calculates percentages', () => {
  test('calculates percentage from 100 kg', () =>
    assertKgToLbPercentages(100, 110, 95, [110, 105, 100, 95], [243, 231, 220, 209]));

  test('calculates percentage from 150 kg', () =>
    assertKgToLbPercentages(150, 100, 80, [150, 143, 135, 128, 120], [331, 314, 298, 281, 265]));

  test('calculates percentage from 220 lb', () =>
    assertLbToKgPercentages(220, 120, 90, [264, 253, 242, 231, 220, 209, 198], [120, 115, 110, 105, 100, 95, 90]));

  test('calculates percentage from 331 lb', () =>
    assertLbToKgPercentages(331, 100, 80, [331, 314, 298, 281, 265], [150, 143, 135, 128, 120]));
});

const assertKgToLbPercentages = (
  value: number,
  startPercentage: number,
  endPercentage: number,
  expectedKgs: Array<number>,
  expectedLb: Array<number>,
): void => {
  const percentages = getPercentages(value, startPercentage, endPercentage, 'kg');
  expect(percentages.length).toEqual(expectedKgs.length);
  percentages.forEach((p, i) => {
    expect(p.conversion.fromUnit).toEqual(WeightUnit.kg);
    expect(p.conversion.fromWeight).toEqual(expectedKgs[i]);
    expect(p.conversion.toUnit).toEqual(WeightUnit.lb);
    expect(p.conversion.toWeight).toEqual(expectedLb[i]);
  });
};

const assertLbToKgPercentages = (
  value: number,
  startPercentage: number,
  endPercentage: number,
  expectedLb: Array<number>,
  expectedKgs: Array<number>,
): void => {
  const percentages = getPercentages(value, startPercentage, endPercentage, 'lb');
  expect(percentages.length).toEqual(expectedKgs.length);
  percentages.forEach((p, i) => {
    expect(p.conversion.fromUnit).toEqual(WeightUnit.lb);
    expect(p.conversion.fromWeight).toEqual(expectedLb[i]);
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
  const percentagesToCalculate = calcualtePercentageRange(startPercentage, endPercentage);
  return percentager.getPercentages(percentagesToCalculate);
};
function calcualtePercentageRange(startPercentage: number, endPercentage: number) {
  const percentagesToCalculate = [];
  for (let p = startPercentage; p >= endPercentage; p -= 5) {
    percentagesToCalculate.push(p);
  }
  return percentagesToCalculate;
}
