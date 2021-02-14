import WeightUnit from './WeightUnit';

export default class WeightConversion {
  constructor(
    readonly fromUnit: WeightUnit,
    readonly fromWeight: number,
    readonly toUnit: WeightUnit,
    readonly toWeight: number,
  ) {}

  public onlyTo() {
    return new WeightConversion(this.toUnit, this.toWeight, this.toUnit, this.toWeight);
  }
}
