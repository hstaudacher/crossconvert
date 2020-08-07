import Exercise from './Exercise';
import Unit from './Unit';

export default class Conversion {
  readonly from: Exercise;
  readonly to: Exercise;
  readonly unit: Unit;
  readonly value: number;

  constructor(from: Exercise, to: Exercise, unit: Unit, value: number) {
    this.from = from;
    this.to = to;
    this.unit = unit;
    this.value = value;
  }
}
