import {Unit, Exercise, ExerciseConversion, ExerciseConverter} from '../../../modules/conversion';

describe('converts to run', () => {
  test('converts row meter to run', () =>
    assertConvertion(Exercise.Row, 250, Unit.Meter, Exercise.Run, 200, Unit.Meter));

  test('converts row cals to run', () =>
    assertConvertion(Exercise.Row, 20, Unit.Calories, Exercise.Run, 200, Unit.Meter));

  test('converts bike meters to run', () =>
    assertConvertion(Exercise.Bike, 500, Unit.Meter, Exercise.Run, 200, Unit.Meter));

  test('converts bike cal to run', () =>
    assertConvertion(Exercise.Bike, 20, Unit.Calories, Exercise.Run, 200, Unit.Meter));

  test('converts assault bike to run', () =>
    assertConvertion(Exercise.Assaultbike, 15, Unit.Calories, Exercise.Run, 200, Unit.Meter));

  test('converts echo bike to run', () =>
    assertConvertion(Exercise.Echobike, 15, Unit.Calories, Exercise.Run, 222, Unit.Meter));

  test('converts ski cals to run', () =>
    assertConvertion(Exercise.Ski, 20, Unit.Calories, Exercise.Run, 200, Unit.Meter));

  test('converts ski meter to run', () =>
    assertConvertion(Exercise.Ski, 250, Unit.Meter, Exercise.Run, 200, Unit.Meter));

  test('converts double under to run', () =>
    assertConvertion(Exercise.DoubleUnder, 100, Unit.Reps, Exercise.Run, 267, Unit.Meter));
});

describe('converts to row', () => {
  test('converts run to row', () => assertConvertion(Exercise.Run, 1200, Unit.Meter, Exercise.Row, 1500, Unit.Meter));

  test('converts bike meters to row', () =>
    assertConvertion(Exercise.Bike, 3000, Unit.Meter, Exercise.Row, 1500, Unit.Meter));

  test('converts bike cal to row', () =>
    assertConvertion(Exercise.Bike, 30, Unit.Calories, Exercise.Row, 375, Unit.Meter));

  test('converts assault bike to row cals', () =>
    assertConvertion(Exercise.Assaultbike, 90, Unit.Calories, Exercise.Row, 120, Unit.Calories));

  test('converts assault bike to row meters', () =>
    assertConvertion(Exercise.Assaultbike, 90, Unit.Calories, Exercise.Row, 1500, Unit.Meter));

  test('converts echo bike to row cals', () =>
    assertConvertion(Exercise.Echobike, 90, Unit.Calories, Exercise.Row, 133, Unit.Calories));

  test('converts echo bike to row meters', () =>
    assertConvertion(Exercise.Echobike, 90, Unit.Calories, Exercise.Row, 1667, Unit.Meter));

  test('converts ski to row cals', () =>
    assertConvertion(Exercise.Ski, 20, Unit.Calories, Exercise.Row, 20, Unit.Calories));

  test('converts ski to row meter', () =>
    assertConvertion(Exercise.Ski, 20, Unit.Calories, Exercise.Row, 250, Unit.Meter));

  test('converts double under to row cals', () =>
    assertConvertion(Exercise.DoubleUnder, 100, Unit.Reps, Exercise.Row, 27, Unit.Calories));

  test('converts double under to row meter', () =>
    assertConvertion(Exercise.DoubleUnder, 100, Unit.Reps, Exercise.Row, 333, Unit.Meter));
});

describe('converts to bike', () => {
  test('converts assault bike to bike', () =>
    assertConvertion(Exercise.Assaultbike, 300, Unit.Calories, Exercise.Bike, 10000, Unit.Meter));

  test('converts echo bike to bike', () =>
    assertConvertion(Exercise.Echobike, 300, Unit.Calories, Exercise.Bike, 11111, Unit.Meter));

  test('converts run to bike meters', () =>
    assertConvertion(Exercise.Run, 4000, Unit.Meter, Exercise.Bike, 10000, Unit.Meter));

  test('converts run to bike cal', () =>
    assertConvertion(Exercise.Run, 4000, Unit.Meter, Exercise.Bike, 400, Unit.Calories));

  test('converts row meter to bike', () =>
    assertConvertion(Exercise.Row, 5000, Unit.Meter, Exercise.Bike, 10000, Unit.Meter));

  test('converts row cals to bike', () =>
    assertConvertion(Exercise.Row, 400, Unit.Calories, Exercise.Bike, 10000, Unit.Meter));

  test('converts ski meter to bike', () =>
    assertConvertion(Exercise.Ski, 5000, Unit.Meter, Exercise.Bike, 10000, Unit.Meter));

  test('converts ski cals to bike', () =>
    assertConvertion(Exercise.Ski, 400, Unit.Calories, Exercise.Bike, 10000, Unit.Meter));

  test('converts run to bike', () => assertConvertion(Exercise.Run, 800, Unit.Meter, Exercise.Bike, 80, Unit.Calories));

  test('converts double unders to bike', () =>
    assertConvertion(Exercise.DoubleUnder, 100, Unit.Reps, Exercise.Bike, 27, Unit.Calories));
});

