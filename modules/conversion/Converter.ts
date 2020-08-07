import Exercise from './Exercise';
import Unit from './Unit';
import Conversion from './Conversion';
import BaselineDefinition from './BaselineDefinition';

class Baseline {
  readonly exercise: Exercise;
  readonly definitions: BaselineDefinition[];
  constructor(exercise: Exercise, definitions: Array<BaselineDefinition>) {
    this.exercise = exercise;
    this.definitions = definitions;
  }
}

const baselines: Array<Baseline> = [
  new Baseline(Exercise.Row, [new BaselineDefinition(1000, Unit.Meter), new BaselineDefinition(80, Unit.Calories)]),
  new Baseline(Exercise.Run, [new BaselineDefinition(800, Unit.Meter)]),
  new Baseline(Exercise.Bike, [new BaselineDefinition(2000, Unit.Meter)]),
  new Baseline(Exercise.Airbike, [new BaselineDefinition(60, Unit.Calories)]),
  new Baseline(Exercise.Ski, [new BaselineDefinition(1000, Unit.Meter), new BaselineDefinition(80, Unit.Calories)]),
];

const getBaseline = (exercise: Exercise): Baseline => {
  return baselines.find((b) => b.exercise === exercise)!;
};

class Converter {
  readonly #from: Exercise;
  readonly #unit: Unit;
  readonly #value: number;
  readonly #baseline: Baseline;

  constructor(from: Exercise, unit: Unit, value: number) {
    this.#from = from;
    this.#unit = unit;
    this.#value = value;
    this.#baseline = getBaseline(from);
  }

  convertTo(to: Exercise, toUnit: Unit): Conversion {
    const toBaseline: Baseline = getBaseline(to);
    const toBaselineDescription = this.computeBaselineDescription(toBaseline, toUnit);

    const fromBaselineDescription = this.computeBaselineDescription(this.#baseline, this.#unit);
    const multiplier: number = this.#value / fromBaselineDescription.value;
    const convertedValue: number = toBaselineDescription.value * multiplier;
    return new Conversion(this.#from, to, toBaselineDescription.unit, convertedValue);
  }

  private computeBaselineDescription(toBaseline: Baseline, toUnit: Unit): BaselineDefinition {
    return toBaseline.definitions.find((d) => d.unit === toUnit)!;
  }
}

export default Converter;
