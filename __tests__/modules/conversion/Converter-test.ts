import {
  Unit,
  Exercise,
  Conversion,
  Converter,
} from '../../../modules/conversion';

test('converts from row to run', () => {
  const converter = new Converter(Exercise.Row, Unit.Meter, 250);

  const conversion: Conversion = converter.convertTo(Exercise.Run);

  expect(conversion.value).toEqual(200);
});
