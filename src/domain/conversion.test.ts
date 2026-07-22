import {
  DistanceConverter,
  DistanceUnit,
  Exercise,
  ExerciseConverter,
  ExerciseUnit,
  WeightConverter,
  WeightUnit,
} from './conversion';

describe('ExerciseConverter', () => {
  test.each([
    [Exercise.Row, 250, ExerciseUnit.Meter, Exercise.Run, 200, ExerciseUnit.Meter],
    [Exercise.Row, 20, ExerciseUnit.Calories, Exercise.Run, 200, ExerciseUnit.Meter],
    [Exercise.Bike, 500, ExerciseUnit.Meter, Exercise.Run, 200, ExerciseUnit.Meter],
    [Exercise.AssaultBike, 15, ExerciseUnit.Calories, Exercise.Run, 200, ExerciseUnit.Meter],
    [Exercise.EchoBike, 15, ExerciseUnit.Calories, Exercise.Run, 222, ExerciseUnit.Meter],
    [Exercise.DoubleUnder, 100, ExerciseUnit.Reps, Exercise.Run, 267, ExerciseUnit.Meter],
    [Exercise.Run, 1200, ExerciseUnit.Meter, Exercise.Row, 1500, ExerciseUnit.Meter],
    [Exercise.AssaultBike, 90, ExerciseUnit.Calories, Exercise.Row, 120, ExerciseUnit.Calories],
    [Exercise.EchoBike, 90, ExerciseUnit.Calories, Exercise.Row, 1667, ExerciseUnit.Meter],
    [Exercise.DoubleUnder, 100, ExerciseUnit.Reps, Exercise.Row, 27, ExerciseUnit.Calories],
    [Exercise.Run, 4000, ExerciseUnit.Meter, Exercise.Bike, 400, ExerciseUnit.Calories],
    [Exercise.DoubleUnder, 100, ExerciseUnit.Reps, Exercise.Bike, 27, ExerciseUnit.Calories],
    [Exercise.Row, 1000, ExerciseUnit.Meter, Exercise.AssaultBike, 60, ExerciseUnit.Calories],
    [Exercise.EchoBike, 20, ExerciseUnit.Calories, Exercise.AssaultBike, 22, ExerciseUnit.Calories],
    [Exercise.Row, 1000, ExerciseUnit.Meter, Exercise.EchoBike, 54, ExerciseUnit.Calories],
    [Exercise.AssaultBike, 20, ExerciseUnit.Calories, Exercise.EchoBike, 18, ExerciseUnit.Calories],
    [Exercise.Bike, 2000, ExerciseUnit.Meter, Exercise.Burpee, 60, ExerciseUnit.Reps],
    [Exercise.DoubleUnder, 100, ExerciseUnit.Reps, Exercise.Burpee, 20, ExerciseUnit.Reps],
    [Exercise.Row, 250, ExerciseUnit.Meter, Exercise.DoubleUnder, 75, ExerciseUnit.Reps],
    [Exercise.EchoBike, 15, ExerciseUnit.Calories, Exercise.DoubleUnder, 83, ExerciseUnit.Reps],
  ])('converts equivalent work', (from, value, unit, to, expected, expectedUnit) => {
    const conversion = new ExerciseConverter(from, unit, value).convertTo(to, expectedUnit);
    expect(conversion.value).toBe(expected);
  });

  test('reports unsupported target units', () => {
    const converter = new ExerciseConverter(Exercise.Row, ExerciseUnit.Calories, 20);
    expect(() => converter.convertTo(Exercise.AssaultBike, ExerciseUnit.Meter)).toThrow(
      'AssaultBike does not know unit meter. Known units are: calories',
    );
  });
});

describe('DistanceConverter', () => {
  test.each([
    [DistanceUnit.Meter, 100, DistanceUnit.Kilometer, 0.1],
    [DistanceUnit.Kilometer, 1, DistanceUnit.Meter, 1000],
    [DistanceUnit.Meter, 23, DistanceUnit.Feet, 75.45931758530183],
    [DistanceUnit.Feet, 120, DistanceUnit.Meter, 36.576],
    [DistanceUnit.Feet, 120, DistanceUnit.Kilometer, 0.036576],
    [DistanceUnit.Inch, 30, DistanceUnit.Centimeter, 76.2],
  ])('converts distances', (from, value, to, expected) => {
    expect(new DistanceConverter(from, value).convertTo(to).toDistance).toBeCloseTo(expected, 12);
  });
});

describe('WeightConverter', () => {
  test.each([
    [WeightUnit.Kilogram, 40, WeightUnit.Pound, 88.18490487395103],
    [WeightUnit.Kilogram, 42, WeightUnit.Pound, 92.59415011764858],
    [WeightUnit.Pound, 40, WeightUnit.Kilogram, 18.1436948],
    [WeightUnit.Pound, 40, WeightUnit.Pound, 40],
    [WeightUnit.Kilogram, 40, WeightUnit.Kilogram, 40],
  ])('converts weights', (from, value, to, expected) => {
    expect(new WeightConverter(from, value).convertTo(to).toWeight).toBeCloseTo(expected, 12);
  });
});
