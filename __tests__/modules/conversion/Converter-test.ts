import {Unit, Exercise, ExerciseConversion, ExerciseConverter} from '../../../modules/conversion';

describe('converts to run', () => {
  test('converts row meter to run', () =>
    assertConvertion(Exercise.Row, 250, Unit.Meter, Exercise.Run, 200, Unit.Meter));

  test('converts row cals to run', () =>
    assertConvertion(Exercise.Row, 20, Unit.Calories, Exercise.Run, 200, Unit.Meter));

  test('converts bike to run', () => assertConvertion(Exercise.Bike, 500, Unit.Meter, Exercise.Run, 200, Unit.Meter));

  test('converts airbike to run', () =>
    assertConvertion(Exercise.Airbike, 15, Unit.Calories, Exercise.Run, 200, Unit.Meter));

  test('converts ski cals to run', () =>
    assertConvertion(Exercise.Ski, 20, Unit.Calories, Exercise.Run, 200, Unit.Meter));

  test('converts ski meter to run', () =>
    assertConvertion(Exercise.Ski, 250, Unit.Meter, Exercise.Run, 200, Unit.Meter));
});

describe('converts to row', () => {
  test('converts run to row', () => assertConvertion(Exercise.Run, 1200, Unit.Meter, Exercise.Row, 1500, Unit.Meter));

  test('converts bike to row', () => assertConvertion(Exercise.Bike, 3000, Unit.Meter, Exercise.Row, 1500, Unit.Meter));

  test('converts airbike to row cals', () =>
    assertConvertion(Exercise.Airbike, 90, Unit.Calories, Exercise.Row, 120, Unit.Calories));

  test('converts airbike to row meters', () =>
    assertConvertion(Exercise.Airbike, 90, Unit.Calories, Exercise.Row, 1500, Unit.Meter));

  test('converts ski to row cals', () =>
    assertConvertion(Exercise.Ski, 20, Unit.Calories, Exercise.Row, 20, Unit.Calories));

  test('converts ski to row meter', () =>
    assertConvertion(Exercise.Ski, 20, Unit.Calories, Exercise.Row, 250, Unit.Meter));
});

describe('converts to bike', () => {
  test('converts airbike to bike', () =>
    assertConvertion(Exercise.Airbike, 300, Unit.Calories, Exercise.Bike, 10000, Unit.Meter));

  test('converts run to bike', () =>
    assertConvertion(Exercise.Run, 4000, Unit.Meter, Exercise.Bike, 10000, Unit.Meter));

  test('converts row meter to bike', () =>
    assertConvertion(Exercise.Row, 5000, Unit.Meter, Exercise.Bike, 10000, Unit.Meter));

  test('converts row cals to bike', () =>
    assertConvertion(Exercise.Row, 400, Unit.Calories, Exercise.Bike, 10000, Unit.Meter));

  test('converts ski meter to bike', () =>
    assertConvertion(Exercise.Ski, 5000, Unit.Meter, Exercise.Bike, 10000, Unit.Meter));

  test('converts ski cals to bike', () =>
    assertConvertion(Exercise.Ski, 400, Unit.Calories, Exercise.Bike, 10000, Unit.Meter));

  test('converts run to air bike', () =>
    assertConvertion(Exercise.Run, 800, Unit.Meter, Exercise.Airbike, 60, Unit.Calories));
});

describe('converts to air bike', () => {
  test('converts row meter to air bike', () =>
    assertConvertion(Exercise.Row, 1000, Unit.Meter, Exercise.Airbike, 60, Unit.Calories));

  test('converts ski meter to air bike', () =>
    assertConvertion(Exercise.Ski, 1000, Unit.Meter, Exercise.Airbike, 60, Unit.Calories));

  test('converts row cals to air bike', () =>
    assertConvertion(Exercise.Row, 80, Unit.Calories, Exercise.Airbike, 60, Unit.Calories));

  test('converts ski cals to air bike', () =>
    assertConvertion(Exercise.Ski, 80, Unit.Calories, Exercise.Airbike, 60, Unit.Calories));

  test('converts bike to air bike', () =>
    assertConvertion(Exercise.Bike, 2000, Unit.Meter, Exercise.Airbike, 60, Unit.Calories));
});

test('uses existing unit if requested does not exist', () => {
  const converter = new ExerciseConverter(Exercise.Row, Unit.Calories, 20);

  const throwing = () => converter.convertTo(Exercise.Airbike, Unit.Meter);

  expect(throwing).toThrow('Airbike does not know unit meter. Known units are: calories');
});

const assertConvertion = (
  from: Exercise,
  fromValue: number,
  fromUnit: Unit,
  to: Exercise,
  toValue: number,
  toUnit: Unit,
) => {
  const converter = new ExerciseConverter(from, fromUnit, fromValue);

  const conversion: ExerciseConversion = converter.convertTo(to, toUnit);

  expect(conversion.value).toEqual(toValue);
};
