export enum Exercise {
  Row = 'Row',
  Run = 'Run',
  Bike = 'Bike',
  AssaultBike = 'AssaultBike',
  EchoBike = 'Echo Bike',
  Ski = 'Ski',
  Burpee = 'Burpee',
  DoubleUnder = 'Double Under',
}

export enum ExerciseUnit {
  Meter = 'meter',
  Calories = 'calories',
  Reps = 'reps',
}

export enum DistanceUnit {
  Centimeter = 'centimeter',
  Meter = 'meter',
  Kilometer = 'kilometer',
  Feet = 'feet',
  Inch = 'inch',
  Mile = 'mile',
}

export enum WeightUnit {
  Pound = 'pound',
  Kilogram = 'kilogram',
}

export function formatWeightUnit(unit: WeightUnit): 'kg' | 'lb' {
  return unit === WeightUnit.Kilogram ? 'kg' : 'lb';
}

export class ExerciseConversion {
  constructor(
    readonly from: Exercise,
    readonly to: Exercise,
    readonly unit: ExerciseUnit,
    readonly value: number,
  ) {}
}

export class DistanceConversion {
  constructor(
    readonly fromUnit: DistanceUnit,
    readonly fromDistance: number,
    readonly toUnit: DistanceUnit,
    readonly toDistance: number,
  ) {}
}

export class WeightConversion {
  constructor(
    readonly fromUnit: WeightUnit,
    readonly fromWeight: number,
    readonly toUnit: WeightUnit,
    readonly toWeight: number,
  ) {}

  onlyTo(): WeightConversion {
    return new WeightConversion(this.toUnit, this.toWeight, this.toUnit, this.toWeight);
  }
}

interface ExerciseReferenceValue {
  value: number;
  unit: ExerciseUnit;
}

interface ExerciseReference {
  exercise: Exercise;
  values: ExerciseReferenceValue[];
}

const exerciseReferences: ExerciseReference[] = [
  {
    exercise: Exercise.Row,
    values: [
      {value: 1000, unit: ExerciseUnit.Meter},
      {value: 80, unit: ExerciseUnit.Calories},
    ],
  },
  {exercise: Exercise.Run, values: [{value: 800, unit: ExerciseUnit.Meter}]},
  {
    exercise: Exercise.Bike,
    values: [
      {value: 2000, unit: ExerciseUnit.Meter},
      {value: 80, unit: ExerciseUnit.Calories},
    ],
  },
  {exercise: Exercise.AssaultBike, values: [{value: 60, unit: ExerciseUnit.Calories}]},
  {exercise: Exercise.EchoBike, values: [{value: 54, unit: ExerciseUnit.Calories}]},
  {
    exercise: Exercise.Ski,
    values: [
      {value: 1000, unit: ExerciseUnit.Meter},
      {value: 80, unit: ExerciseUnit.Calories},
    ],
  },
  {exercise: Exercise.Burpee, values: [{value: 60, unit: ExerciseUnit.Reps}]},
  {exercise: Exercise.DoubleUnder, values: [{value: 300, unit: ExerciseUnit.Reps}]},
];

export class ExerciseConverter {
  private readonly fromReference: ExerciseReference;

  constructor(
    private readonly from: Exercise,
    private readonly unit: ExerciseUnit,
    private readonly value: number,
  ) {
    this.fromReference = this.getReference(from);
  }

  convertTo(to: Exercise, toUnit: ExerciseUnit): ExerciseConversion {
    const toReferenceValue = this.getReferenceValue(this.getReference(to), toUnit);
    const fromReferenceValue = this.getReferenceValue(this.fromReference, this.unit);
    const multiplier = this.value / fromReferenceValue.value;
    return new ExerciseConversion(
      this.from,
      to,
      toReferenceValue.unit,
      Math.round(toReferenceValue.value * multiplier),
    );
  }

  getSupportedUnits(exercise: Exercise): ExerciseUnit[] {
    return this.getReference(exercise).values.map(value => value.unit);
  }

  private getReference(exercise: Exercise): ExerciseReference {
    const reference = exerciseReferences.find(candidate => candidate.exercise === exercise);
    if (!reference) {
      throw new Error(`Unknown exercise: ${exercise}`);
    }
    return reference;
  }

  private getReferenceValue(reference: ExerciseReference, unit: ExerciseUnit): ExerciseReferenceValue {
    const value = reference.values.find(candidate => candidate.unit === unit);
    if (!value) {
      const units = reference.values.map(candidate => candidate.unit);
      throw new Error(`${reference.exercise} does not know unit ${unit}. Known units are: ${units.join(',')}`);
    }
    return value;
  }
}

const distanceInMeters: Record<DistanceUnit, number> = {
  [DistanceUnit.Centimeter]: 0.01,
  [DistanceUnit.Meter]: 1,
  [DistanceUnit.Kilometer]: 1000,
  [DistanceUnit.Feet]: 0.3048,
  [DistanceUnit.Inch]: 0.0254,
  [DistanceUnit.Mile]: 1609.344,
};

export class DistanceConverter {
  constructor(
    private readonly unit: DistanceUnit,
    private readonly distance: number,
  ) {}

  convertTo(toUnit: DistanceUnit): DistanceConversion {
    const convertedDistance = (this.distance * distanceInMeters[this.unit]) / distanceInMeters[toUnit];
    return new DistanceConversion(this.unit, this.distance, toUnit, convertedDistance);
  }
}

export class WeightConverter {
  constructor(
    private readonly unit: WeightUnit,
    private readonly weight: number,
  ) {}

  convertTo(toUnit: WeightUnit): WeightConversion {
    let convertedWeight = this.weight;
    if (this.unit === WeightUnit.Kilogram && toUnit === WeightUnit.Pound) {
      convertedWeight = this.weight / 0.45359237;
    } else if (this.unit === WeightUnit.Pound && toUnit === WeightUnit.Kilogram) {
      convertedWeight = this.weight * 0.45359237;
    }
    return new WeightConversion(this.unit, this.weight, toUnit, convertedWeight);
  }
}
