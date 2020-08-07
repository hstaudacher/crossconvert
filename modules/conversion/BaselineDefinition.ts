import Unit from './Unit';

class BaselineDefinition {
  readonly value: number;
  readonly unit: Unit;

  constructor(value: number, unit: Unit) {
    this.value = value;
    this.unit = unit;
  }
}

export default BaselineDefinition;
