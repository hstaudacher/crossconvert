import {WeightUnit, WeightConverter, WeightConversion} from '../../../modules/conversion';

describe('converts weight', () => {
  test('converts kg to lb', () => assertConvertion(WeightUnit.kg, 40, WeightUnit.lb, 88.18490487395103));

  test('converts kg to lb rounds up', () => assertConvertion(WeightUnit.kg, 42, WeightUnit.lb, 92.59415011764858));

  test('converts lb to kg', () => assertConvertion(WeightUnit.lb, 40, WeightUnit.kg, 18.143694800000002));

  test('converts lb to lb', () => assertConvertion(WeightUnit.lb, 40, WeightUnit.lb, 40));

  test('converts kg to kg', () => assertConvertion(WeightUnit.kg, 40, WeightUnit.kg, 40));
});

const assertConvertion = (from: WeightUnit, fromWeight: number, to: WeightUnit, expectedWeight: number) => {
  const converter = new WeightConverter(from, fromWeight);

  const conversion: WeightConversion = converter.convertTo(to);

  expect(conversion.toWeight).toEqual(expectedWeight);
};