describe('converts to assault bike', () => {
  test('converts row meter to assault bike', () =>
    assertConvertion(Exercise.Row, 1000, Unit.Meter, Exercise.Assaultbike, 60, Unit.Calories));

  test('converts ski meter to assault bike', () =>
    assertConvertion(Exercise.Ski, 1000, Unit.Meter, Exercise.Assaultbike, 60, Unit.Calories));

  test('converts row cals to assault bike', () =>
    assertConvertion(Exercise.Row, 80, Unit.Calories, Exercise.Assaultbike, 60, Unit.Calories));

  test('converts ski cals to assault bike', () =>
    assertConvertion(Exercise.Ski, 80, Unit.Calories, Exercise.Assaultbike, 60, Unit.Calories));

  test('converts bike meters to assault bike', () =>
    assertConvertion(Exercise.Bike, 2000, Unit.Meter, Exercise.Assaultbike, 60, Unit.Calories));

  test('converts bike cals to assault bike', () =>
    assertConvertion(Exercise.Bike, 20, Unit.Calories, Exercise.Assaultbike, 15, Unit.Calories));

  test('converts double unders to assault bike', () =>
    assertConvertion(Exercise.DoubleUnder, 100, Unit.Reps, Exercise.Assaultbike, 20, Unit.Calories));

  test('converts echo bike cals to assault bike', () =>
    assertConvertion(Exercise.Echobike, 20, Unit.Calories, Exercise.Assaultbike, 22, Unit.Calories));
});

describe('converts to echo bike', () => {
  test('converts row meter to echo bike', () =>
    assertConvertion(Exercise.Row, 1000, Unit.Meter, Exercise.Echobike, 54, Unit.Calories));

  test('converts ski meter to echo bike', () =>
    assertConvertion(Exercise.Ski, 1000, Unit.Meter, Exercise.Echobike, 54, Unit.Calories));

  test('converts row cals to echo bike', () =>
    assertConvertion(Exercise.Row, 80, Unit.Calories, Exercise.Echobike, 54, Unit.Calories));

  test('converts ski cals to echo bike', () =>
    assertConvertion(Exercise.Ski, 80, Unit.Calories, Exercise.Echobike, 54, Unit.Calories));

  test('converts bike meters to echo bike', () =>
    assertConvertion(Exercise.Bike, 2000, Unit.Meter, Exercise.Echobike, 54, Unit.Calories));

  test('converts bike cals to echo bike', () =>
    assertConvertion(Exercise.Bike, 20, Unit.Calories, Exercise.Echobike, 14, Unit.Calories));

  test('converts double unders to echo bike', () =>
    assertConvertion(Exercise.DoubleUnder, 100, Unit.Reps, Exercise.Echobike, 18, Unit.Calories));

  test('converts assault bike cals to echo bike', () =>
    assertConvertion(Exercise.Assaultbike, 20, Unit.Calories, Exercise.Echobike, 18, Unit.Calories));
});

describe('converts to burpee', () => {
  test('converts row meter to burpees', () =>
    assertConvertion(Exercise.Row, 500, Unit.Meter, Exercise.Burpee, 30, Unit.Reps));

  test('converts ski meter to burpees', () =>
    assertConvertion(Exercise.Ski, 1000, Unit.Meter, Exercise.Burpee, 60, Unit.Reps));

  test('converts row cals to burpees', () =>
    assertConvertion(Exercise.Row, 80, Unit.Calories, Exercise.Burpee, 60, Unit.Reps));

  test('converts ski cals to burpess', () =>
    assertConvertion(Exercise.Ski, 80, Unit.Calories, Exercise.Burpee, 60, Unit.Reps));

  test('converts bike meters to burpees', () =>
    assertConvertion(Exercise.Bike, 2000, Unit.Meter, Exercise.Burpee, 60, Unit.Reps));

  test('converts bike cals to burpees', () =>
    assertConvertion(Exercise.Bike, 20, Unit.Calories, Exercise.Burpee, 15, Unit.Reps));

  test('converts double unders to burpees', () =>
    assertConvertion(Exercise.DoubleUnder, 100, Unit.Reps, Exercise.Burpee, 20, Unit.Reps));
});

describe('converts to double unders', () => {
  test('converts row meter to double unders', () =>
    assertConvertion(Exercise.Row, 250, Unit.Meter, Exercise.DoubleUnder, 75, Unit.Reps));

  test('converts row cals to double unders', () =>
    assertConvertion(Exercise.Row, 20, Unit.Calories, Exercise.DoubleUnder, 75, Unit.Reps));

  test('converts bike meters to double unders', () =>
    assertConvertion(Exercise.Bike, 500, Unit.Meter, Exercise.DoubleUnder, 75, Unit.Reps));

  test('converts bike cal to double unders', () =>
    assertConvertion(Exercise.Bike, 20, Unit.Calories, Exercise.DoubleUnder, 75, Unit.Reps));

  test('converts assault bike to double unders', () =>
    assertConvertion(Exercise.Assaultbike, 15, Unit.Calories, Exercise.DoubleUnder, 75, Unit.Reps));

  test('converts echo bike to double unders', () =>
    assertConvertion(Exercise.Echobike, 15, Unit.Calories, Exercise.DoubleUnder, 83, Unit.Reps));

  test('converts ski cals to double unders', () =>
    assertConvertion(Exercise.Ski, 20, Unit.Calories, Exercise.DoubleUnder, 75, Unit.Reps));

  test('converts ski meter to double unders', () =>
    assertConvertion(Exercise.Ski, 250, Unit.Meter, Exercise.DoubleUnder, 75, Unit.Reps));
});

test('uses existing unit if requested does not exist', () => {
  const converter = new ExerciseConverter(Exercise.Row, Unit.Calories, 20);

  const throwing = () => converter.convertTo(Exercise.Assaultbike, Unit.Meter);

  expect(throwing).toThrow('Assaultbike does not know unit meter. Known units are: calories');
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
