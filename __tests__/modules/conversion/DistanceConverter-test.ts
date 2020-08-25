import {DistanceUnit, DistanceConverter, DistanceConversion} from '../../../modules/conversion';

describe('converts distance', () => {
  test('converts m to km', () => assertConvertion(DistanceUnit.m, 100, DistanceUnit.km, 0.1));

  test('converts km to m', () => assertConvertion(DistanceUnit.km, 1, DistanceUnit.m, 1000));

  test('converts m to ft', () => assertConvertion(DistanceUnit.m, 23, DistanceUnit.ft, 75.45931758530183));

  test('converts ft to m', () => assertConvertion(DistanceUnit.ft, 120, DistanceUnit.m, 36.576));

  test('converts ft to km', () => assertConvertion(DistanceUnit.ft, 120, DistanceUnit.km, 0.036576000000000004));
});

const assertConvertion = (from: DistanceUnit, fromDistance: number, to: DistanceUnit, expectedDistance: number) => {
  const converter = new DistanceConverter(from, fromDistance);

  const conversion: DistanceConversion = converter.convertTo(to);

  expect(conversion.toDistance).toEqual(expectedDistance);
};
