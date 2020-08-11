import WeightUnit from './WeightUnit';

export default class WeightConversion {
  constructor(
    readonly fromUnit: WeightUnit,
    readonly fromWeight: number,
    readonly toUnit: WeightUnit,
    readonly toWeight: number,
  ) {}
}
