import Exercise from './Exercise';
import Unit from './Unit';
import ExerciseConversion from './ExerciseConversion';

class ExerciseReferenceValue {
  constructor(readonly value: number, readonly unit: Unit) {}
}

class ExerciseReference {
  constructor(readonly exercise: Exercise, readonly values: Array<ExerciseReferenceValue>) {}
}

const refrences: Array<ExerciseReference> = [
  new ExerciseReference(Exercise.Row, [
    new ExerciseReferenceValue(1000, Unit.Meter),
    new ExerciseReferenceValue(80, Unit.Calories),
  ]),
  new ExerciseReference(Exercise.Run, [new ExerciseReferenceValue(800, Unit.Meter)]),
  new ExerciseReference(Exercise.Bike, [new ExerciseReferenceValue(2000, Unit.Meter)]),
  new ExerciseReference(Exercise.Airbike, [new ExerciseReferenceValue(60, Unit.Calories)]),
  new ExerciseReference(Exercise.Ski, [
    new ExerciseReferenceValue(1000, Unit.Meter),
    new ExerciseReferenceValue(80, Unit.Calories),
  ]),
];

class ExerciseConverter {
  readonly #fromReference: ExerciseReference;

  constructor(private readonly from: Exercise, private readonly unit: Unit, private readonly value: number) {
    this.#fromReference = this.getReference(from);
  }

  convertTo(to: Exercise, toUnit: Unit): ExerciseConversion {
    const toReference: ExerciseReference = this.getReference(to);
    const toReferenceValue = this.computeReferenceValue(toReference, toUnit);
    const fromReferenceValue = this.computeReferenceValue(this.#fromReference, this.unit);
    const convertedValue: number = this.convertValue(fromReferenceValue, toReferenceValue);
    return new ExerciseConversion(this.from, to, toReferenceValue.unit, Math.round(convertedValue));
  }

  private convertValue(fromReferenceValue: ExerciseReferenceValue, toReferenceValue: ExerciseReferenceValue): number {
    const multiplier: number = this.value / fromReferenceValue.value;
    return toReferenceValue.value * multiplier;
  }

  private computeReferenceValue(reference: ExerciseReference, unit: Unit): ExerciseReferenceValue {
    const value: ExerciseReferenceValue | undefined = reference.values.find((d) => d.unit === unit);
    if (value === undefined) {
      const units: Array<Unit> = reference.values.map((v) => v.unit)!;
      throw new Error(reference.exercise + ' does not know unit ' + unit + '. Known units are: ' + units.join(','));
    }
    return value;
  }

  private getReference(exercise: Exercise): ExerciseReference {
    return refrences.find((b) => b.exercise === exercise)!;
  }
}

export default ExerciseConverter;
