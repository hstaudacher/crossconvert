import {Unit, Exercise, Conversion, Converter} from '../../../modules/conversion';

test('converts row to run', () => {
  const converter = new Converter(Exercise.Row, Unit.Meter, 250);

  const conversion: Conversion = converter.convertTo(Exercise.Run, Unit.Meter);

  expect(conversion.value).toEqual(200);
});

test('converts bike to run', () => {
  const converter = new Converter(Exercise.Bike, Unit.Meter, 500);

  const conversion: Conversion = converter.convertTo(Exercise.Run, Unit.Meter);

  expect(conversion.value).toEqual(200);
});

test('converts airbike to run', () => {
  const converter = new Converter(Exercise.Airbike, Unit.Calories, 15);

  const conversion: Conversion = converter.convertTo(Exercise.Run, Unit.Meter);

  expect(conversion.value).toEqual(200);
});

test('converts ski to run', () => {
  const converter = new Converter(Exercise.Ski, Unit.Calories, 20);

  const conversion: Conversion = converter.convertTo(Exercise.Run, Unit.Meter);

  expect(conversion.value).toEqual(200);
});
